import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './MapTab.css';
import '../theme/main.css';
import MapComponent from "../components/MapComponent";
import React from "react";
import { useLocation } from '../stores/location-store';

const MapTab: React.FC = () => {

  const { centerLocation, markerLocations, markerPopUps } = useLocation();

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
        <p>This is where map will go</p>
        <MapComponent center={centerLocation} zoom={15} markers={markerLocations} popUpText={markerPopUps}/>
      </IonContent>
    </IonPage>
  );
};

export default MapTab;
