
import { useState, useEffect } from 'react';
import type { Coordinates } from '@/utils/locationUtils';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "Geolocation is not supported",
        loading: false
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
          loading: false
        });
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    );
  }, []);

  return state;
}
