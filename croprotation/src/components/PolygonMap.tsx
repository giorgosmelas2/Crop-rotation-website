import React, { useEffect, useRef } from 'react';
import { EditControl } from 'react-leaflet-draw';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const PolygonMap = ({ onPolygonCreate }) => {
    // Function to handle the creation of a polygon
    // This function is called when the user finishes drawing a polygon on the map
    const handleCreate = (e) => {
        const layer = e.layer;
        const latlngs = layer.getLatLngs()[0];
        const coords = latlngs.map(p => ({ lat: p.lat, lng: p.lng }));
        onPolygonCreate(coords);
    };

    return (
        <MapContainer
            center={[39.0742, 21.8243] as [number, number]}
            zoom={6}
            minZoom={6}
            maxZoom={18}
            style={{ height: '100%', width: '100%' }}
            maxBounds={[[34.5, 19.0], [42.0, 29.5]]}
            maxBoundsViscosity={1.0}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup>
                <EditControl
                    position="topright"
                    onCreated={handleCreate}
                    draw={{
                        rectangle: false,
                        circle: false,
                        polyline: false,
                        circlemarker: false,
                        marker: false,
                        polygon: true,
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    );
}



export default PolygonMap;