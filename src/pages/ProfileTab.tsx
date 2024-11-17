import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonButton, IonIcon,} from '@ionic/react';
import packageJson from '../../package.json';
import '../theme/main.css';
import './profileTab.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Filesystem, Encoding } from '@capacitor/filesystem';
import { camera } from 'ionicons/icons';
import MapComponent from "../components/MapComponent";
import {locationMarkerIcon} from "../assets/mapIcons"
import React, {useState} from "react";

const appVersion = packageJson.version;
const appName = packageJson.name;
const appDescription = packageJson.description;
const developerName = "Maria Feher-Lehrner";
const developerAddress = "Bringamosa 2-Z, Santa Cruz, Aruba";

const ProfileTab: React.FC = () => {
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [isWeb, setIsWeb] = useState<boolean>(false);

    const locationCenter: [number, number] = [12.49011125596919, -69.9666370725565];
    const zoomLevel = 13;
    const popUpText = ["Just look for the prettiest donkey!"];

    const checkPlatform = () => {
        if (typeof window !== 'undefined' && !window.Capacitor) {
            setIsWeb(true);
        }
    };

    const handleImagePick = async (event?: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if(isWeb){
                // For Web: Use file input to pick an image
                const file = event?.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Image = reader.result as string;
                        setAvatarImage(base64Image);
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                // For Mobile: Use the Capacitor Camera plugin
                const photo = await Camera.getPhoto({
                    source: CameraSource.Photos, // Open gallery
                    resultType: CameraResultType.Uri, // Get image as Base64
                    quality: 90, // Optional: adjust image quality
                });
                if (photo && photo.webPath) {
                    setAvatarImage(photo.webPath);
                } else {
                    console.error('Error: No base64String returned from Camera');
                    alert('Failed to get image from Camera. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error selecting image:', error);
            alert('Failed to pick an image. Please try again.');
        }
    };

    // Call checkPlatform when the component is mounted
    React.useEffect(() => {
        checkPlatform();
    }, []);
            /*}

            let fileUri: string | undefined;

            // For Web: Use input[type="file"]
            if (window.Cypress || typeof window !== 'undefined' && !window.Capacitor) {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.click();

                input.onchange = async (e: any) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            // This will give you a base64 string
                            setAvatarImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                    }
                };
            } else {
                // For Mobile: Use FileChooser to pick file
                const uri = await FileChooser.open();
                fileUri = uri;
                const result = await Filesystem.readFile({
                    path: uri,
                    encoding: Encoding.UTF8,
                });

                // Convert to base64 (if required)
                if (typeof result.data === "string") {
                    const base64Image = `data:image/jpeg;base64,${btoa(result.data)}`;
                    setAvatarImage(base64Image);
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };*/

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonIcon
                        icon={avatarImage || camera}
                        className="avatar-icon"
                        onClick={handleImagePick}
                    />
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
