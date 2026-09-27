'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import {
  AMENITY_CATEGORIES,
  COMMUNITY_MAP,
  CURATED_NEARBY_PLACES,
  type AmenityCategoryId,
  getMapEmbedUrl,
  getPlaceDirectionsUrl,
  getDirectionsUrl,
} from '@/lib/community-amenities';
import { loadGoogleMaps, mapsAuthFailed } from '@/components/amenity-map/load-google-maps';
import { searchCategory } from '@/components/amenity-map/search-category';

const MAP_HEIGHT = 420;

type MapPlace = {
  id: string;
  name: string;
  address: string;
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

function locationToLatLng(
  location: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
): { lat: number; lng: number } | null {
  if (!location) return null;
  if (typeof (location as google.maps.LatLng).toJSON === 'function') {
    return (location as google.maps.LatLng).toJSON();
  }
  const literal = location as google.maps.LatLngLiteral;
  if (typeof literal.lat === 'number' && typeof literal.lng === 'number') {
    return { lat: literal.lat, lng: literal.lng };
  }
  return null;
}

function buildCommunityInfoContent(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = '220px';
  wrap.style.padding = '4px 0';
  const strong = document.createElement('strong');
  strong.textContent = COMMUNITY_MAP.centerLabel;
  const br = document.createElement('br');
  const span = document.createElement('span');
  span.style.fontSize = '12px';
  span.style.color = '#475569';
  span.textContent = COMMUNITY_MAP.centerAddress;
  wrap.append(strong, br, span);
  return wrap;
}

function buildPlaceInfoContent(place: MapPlace): HTMLElement {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = '240px';
  wrap.style.padding = '4px 0';
  const strong = document.createElement('strong');
  strong.textContent = place.name;
  wrap.appendChild(strong);
  if (place.address) {
    const br = document.createElement('br');
    const span = document.createElement('span');
    span.style.fontSize = '12px';
    span.style.color = '#475569';
    span.textContent = place.address;
    wrap.append(br, span);
  }
  const link = document.createElement('a');
  link.href = getPlaceDirectionsUrl(place.lat, place.lng);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.fontSize = '12px';
  link.style.color = '#C5A059';
  link.textContent = 'Directions';
  wrap.appendChild(document.createElement('br'));
  wrap.appendChild(link);
  return wrap;
}

type AmenityMapProps = {
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
  const [useFallback, setUseFallback] = useState(() => !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim());
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    infoWindowRef.current?.close();
  }, []);

  const enterFallback = useCallback(() => {
    setUseFallback(true);
    setApiReady(false);
    clearMarkers();
    mapRef.current = null;
  }, [clearMarkers]);

  useEffect(() => {
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    const onAuthFailure = () => enterFallback();
    window.addEventListener('gmaps:auth-failure', onAuthFailure);
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFailure);
  }, [enterFallback]);

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

  const addCommunityMarker = useCallback((map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      position: COMMUNITY_MAP.center,
      map,
      title: COMMUNITY_MAP.centerLabel,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      },
    });
    marker.addListener('click', () => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      infoWindowRef.current.setContent(buildCommunityInfoContent());
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
        marker.addListener('click', () => {
          if (!infoWindowRef.current) {
            infoWindowRef.current = new google.maps.InfoWindow();
          }
          infoWindowRef.current.setContent(buildPlaceInfoContent(place));
          infoWindowRef.current.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    []
  );

  const initMap = useCallback(async () => {
    if (!mapDivRef.current || !apiKey || mapRef.current || useFallback) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }

    try {
      await loadGoogleMaps(apiKey);
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
      enterFallback();
    }
  }, [apiKey, mapId, addCommunityMarker, useFallback, enterFallback]);

  const fetchNearby = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !apiReady || useFallback) return;

      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      setLoadingPlaces(true);
      setPlacesSearchFailed(false);
      clearMarkers();
      addCommunityMarker(mapRef.current);

      try {
        const results = await searchCategory(COMMUNITY_MAP.center, categoryId, category.placeTypes);

        const mapped: MapPlace[] = [];
        for (const p of results) {
          const coords = locationToLatLng(p.location ?? undefined);
          if (!coords) continue;
          mapped.push({
            id: p.id ?? `${coords.lat}-${coords.lng}`,
            name: displayNameText(p.displayName),
            address: p.formattedAddress ?? '',
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
        setPlacesSearchFailed(true);
      } finally {
        setLoadingPlaces(false);
      }
    },
    [apiReady, useFallback, clearMarkers, addCommunityMarker, renderPlaceMarkers]
  );

  useEffect(() => {
    if (!isInView || useFallback || !apiKey) return;
    void initMap();
  }, [isInView, useFallback, apiKey, initMap]);

  useEffect(() => {
    if (!apiReady || useFallback) return;
    void fetchNearby(activeCategory);
  }, [apiReady, activeCategory, fetchNearby, useFallback]);

  const curatedForCategory = CURATED_NEARBY_PLACES.filter((p) => p.category === activeCategory);
  const listPlaces =
    useFallback || placesSearchFailed
      ? curatedForCategory.length > 0
        ? curatedForCategory
        : CURATED_NEARBY_PLACES
      : curatedForCategory.length > 0
        ? curatedForCategory
        : CURATED_NEARBY_PLACES.slice(0, 4);

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
        {useFallback ? (
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
        {loadingPlaces && !useFallback && (
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
            {useFallback ? `Featured places near ${COMMUNITY_MAP.name}` : 'Also nearby'}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" aria-label="Curated nearby places list">
            {(useFallback ? CURATED_NEARBY_PLACES : listPlaces).map((place) => (
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
            ))}
          </ul>
        </div>
      )}

      {!useFallback && places.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label="Places shown on map">
          {places.slice(0, 8).map((place) => (
            <li key={place.id} className="text-sm text-slate-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>{place.name}</strong>
                {place.address ? ` — ${place.address}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!useFallback && placesSearchFailed && places.length === 0 && (
        <ul className="mt-4 space-y-2" aria-label="Featured places for this category">
          {curatedForCategory.map((place) => (
            <li key={place.name} className="text-sm text-slate-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>{place.name}</strong>
                {place.address ? ` — ${place.address}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
