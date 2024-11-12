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

//Workaround, weil tiles nicht richtig gerendert haben --> triggert Resize
const ResizeMap = () => {
    const map = useMap();
    useEffect(() => {
        // This ensures the map resizes correctly when the component mounts
        const handleResize = () => {
            if (map) {
                map.invalidateSize();
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Run invalidateSize on mount as well to ensure initial render is correct
        handleResize();

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [map]);

    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({center, zoom, markers = [], popUpText}) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{height: "300px", width: "100%"}}
            whenCreated={(map) => map.invalidateSize()}
        >
            <ResizeMap /> {/* Hier wird das Resizing nach dem mounten des MapContainers getriggert */}
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
