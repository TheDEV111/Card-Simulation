import { useState, useEffect } from "react";

export function useGeolocation(options = {}) {
  const [state, setState] = useState({
    loading: true,
    error:   null,
    coords:  null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: "Geolocation not supported", coords: null });
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => setState({ loading: false, error: null, coords: { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy } }),
      (err) => setState({ loading: false, error: err.message, coords: null }),
      options,
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
