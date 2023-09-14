# React-Esri-Widgets-App

This is a React application that displays multiple ESRI widgets using the ArcGIS JavaScript API version 4.27. The app allows users to log in as either an admin or a regular user to access and interact with various GIS functionalities.

## Features

1. **Login System**: Users can log in with a username and password. If the credentials match the admin's credentials, they will be granted admin access.

2. **Map Display**: The application displays a map with multiple layers fetched from an ArcGIS REST service.

3. ### Widgets:

- **Home Widget**: Allows users to reset the map view to its initial extent.
- **Locate Widget**: Helps users find their current location on the map.
- **Scale Bar**: Displays a scale bar on the map.
- **Legend**: Shows a legend for the map layers.
- **Sketch Widget**: Enables drawing and editing features on the map.
- **Area Measurement Widget**: Measures the area of polygons on the map.
- **Distance Measurement Widget**: Measures distances between points on the map.
- **Search Widget**: Allows users to search for specific locations on the map.
- **Compass Widget**: Displays a compass for orienting the map.
- **Coordinate Conversion Widget**: Converts coordinates between different formats.
- **Basemap Gallery**: Allows users to switch between different basemaps.
- **Editor Widget**: Provides editing capabilities for the map layers.

## Usage

1. Clone this repository to your local machine:

```javascript
git clone https://github.com/hadiaramzan2199/React-Esri-Widgets.git
```

2. Navigate to the project directory:

```javascript
cd react-esri-widgets-app
```

3. Install the project dependencies:

```javascript
npm install
```

4. Start the development server:

```javascript
npm start
```

## Configuration

To customize the application or connect it to a different ArcGIS REST service, you can modify the code in `EditorWidget.js`. Here are some areas you might want to customize:

- **Credentials**: Update the admin's credentials in the `handleLogin` function.

- **Map Configuration**: Modify the map's initial extent, basemap, and layers in the `renderEditorWidget` function.

- **Layer Configuration**: Customize how map layers are loaded and configured.

- **Widget Configuration**: Adjust the widgets you want to display and their placement on the map.

## Dependencies

This project relies on the following libraries and technologies:

- **[React](https://react.dev/)**: JavaScript library for building user interfaces.

- **[ArcGIS JavaScript API](https://developers.arcgis.com/javascript/latest/)**: Used to integrate ESRI GIS functionalities into the application.

- **[esri-loader](https://github.com/Esri/esri-loader)**: A utility for loading ArcGIS API modules asynchronously.















