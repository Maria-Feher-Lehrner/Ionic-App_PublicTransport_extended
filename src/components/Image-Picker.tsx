import React, {useState} from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {IonAvatar, IonIcon, IonItem} from "@ionic/react";
import {camera} from "ionicons/icons";
import '../theme/main.css';


const ImagePicker: React.FC = () => {

    const [profilePicture, setProfilePicture] = useState<string| null>(null);

    const selectImage = async () => {
        try {

            const userImage = await Camera.getPhoto({
                quality: 100,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos
            });

            setProfilePicture(userImage.dataUrl || '');

        } catch (error) {
            console.log("Error selecting image", error);
        }
    };

    return (
        <>

            <IonItem>
                {profilePicture ? (
                    <IonAvatar className="avatar-icon" onClick={selectImage}>
                        <img alt="User profile" src={profilePicture} />
                    </IonAvatar>
                ) : (
                    <IonIcon icon={camera} className="avatar-icon" onClick={selectImage} />
                )}
            </IonItem>
        </>
    );
};

export default ImagePicker;