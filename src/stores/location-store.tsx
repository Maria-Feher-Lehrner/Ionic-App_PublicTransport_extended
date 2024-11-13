import React, { createContext, useContext, useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

// Default to Vienna city center if location isn’t available
const DEFAULT_LOCATION: [number, number] = [48.2082, 16.3738];

// Create a context for location data
interface LocationContextProps {
    centerLocation: [number, number];
    markerLocations: [number, number][];
    markerPopUps: string[];
}

const LocationContext = createContext<LocationContextProps>({
    centerLocation: DEFAULT_LOCATION,
    markerLocations: [DEFAULT_LOCATION],
    markerPopUps: ["Vienna City Center"],
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [centerLocation, setCenterLocation] = useState<[number, number]>(DEFAULT_LOCATION);
    const [markerLocations, setMarkerLocations] = useState<[number, number][]>([DEFAULT_LOCATION]);
    const [markerPopUps, setMarkerPopUps] = useState<string[]>(["Vienna City Center"]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const permission = await Geolocation.requestPermissions();
                if (permission.location === 'granted') {
                    const position = await Geolocation.getCurrentPosition();
                    const { latitude, longitude } = position.coords;
                    const deviceLocation: [number, number] = [latitude, longitude];

                    // Update context state with the device's location
                    setCenterLocation(deviceLocation);
                    setMarkerLocations([deviceLocation, ...markerLocations]);
                    setMarkerPopUps(["You are here", ...markerPopUps]);
                }
            } catch (error) {
                console.error("Location fetch failed, using default Vienna location:", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ centerLocation, markerLocations, markerPopUps }}>
    {children}
    </LocationContext.Provider>
);
};

// Custom hook to access location context
export const useLocation = () => useContext(LocationContext);
