let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser'));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const callbackName = 'initAmenityMapsCallback';
    window.initAmenityMapsCallback = () => {
      resolve();
      delete window.initAmenityMapsCallback;
    };

    const existing = document.querySelector('script[data-amenity-maps]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Google Maps script failed')));
      return;
    }

    const script = document.createElement('script');
    script.dataset.amenityMaps = 'true';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&libraries=places&callback=${callbackName}`;
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Google Maps script failed to load'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
