import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonDatetime } from "@ionic/react";
import { useLocation } from "../stores/location-store";  // Assuming this is where LocationContext is stored
import { useHistory } from "react-router-dom";

const AddStationPage: React.FC = () => {
    const { addStation } = useLocation(); // Access addStation method from context
    const [stationName, setStationName] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const history = useHistory();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate the data
        if (stationName.trim() === "" || isNaN(latitude) || isNaN(longitude)) {
            alert("Please enter valid data.");
            return;
        }

        // Add new station to the store
        addStation(stationName, [latitude, longitude]);

        // Navigate back to the main page (HomeTab)
        history.push("/");  // Or use the correct route to go back to the home page
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add New Station</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Station Name</IonLabel>
                        <IonInput
                            value={stationName}
                            onIonChange={(e) => setStationName(e.detail.value!)}
                            required
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Latitude</IonLabel>
                        <IonInput
                            type="number"
                            value={latitude}
                            onIonChange={(e) => setLatitude(parseFloat(e.detail.value!))}
                            required
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Longitude</IonLabel>
                        <IonInput
                            type="number"
                            value={longitude}
                            onIonChange={(e) => setLongitude(parseFloat(e.detail.value!))}
                            required
                        />
                    </IonItem>

                    <IonButton expand="full" type="submit">Add Station</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddStationPage;
