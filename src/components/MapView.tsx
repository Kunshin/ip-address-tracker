import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customMarkerIcon = new L.Icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [46, 56]
});

interface MapViewProps {
    lat: number;
    lon: number;
}

const MapView = ({ lat, lon }: MapViewProps) => {
    return (
        <MapContainer
            center={[lat, lon]}
            zoom={16}
            scrollWheelZoom={true}
            zoomControl={false}
            className="h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]} icon={customMarkerIcon}></Marker>
        </MapContainer>
    );
};

export default MapView;
