import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = ({ apikey, location }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!map.current) {
            platform.current = new H.service.Platform({ apikey });
            const defaultLayers = platform.current.createDefaultLayers();
            const newMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                zoom: 14,
                center: location
            });
            //const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
            const ui = H.ui.UI.createDefault(newMap, defaultLayers);
            newMap.addObject(new H.map.Marker(location))
            map.current = newMap;

        }   if (markerRef.current) {
            map.current.removeObject(markerRef.current);
        }

        markerRef.current = new H.map.Marker(location);
        map.current.addObject(markerRef.current);
        map.current.setCenter(location);
    }, [apikey, location]);

    return <div style={{ width: '100%', height: '400px' }} ref={mapRef} />;
};

export default Map;
