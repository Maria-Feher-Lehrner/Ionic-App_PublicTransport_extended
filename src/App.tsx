
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {homeOutline, mapOutline, personCircleOutline } from 'ionicons/icons';
import HomeTab from './pages/HomeTab';
import MapTab from './pages/MapTab';
import ProfileTab from './pages/ProfileTab';
import {LocationProvider} from './stores/location-store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

    return (
        <IonApp>
            <LocationProvider>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/home-tab" component={HomeTab} exact />
                        <Route path="/map-tab" component={MapTab} exact />
                        <Route path="/profile-tab" component={ProfileTab} />
                        <Route exact path="/">
                            <Redirect to="/home-tab" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/home-tab">
                            <IonIcon aria-hidden="true" icon={homeOutline}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="map" href="/map-tab">
                            <IonIcon aria-hidden="true" icon={mapOutline}/>
                            <IonLabel>Map</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="profile" href="/profile-tab">
                            <IonIcon aria-hidden="true" icon={personCircleOutline}/>
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
            </LocationProvider>
        </IonApp>
    );
};

export default App;
