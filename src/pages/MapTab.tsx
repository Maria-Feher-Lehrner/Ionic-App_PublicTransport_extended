import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './MapTab.css';
import '../theme/main.css';
import MapComponent from "../components/MapComponent";
import React from "react";
import {useLocation} from '../stores/location-store';
import { deviceLocationIcon, locationMarkerIcon } from "../assets/mapIcons";

const MapTab: React.FC = () => {

    const {centerLocation, markerLocations, markerPopUps} = useLocation();

    console.log("Center location in MapTab:", centerLocation);
    console.log("Marker locations in MapTab:", markerLocations);
    console.log("Popup text in MapTab:", markerPopUps);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="content-section">
                    <MapComponent
                        center={centerLocation}       // Main map center (device location or default)
                        zoom={12}
                        markers={markerLocations}     // All stations
                        popUpText={markerPopUps}
                        centerIcon={deviceLocationIcon}       // Red woman icon for device
                        markerIcon={locationMarkerIcon}      // Blue pins for stations
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MapTab;
