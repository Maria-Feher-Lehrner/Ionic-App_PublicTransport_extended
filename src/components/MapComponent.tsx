import React, {useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../theme/main.css";
import MapRecenter from "./MapRecenter"


interface MapComponentProps {
    center: [number, number];  // Array with [latitude, longitude]
    zoom: number;
    markers?: [number, number][];
    popUpText: string[];
    centerIcon?: any;
    markerIcon?: any;
    deviceLocation?: [number, number];
    height?: string;
    width?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       center,
                                                       zoom,
                                                       markers = [],
                                                       popUpText,
                                                       centerIcon,
                                                       markerIcon,
                                                       deviceLocation,
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
        /*const handleResize = () => {
            if (map) {
                map.invalidateSize();
            }
        };
        window.addEventListener("resize", handleResize);*/

        // Cleanup on unmount
        //return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <MapContainer
            key={center.toString()} // This forces a re-render when `center` changes
            center={center}
            zoom={zoom}
            style={{width, height}}
            ref={mapRef}
        >
            <MapRecenter center={center} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((position, idx) => (
                <Marker key={idx} position={position} icon={markerIcon}>
                    <Popup>{popUpText[idx]}</Popup>
                </Marker>
            ))}
            {deviceLocation && (
                <Marker position={deviceLocation} icon={centerIcon}>
                    <Popup>Your Device Location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
