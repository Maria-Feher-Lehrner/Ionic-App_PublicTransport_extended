import React, {useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker, Popup,} from "react-leaflet";
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
        setTimeout(() => {mapRef?.current.invalidateSize()}, 200);
    }, []);

    return (
        <MapContainer
            key={center.toString()} // This forces a re-render when `center` changes
            center={center}
            zoom={zoom}
            style={{width, height}}
            ref={mapRef}
        >
            <MapRecenter center={center}/>
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
                    <Popup>You are here!</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
