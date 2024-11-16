import React, {useEffect, useState} from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonDatetime } from "@ionic/react";
import { useLocation } from "../stores/location-store";  // Assuming this is where LocationContext is stored
import '../theme/main.css';
import './stationEntry.css'

const AddStationPage: React.FC = () => {
    const { centerLocation, addStation } = useLocation(); // Access addStation method from context
    const [stationName, setStationName] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        // Update latitude and longitude when centerLocation changes
        setLatitude(centerLocation[0]);
        setLongitude(centerLocation[1]);
    }, [centerLocation]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate the data
        if (stationName.trim() === "" || isNaN(latitude) || isNaN(longitude)) {
            alert("Please enter valid data.");
            return;
        }

        // Add new station to the store
        addStation(stationName, [latitude, longitude]);

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add New Station</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form className="location-entry-form" onSubmit={handleSubmit}>
                    <IonItem class-name="form-field">
                        <IonLabel position="floating">Station Name</IonLabel>
                        <IonInput
                            value={stationName}
                            onIonChange={(e) => setStationName(e.detail.value || "")}
                            placeholder="Enter station name"
                        />
                    </IonItem>

                    <IonItem class-name="form-field">
                        <IonLabel position="floating">Latitude</IonLabel>
                        <IonInput
                            type="number"
                            value={latitude}
                            step="any" // Allows decimals
                            onIonChange={(e) => setLatitude(parseFloat(e.detail.value!) || latitude)}
                        />
                    </IonItem>

                    <IonItem class-name="form-field">
                        <IonLabel position="floating">Longitude</IonLabel>
                        <IonInput
                            type="number"
                            value={longitude}
                            step="any" // Allows decimals
                            onIonChange={(e) => setLongitude(parseFloat(e.detail.value!) || longitude)}
                        />
                    </IonItem>

                    <IonButton expand="full" type="submit">Save</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddStationPage;
