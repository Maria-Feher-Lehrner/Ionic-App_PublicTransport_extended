import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,} from '@ionic/react';
import packageJson from '../../package.json';
import '../theme/main.css';
import './profileTab.css';
import MapComponent from "../components/MapComponent";
import {locationMarkerIcon} from "../assets/mapIcons"
import ImagePicker from "../components/Image-Picker";

const appVersion = packageJson.version;
const appName = packageJson.name;
const appDescription = packageJson.description;
const developerName = "Maria Feher-Lehrner";
const developerAddress = "Bringamosa 2-Z, Santa Cruz, Aruba";

const ProfileTab: React.FC = () => {

    const locationCenter: [number, number] = [12.49011125596919, -69.9666370725565];
    const zoomLevel = 13;
    const popUpText = ["Just look for the prettiest donkey!"];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="profile-header">
                        <IonTitle>Profile</IonTitle>
                        <ImagePicker/>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="profile-section">
                    <h1>About this App</h1>
                    <p>{appDescription}</p>
                    <p><strong>App name:</strong> {appName}</p>
                    <p><strong>Version:</strong> {appVersion}</p>
                    <p><strong>Developed by:</strong> {developerName}</p>
                    <p><strong>Address:</strong> {developerAddress}</p>
                    <h2>Find me here:</h2>
                    <MapComponent
                        center={locationCenter}
                        zoom={zoomLevel}
                        markers={[locationCenter]}
                        popUpText={popUpText}
                        centerIcon={locationMarkerIcon}
                        markerIcon={locationMarkerIcon}
                    />
                </div>

            </IonContent>
        </IonPage>
    );
};

export default ProfileTab;
