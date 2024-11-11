# Ionic-App_PublicTransport_extended
Basic Ionic project to display all public transport stops from Vienna via API csv import

#This is a "Cross-Platform Advanced" classroom assignment with the following instructions:

Create a basic Ionic (React) Project:

    Add navigation
        with bottom Tabs
        Three Tabs (Home, Map, Profile)
    Fill the Profile tab with information about the app and the developer
        Version from package.json
            Read the package.json and do not copy the content
        Information about the developer (can be fake data)
            Name, address
            Address should be shown on a map on the profile tab
        Profile image that can be stored on the device
    The Home Tab should display the Wiener Linien stations in a list
        Use the .csv file from https://www.data.gv.at/katalog/dataset/stadt-wien_wienerlinienroutingservice
            Do not copy it to the IDE
            Save the data to the device and load it when starting the application
            During startup fetch the stations and replace the old data if is has changed
        Add an "Add" button to create own stations and add them to the list
            The form should be opened in a new page
            Add validation to the user input
        The list should be sortable by name or position
    The Map Tab should also display the Wiener Linien stations
        Use the stored data and display all entries
        Display the location of the device/user
        Add a zoom to current location button
        Watch for position updates and update the marker on the map
    Save data to the (secure) storage
        Display a notification when data is saved
        Display error messages as well
    Setup build
        Build the app
        Test the app on the phone
        Provide at least two screenshots of the app running on a device or simulator
    Abstract the logic as good as possible
    Do not put all code in one file
