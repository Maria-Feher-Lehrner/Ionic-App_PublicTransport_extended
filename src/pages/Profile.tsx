import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import packageJson from '../../package.json';
import './Profile.css';
import '../theme/main.css';
import MapContainer from "../components/MapContainer";

const appVersion = packageJson.version;
const appName = packageJson.name;
const appDescription = packageJson.description;
const developerName = "Maria Feher-Lehrner";
const developerAddress = "Bringamosa 2-Z, Santa Cruz, Aruba";
const developerLocation = "";

const Profile: React.FC = () => {
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
          </div>
        <MapContainer name="Find me here"/>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
