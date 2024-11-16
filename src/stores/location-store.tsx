import React, {createContext, useContext, useEffect, useState} from 'react';
import {Geolocation} from '@capacitor/geolocation';
import Papa from 'papaparse';

// Default to Vienna city center if location isn’t available
const DEFAULT_LOCATION: [number, number] = [48.2082, 16.3738];
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
    markerLocations: [number, number][];
    markerPopUps: string[];
    addStation: (stationName: string, location: [number, number]) => void;
}

const LocationContext = createContext<LocationContextProps>({
    centerLocation: DEFAULT_LOCATION,
    markerLocations: [DEFAULT_LOCATION],
    markerPopUps: ["Vienna City Center"],
    addStation: () => {
    } // Placeholder
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [centerLocation, setCenterLocation] = useState<[number, number]>(DEFAULT_LOCATION);
    const [markerLocations, setMarkerLocations] = useState<[number, number][]>([DEFAULT_LOCATION]);
    const [markerPopUps, setMarkerPopUps] = useState<string[]>(["Vienna City Center"]);

    const addStation = (stationName: string, location: [number, number]) => {

        try {
            // Update the state with the new station
            const updatedLocations = [...markerLocations, location];
            const updatedPopUps = [...markerPopUps, stationName];


            setMarkerLocations(prevLocations => [...prevLocations, location]);
            setMarkerPopUps(prevPopUps => [...prevPopUps, stationName]);

            // Persist the new station data in localStorage
            localStorage.setItem("markerLocations", JSON.stringify([...markerLocations, location]));
            localStorage.setItem("markerPopUps", JSON.stringify([...markerPopUps, stationName]));

            alert(`Station "${stationName}" added successfully!`);
        } catch (error) {
            console.error("Failed to add station:", error);

            // Show error alert
            alert("An error occurred while adding the station. Please try again.");
        }
    }

    useEffect(() => {
        // Fetch device location
        const fetchDeviceLocation = async () => {
            try {
                const permission = await Geolocation.requestPermissions();
                if (permission.location === 'granted') {
                    const position = await Geolocation.getCurrentPosition();
                    const deviceLocation: [number, number] = [position.coords.latitude, position.coords.longitude];

                    console.log("Device location ", deviceLocation);

                    // Update to use device location as center, and avoid duplicate labels
                    setCenterLocation(deviceLocation);
                    setMarkerLocations([deviceLocation, ...markerLocations.slice(1)]); // Replace initial default location
                    setMarkerPopUps(["You are here", ...markerPopUps.slice(1)]); // Replace initial "Vienna City Center" popup
                }
            } catch (error) {
                console.error("Device location fetch failed, using default location:", error);
            }
        };

        // Fetch and parse station data
        const fetchStationData = async () => {
            try {
                const response = await fetch(DATA_URL);
                const csvText = await response.text();
                console.log("CSV text content: ", response.text);
                const parsedData: StationData[] = [];

                Papa.parse(csvText, {
                    header: true,
                    delimiter: ";",
                    skipEmptyLines: true,
                    complete: (results: Papa.ParseResult<any>) => {
                        results.data.forEach((item: any) => {
                            const {HALTESTELLEN_ID, NAME, WGS84_LAT, WGS84_LON} = item;
                            const lat = parseFloat(WGS84_LAT);
                            const lon = parseFloat(WGS84_LON);

                            if (!isNaN(lat) && !isNaN(lon)) {
                                parsedData.push({
                                    id: HALTESTELLEN_ID,
                                    name: NAME,
                                    location: [lat, lon]
                                });
                            }
                        });
                    }
                });

                const locations = parsedData.map(station => station.location);
                const popUps = parsedData.map(station => station.name);

                console.log("Parsed station locations:", locations);
                console.log("Parsed station names for popups:", popUps);

                setMarkerLocations(locations);
                setMarkerPopUps(popUps);

                localStorage.setItem("markerLocations", JSON.stringify(locations));
                localStorage.setItem("markerPopUps", JSON.stringify(popUps));

            } catch (error) {
                console.error("Failed to load station data:", error);
            }
        };

        const initializeLocationData = () => {
            const storedMarkers = JSON.parse(localStorage.getItem("markerLocations") || "[]");
            const storedPopUps = JSON.parse(localStorage.getItem("markerPopUps") || "[]");

            console.log("Loaded markers from storage:", storedMarkers);
            console.log("Loaded popups from storage:", storedPopUps);

            if (storedMarkers.length > 0 && storedPopUps.length > 0) {
                setMarkerLocations(storedMarkers);
                setMarkerPopUps(storedPopUps);
            } else {
                fetchStationData();
            }
        };

        // Only initialize data on mount
        fetchDeviceLocation();
        initializeLocationData();
    }, []);

    return (
        <LocationContext.Provider value={{centerLocation, markerLocations, markerPopUps, addStation}}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
