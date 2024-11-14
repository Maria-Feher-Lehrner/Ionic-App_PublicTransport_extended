import L from "leaflet";

import womanIconUrl from "./woman.png";
import pinIconUrl from "./pin-outline.svg";

export const deviceLocationIcon = new L.Icon({
    iconUrl: womanIconUrl,
    className: "location-icon",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30]
});

export const locationMarkerIcon = new L.Icon({
    iconUrl: pinIconUrl,
    className: "station-icon",
    iconSize: [25, 25],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20]
});
