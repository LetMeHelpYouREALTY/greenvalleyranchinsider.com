'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import {
  AMENITY_CATEGORIES,
  COMMUNITY_MAP,
  CURATED_NEARBY_PLACES,
  type AmenityCategoryId,
  getMapEmbedUrl,
  getPlaceDirectionsUrl,
  getDirectionsUrl,
} from '@/lib/community-amenities';
import { loadGoogleMapsScript } from '@/components/amenity-map/load-google-maps';

const MAP_HEIGHT = 420;

type MapPlace = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat: number;
  lng: number;
};

function displayNameText(displayName: unknown): string {
  if (typeof displayName === 'string') return displayName;
  if (displayName && typeof displayName === 'object' && 'text' in displayName) {
    return String((displayName as { text: string }).text);
  }
  return 'Place';
}

function locationToLatLng(location: unknown): { lat: number; lng: number } | null {
  if (!location || typeof location !== 'object') return null;
  const loc = location as { lat?: number; lng?: number; latitude?: number; longitude?: number };
  const lat = loc.lat ?? loc.latitude;
  const lng = loc.lng ?? loc.longitude;
  if (typeof lat === 'number' && typeof lng === 'number') return { lat, lng };
  return null;
}

type AmenityMapProps = {
  /** Show compact curated list under map (default true on full page) */
  showCuratedList?: boolean;
  className?: string;
};

