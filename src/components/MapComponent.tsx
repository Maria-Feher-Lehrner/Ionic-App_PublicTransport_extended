import React, {useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../theme/main.css";

interface MapComponentProps {
    center: [number, number];  // Array with [latitude, longitude]
    zoom: number;
    markers?: [number, number][];
    popUpText: string[];
    height?: string;
    width?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       center,
                                                       zoom,
                                                       markers = [],
                                                       popUpText,
                                                       height = "50vh",  // default height if not specified
                                                       width = "100wh"   // default width if not specified
                                                   }) => {
    //Workaround Approach to try and solve the misaligned rendering issue of the map --> forced resize --> NOT WORKING!!!
    const mapRef = useRef<any>(null);

    useEffect(() => {
        // Trigger invalidateSize when the map is initialized or when window resizes
        const map = mapRef.current;
        if (map) {
            map.invalidateSize();
        }

        // Optional: add a resize event listener to re-validate on window resize
        const handleResize = () => {
            if (map) {
                map.invalidateSize();
            }
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{width, height}}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((position, idx) => (
                <Marker key={idx} position={position}>
                    <Popup>
                        {popUpText[idx]}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
