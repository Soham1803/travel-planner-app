"use client"

import {useEffect, useState} from 'react';
import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap   
} from '@vis.gl/react-google-maps';

interface GoogleMapsProps {
  startPoint: string;
  endPoint: string;
  travelMode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';
  apiKey?: string;
}

interface DirectionsProps {
  startPoint: string;
  endPoint: string;
  travelMode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';
}

const Directions = ({ startPoint, endPoint, travelMode }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize the directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    
    directionsService
      .route({
        origin: startPoint,
        destination: endPoint,
        travelMode: google.maps.TravelMode[travelMode],
        provideRouteAlternatives: true,
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch(error => {
        console.error('Error fetching directions:', error);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, startPoint, endPoint, travelMode]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 max-w-xs z-10">
      <h4 className="font-medium text-sm mb-2">{selected.summary}</h4>
      <div className="text-xs space-y-1">
        <p className="text-gray-600">
          {leg.start_address.split(',')[0]} → {leg.end_address.split(',')[0]}
        </p>
        <div className="flex gap-4">
          <span className="text-blue-600">📍 {leg.distance?.text}</span>
          <span className="text-green-600">⏱️ {leg.duration?.text}</span>
        </div>
      </div>

      {routes.length > 1 && (
        <div className="mt-2">
          <h5 className="text-xs font-medium mb-1">Other Routes:</h5>
          <div className="space-y-1">
            {routes.map((route, index) => (
              <button
                key={route.summary}
                onClick={() => setRouteIndex(index)}
                className={`text-xs px-2 py-1 rounded border w-full text-left ${
                  index === routeIndex 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {route.summary}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GoogleMaps = ({ startPoint, endPoint, travelMode, apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }: GoogleMapsProps) => {
  const [center, setCenter] = useState({ lat: 18.524470, lng: 73.878052 }); // Default to Pune 18.524470, 73.878052

  
//   // Calculate center point between start and end
//   useEffect(() => {
//     const geocoder = new google.maps.Geocoder();
    
//     // Geocode both points to get their coordinates
//     Promise.all([
//       new Promise<google.maps.LatLng>((resolve, reject) => {
//         geocoder.geocode({ address: startPoint }, (results, status) => {
//           if (status === 'OK' && results?.[0]) {
//             resolve(results[0].geometry.location);
//           } else {
//             reject(status);
//           }
//         });
//       }),
//       new Promise<google.maps.LatLng>((resolve, reject) => {
//         geocoder.geocode({ address: endPoint }, (results, status) => {
//           if (status === 'OK' && results?.[0]) {
//             resolve(results[0].geometry.location);
//           } else {
//             reject(status);
//           }
//         });
//       })
//     ]).then(([startLatLng, endLatLng]) => {
//       // Calculate center point
//       const centerLat = (startLatLng.lat() + endLatLng.lat()) / 2;
//       const centerLng = (startLatLng.lng() + endLatLng.lng()) / 2;
//       setCenter({ lat: centerLat, lng: centerLng });
//     }).catch(error => {
//       console.error('Error geocoding addresses:', error);
//     });
//   }, [startPoint, endPoint]);

  if (!apiKey) {
    return (
      <div className="p-4 border border-red-300 rounded-md bg-red-50">
        <p className="text-red-600">Google Maps API key is required. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[28rem] border rounded-lg overflow-hidden relative">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={10}
          defaultCenter={center}
          gestureHandling={'cooperative'}
          disableDefaultUI={false}
          fullscreenControl={true}
          zoomControl={true}
          streetViewControl={false}
          mapTypeControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <Directions
            startPoint={startPoint}
            endPoint={endPoint}
            travelMode={travelMode}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;

