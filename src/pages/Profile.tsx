import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import packageJson from '../../package.json';
import './Profile.css';
import '../theme/main.css';
import MapComponent from "../components/MapComponent";

const appVersion = packageJson.version;
const appName = packageJson.name;
const appDescription = packageJson.description;
const developerName = "Maria Feher-Lehrner";
const developerAddress = "Bringamosa 2-Z, Santa Cruz, Aruba";

const Profile: React.FC = () => {

  const locationCenter: [number, number] = [12.49011125596919, -69.9666370725565];
  const zoomLevel = 13;
  const popUpText = "Just look for the prettiest donkey!";

  return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="content-section">
                    <h1>About this App</h1>
                    <p>{appDescription}</p>
                    <p><strong>App name:</strong> {appName}</p>
                    <p><strong>Version:</strong> {appVersion}</p>
                    <p><strong>Developed by:</strong> {developerName}</p>
                    <p><strong>Address:</strong> {developerAddress}</p>
                    <h2>Find me here:</h2>
                  <MapComponent center={locationCenter} zoom={zoomLevel} markers={[locationCenter]} popUpText={popUpText}/>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default Profile;
