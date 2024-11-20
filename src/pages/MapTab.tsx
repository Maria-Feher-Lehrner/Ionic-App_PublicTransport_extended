import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton} from '@ionic/react';
import './mapTab.css';
import '../theme/main.css';
import MapComponent from "../components/MapComponent";
import React from "react";
import {useLocation} from '../core/location-store';
import {deviceLocationIcon, locationMarkerIcon} from "../assets/mapIcons";

const MapTab: React.FC = () => {

    const {
        centerLocation,
        deviceLocation,
        markerLocations,
        markerPopUps,
        recenterToDeviceLocation,
    } = useLocation();

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
                        centerIcon={deviceLocationIcon} // Red woman icon for device
                        markerIcon={locationMarkerIcon} // Blue pins for stations
                        deviceLocation={deviceLocation}
                    />
                    {deviceLocation && (
                        <IonButton
                            onClick={() => {
                                recenterToDeviceLocation(); // Updates the centerLocation state
                                console.log("Recenter button clicked");
                            }}
                            className="recenter-button"
                        >
                            Recenter to My Location
                        </IonButton>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MapTab;