export function AmenityMap({ showCuratedList = true, className = '' }: AmenityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>('restaurants');
  const [apiReady, setApiReady] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  const useInteractiveMap = Boolean(apiKey) && !apiFailed;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    infoWindowRef.current?.close();
  }, []);

  const addCommunityMarker = useCallback((map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      position: COMMUNITY_MAP.center,
      map,
      title: COMMUNITY_MAP.centerLabel,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      },
    });
    const content = `
      <div style="max-width:220px;padding:4px 0">
        <strong>${COMMUNITY_MAP.centerLabel}</strong><br/>
        <span style="font-size:12px;color:#475569">${COMMUNITY_MAP.centerAddress}</span>
      </div>`;
    marker.addListener('click', () => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open({ map, anchor: marker });
    });
    markersRef.current.push(marker);
  }, []);

  const renderPlaceMarkers = useCallback(
    (map: google.maps.Map, list: MapPlace[]) => {
      list.forEach((place) => {
        const marker = new google.maps.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          title: place.name,
        });
        const ratingLine =
          place.rating != null ? `<br/><span style="font-size:12px">Rating: ${place.rating}</span>` : '';
        const directionsUrl = getPlaceDirectionsUrl(place.lat, place.lng);
        const content = `
          <div style="max-width:240px;padding:4px 0">
            <strong>${place.name}</strong>${ratingLine}<br/>
            <span style="font-size:12px;color:#475569">${place.address}</span><br/>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#C5A059">Directions</a>
          </div>`;
        marker.addListener('click', () => {
          if (!infoWindowRef.current) {
            infoWindowRef.current = new google.maps.InfoWindow();
          }
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    []
  );

  const initMap = useCallback(async () => {
    if (!mapDivRef.current || !apiKey || mapRef.current) return;

    try {
      await loadGoogleMapsScript(apiKey);
      await google.maps.importLibrary('maps');
      const map = new google.maps.Map(mapDivRef.current, {
        center: COMMUNITY_MAP.center,
        zoom: 13,
        ...(mapId ? { mapId } : {}),
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      mapRef.current = map;
      addCommunityMarker(map);
      setApiReady(true);
    } catch {
      setApiFailed(true);
    }
  }, [apiKey, mapId, addCommunityMarker]);

  const fetchNearby = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !apiKey || !apiReady) return;

      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      setLoadingPlaces(true);
      clearMarkers();
      addCommunityMarker(mapRef.current);

      try {
        const placesLib = await google.maps.importLibrary('places');
        const Place = placesLib.Place;
        if (!Place?.searchNearby) {
          throw new Error('searchNearby unavailable');
        }

        const { places: results } = await Place.searchNearby({
          fields: ['displayName', 'formattedAddress', 'rating', 'location', 'id'],
          locationRestriction: {
            center: COMMUNITY_MAP.center,
            radius: COMMUNITY_MAP.searchRadiusMeters,
          },
          includedPrimaryTypes: category.placeTypes,
          maxResultCount: 15,
        });

        const mapped: MapPlace[] = [];
        for (const p of results ?? []) {
          const coords = locationToLatLng(p.location);
          if (!coords) continue;
          mapped.push({
            id: p.id ?? `${coords.lat}-${coords.lng}`,
            name: displayNameText(p.displayName),
            address: p.formattedAddress ?? '',
            rating: p.rating,
            lat: coords.lat,
            lng: coords.lng,
          });
        }

        setPlaces(mapped);
        renderPlaceMarkers(mapRef.current, mapped);

        if (mapped.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(COMMUNITY_MAP.center);
          mapped.forEach((pl) => bounds.extend({ lat: pl.lat, lng: pl.lng }));
          mapRef.current.fitBounds(bounds);
        }
      } catch {
        setPlaces([]);
      } finally {
        setLoadingPlaces(false);
      }
    },
    [apiKey, apiReady, clearMarkers, addCommunityMarker, renderPlaceMarkers]
  );

  useEffect(() => {
    if (!isInView || !useInteractiveMap) return;
    void initMap();
  }, [isInView, useInteractiveMap, initMap]);

  useEffect(() => {
    if (!apiReady) return;
    void fetchNearby(activeCategory);
  }, [apiReady, activeCategory, fetchNearby]);

  const curatedForCategory = CURATED_NEARBY_PLACES.filter((p) => p.category === activeCategory);
  const showFallback = !useInteractiveMap;

  return (
    <div ref={containerRef} className={className}>
      <div
        role="tablist"
        aria-label="Amenity categories near Green Valley Ranch"
        className="flex flex-wrap gap-2 mb-4"
      >
        {AMENITY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            aria-label={cat.ariaLabel}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat.id
                ? 'bg-[#C5A059] text-[#0F172A] border-[#C5A059]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#C5A059]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
        style={{ minHeight: MAP_HEIGHT }}
        aria-label="Map of nearby amenities"
      >
        {showFallback ? (
          <iframe
            title={`Map of ${COMMUNITY_MAP.name}, ${COMMUNITY_MAP.city}`}
            src={getMapEmbedUrl()}
            width="100%"
            height={MAP_HEIGHT}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        ) : (
          <div ref={mapDivRef} className="w-full" style={{ height: MAP_HEIGHT }} />
        )}
        {loadingPlaces && useInteractiveMap && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-slate-600"
            aria-live="polite"
          >
            Loading places…
          </div>
        )}
      </div>

      {showCuratedList && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
            {showFallback ? 'Featured nearby places' : 'Also nearby'}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" aria-label="Curated nearby places list">
            {(showFallback ? CURATED_NEARBY_PLACES : curatedForCategory.length > 0 ? curatedForCategory : CURATED_NEARBY_PLACES.slice(0, 4)).map(
              (place) => (
                <li
                  key={place.name}
                  className="flex gap-3 p-4 rounded-lg border border-slate-200 bg-white"
                >
                  <MapPin className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F172A]">{place.name}</p>
                    <p className="text-sm text-slate-600">{place.address}</p>
                    {place.note && <p className="text-sm text-slate-500 mt-1">{place.note}</p>}
                    <a
                      href={getDirectionsUrl(place.name, place.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#C5A059] hover:underline mt-2"
                    >
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      Directions
                    </a>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {useInteractiveMap && places.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label="Places shown on map">
          {places.slice(0, 8).map((place) => (
            <li key={place.id} className="text-sm text-slate-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>{place.name}</strong>
                {place.rating != null && (
                  <span className="inline-flex items-center gap-0.5 ml-1 text-slate-500">
                    <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" aria-hidden="true" />
                    {place.rating}
                  </span>
                )}
                {place.address ? ` — ${place.address}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
