import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapRecenterProps {
    center: [number, number];
}

const MapRecenter: React.FC<MapRecenterProps> = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        console.log("MapRecenter was called")
        if (center) {
            map.setView(center);
            console.log("MapRecenter was set to: ", center)
        }
    }, [center, map]);

    return null;
};
export default MapRecenter;
