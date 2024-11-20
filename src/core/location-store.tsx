import React, {createContext, useContext, useEffect, useState} from 'react';
import {Geolocation} from '@capacitor/geolocation';
import Papa from 'papaparse';


const DEFAULT_LOCATION: [number, number] = [48.2082, 16.3738]; // Vienna City Center as Default map center location
const DATA_URL = 'https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv';

// Define types for the parsed CSV data
interface StationData {
    id: string;
    name: string;
    location: [number, number];
}

// Context for location and station data
interface LocationContextProps {
    centerLocation: [number, number];
    deviceLocation?: [number, number];
    markerLocations: [number, number][];
    markerPopUps: string[];
    addStation: (stationName: string, location: [number, number]) => void;
    recenterToDeviceLocation: () => void;
}

const LocationContext = createContext<LocationContextProps>({
    centerLocation: DEFAULT_LOCATION,
    deviceLocation: undefined,
    markerLocations: [DEFAULT_LOCATION],
    markerPopUps: ["Vienna City Center"],
    addStation: () => {
    }, // Placeholder
    recenterToDeviceLocation: () => {},
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [centerLocation, setCenterLocation] = useState<[number, number]>(DEFAULT_LOCATION);
    const [deviceLocation, setDeviceLocation] = useState<[number, number] | undefined>(undefined);
    const [manualLocations, setManualLocations] = useState<[number, number][]>([]);
    const [manualPopUps, setManualPopUps] = useState<string[]>([]);
    const [publicTransportLocations, setPublicTransportLocations] = useState<[number, number][]>([]);
    const [publicTransportPopUps, setPublicTransportPopUps] = useState<string[]>([]);

    const addStation = (stationName: string, location: [number, number]) => {
        try {
            setManualLocations(prevLocations => [...prevLocations, location]);
            setManualPopUps(prevPopUps => [...prevPopUps, stationName]);

            // Persist the manual data
            localStorage.setItem("manualLocations", JSON.stringify([...manualLocations, location]));
            localStorage.setItem("manualPopUps", JSON.stringify([...manualPopUps, stationName]));

            alert(`Station "${stationName}" added successfully!`);
        } catch (error) {
            console.error("Failed to add station:", error);
            alert("An error occurred while adding the station. Please try again.");
        }
    };

    const recenterToDeviceLocation = () => {
        if (deviceLocation) {
            //use of Spread Operator (...) to fix unresponsive MapComponent on recenterToDeviceLocation() by creating a new (identical) array.
            setCenterLocation([...deviceLocation]);
        }
    };

    //Fetches the public transport data from the API and stores it in localStorage
    const fetchAndUpdatePublicTransportData = async () => {
        try {
            const response = await fetch(DATA_URL);
            const csvText = await response.text();
            const parsedData: StationData[] = [];

            Papa.parse(csvText, {
                header: true,
                delimiter: ";",
                skipEmptyLines: true,
                complete: (results: Papa.ParseResult<any>) => {
                    results.data.forEach((item: any) => {
                        const { HALTESTELLEN_ID, NAME, WGS84_LAT, WGS84_LON } = item;
                        const lat = parseFloat(WGS84_LAT);
                        const lon = parseFloat(WGS84_LON);

                        if (!isNaN(lat) && !isNaN(lon)) {
                            parsedData.push({
                                id: HALTESTELLEN_ID,
                                name: NAME,
                                location: [lat, lon],
                            });
                        }
                    });
                },
            });

            const newLocations = parsedData.map(station => station.location);
            const newPopUps = parsedData.map(station => station.name);

            // Check if the data has changed
            const storedLocations = JSON.parse(localStorage.getItem("publicTransportLocations") || "[]");
            const storedPopUps = JSON.parse(localStorage.getItem("publicTransportPopUps") || "[]");

            const hasChanged =
                JSON.stringify(newLocations) !== JSON.stringify(storedLocations) ||
                JSON.stringify(newPopUps) !== JSON.stringify(storedPopUps);

            if (hasChanged) {
                console.log("Public transport data has changed. Updating local storage.");
                localStorage.setItem("publicTransportLocations", JSON.stringify(newLocations));
                localStorage.setItem("publicTransportPopUps", JSON.stringify(newPopUps));
            } else {
                console.log("Public transport data is unchanged.");
                //setPublicTransportLocations(storedLocations);
                //setPublicTransportPopUps(storedPopUps);
            }

            // Update the state with the new data - needed to render the list in HomeTab!!?
            setPublicTransportLocations(newLocations);
            setPublicTransportPopUps(newPopUps);
        } catch (error) {
            console.error("Failed to fetch or update public transport data:", error);
        }
    };

    useEffect(() => {
        const fetchDeviceLocation = async () => {
            try {
                const permission = await Geolocation.requestPermissions();
                if (permission.location === 'granted') {
                    const position = await Geolocation.getCurrentPosition();
                    setDeviceLocation([position.coords.latitude, position.coords.longitude]);
                }
            } catch (error) {
                console.error("Device location fetch failed:", error);
            }
        };

        const loadManualLocations = () => {
            const storedManualLocations = JSON.parse(localStorage.getItem("manualLocations") || "[]");
            const storedManualPopUps = JSON.parse(localStorage.getItem("manualPopUps") || "[]");

            setManualLocations(storedManualLocations);
            setManualPopUps(storedManualPopUps);
        };

        //Loads the previously fetched data from localStorage
        const loadPublicTransportData = () => {
            const storedLocations = JSON.parse(localStorage.getItem("publicTransportLocations") || "[]");
            const storedPopUps = JSON.parse(localStorage.getItem("publicTransportPopUps") || "[]");

            setPublicTransportLocations(storedLocations);
            setPublicTransportPopUps(storedPopUps);
        };

        fetchDeviceLocation();
        loadManualLocations();
        //loadPublicTransportData();
        fetchAndUpdatePublicTransportData();
    }, []);

    const combinedLocations = [...publicTransportLocations, ...manualLocations];
    const combinedPopUps = [...publicTransportPopUps, ...manualPopUps];

    return (
        <LocationContext.Provider
            value={{
                centerLocation,
                deviceLocation,
                markerLocations: combinedLocations,
                markerPopUps: combinedPopUps,
                addStation,
                recenterToDeviceLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
