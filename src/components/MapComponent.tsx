import React, {useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../theme/main.css";

interface MapComponentProps {
    center: [number, number];  // Array with [latitude, longitude]
    zoom: number;
    markers?: [number, number][];
    popUpText: string;
}

//Workaround, because tiles are not getting rendered properly / map is misaligned --> triggers resize
const ResizeMap = () => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            map.invalidateSize();  // Ensures the map resizes properly on mount
        }
    }, [map]);  // Trigger this effect once the map is available

    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
                                                       center,
                                                       zoom,
                                                       markers = [],
                                                       popUpText
                                                   }) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{height: "300px", width: "100%"}}
        >
            <ResizeMap/> {/* Here resizing gets triggered after mounting the map */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((position, idx) => (
                <Marker key={idx} position={position}>
                    <Popup>
                        {popUpText}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
