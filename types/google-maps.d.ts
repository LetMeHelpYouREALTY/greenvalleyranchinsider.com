/* Minimal Google Maps JS API types for amenity map (full types via runtime script) */

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    setContent(content: string): void;
    open(opts?: { map?: Map; anchor?: Marker }): void;
    close(): void;
  }

  class LatLngBounds {
    constructor();
    extend(point: LatLng | LatLngLiteral): void;
  }

  class Size {
    constructor(width: number, height: number);
  }

  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MarkerOptions {
    position?: LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | { url: string; scaledSize?: Size };
  }

  interface InfoWindowOptions {
    content?: string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  interface PlacesLibrary {
    Place: PlaceClass;
  }

  interface PlaceClass {
    searchNearby(request: PlaceSearchNearbyRequest): Promise<{ places: PlaceResult[] }>;
  }

  interface PlaceSearchNearbyRequest {
    fields: string[];
    locationRestriction: {
      center: LatLngLiteral;
      radius: number;
    };
    includedPrimaryTypes?: string[];
    maxResultCount?: number;
  }

  interface PlaceResult {
    displayName?: string;
    formattedAddress?: string;
    rating?: number;
    location?: LatLngLiteral;
    id?: string;
  }

  function importLibrary(name: 'maps' | 'places' | 'marker'): Promise<
    PlacesLibrary & {
      Map?: typeof Map;
      AdvancedMarkerElement?: new (opts: {
        map: Map;
        position: LatLngLiteral;
        title?: string;
      }) => { map: Map | null; addListener: (e: string, h: () => void) => void };
    }
  >;
}

interface Window {
  google?: typeof google;
  initAmenityMapsCallback?: () => void;
}
