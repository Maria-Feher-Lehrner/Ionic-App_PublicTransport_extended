import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useLocation } from "../stores/location-store";
import './HomeTab.css';
import '../theme/main.css';
import {useHistory} from "react-router-dom";

interface StationData {
    name: string;
    location: [number, number];  // Lat and Lon
}

const HomeTab: React.FC = () => {
    const { markerLocations, markerPopUps } = useLocation();  // Access data from context
    const stations = markerLocations.map((location, index) => ({
        name: markerPopUps[index],
        location
    }));

    const history = useHistory();
    const navigateToStationEntryPage = () => {
        history.push("/add-station");
    }

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({ key: "name", direction: "asc" });

    // Sort function
    const sortedStations = [...stations].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Handler to set sorting key and direction
    const requestSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Station List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Station List</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="content-section">
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th
                                    className={`sortable ${sortConfig.key === "name" ? `sorted-${sortConfig.direction}` : ""}`}
                                    onClick={() => requestSort("name")}
                                >
                                    Station
                                </th>
                                <th
                                    className={`sortable ${sortConfig.key === "location" ? `sorted-${sortConfig.direction}` : ""}`}
                                    onClick={() => requestSort("location")}
                                >
                                    LAT
                                </th>
                                <th
                                    className={`sortable ${sortConfig.key === "location" ? `sorted-${sortConfig.direction}` : ""}`}
                                    onClick={() => requestSort("location")}
                                >
                                    LONG
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedStations.map((station, index) => (
                                <tr key={index}>
                                    <td>{station.name}</td>
                                    <td>{station.location[0].toFixed(4)}</td>
                                    <td>{station.location[1].toFixed(4)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={navigateToStationEntryPage}>Add Location</button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomeTab;
