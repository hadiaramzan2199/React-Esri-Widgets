import React, { useState } from 'react';
import { loadModules } from 'esri-loader';

const EditorWidget = () => {
  const [isAdmin, setIsAdmin] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAdmin(true); 
      setLoggedIn(true); 
    } else {
      setIsAdmin(false); 
      setLoggedIn(true); 
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setLoggedIn(false); 
  };

  const renderLoginForm = () => {
    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
            <div>
              <button type="submit">Login</button>
            </div>
      </form>
    </div>
    );
  };
  
  const renderEditorWidget = () => {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Editor', 'esri/layers/FeatureLayer', 'esri/form/elements/FieldElement', 'esri/form/FormTemplate', 'esri/widgets/BasemapGallery', 'esri/widgets/Expand', 'esri/widgets/DistanceMeasurement2D', 'esri/widgets/AreaMeasurement2D', 'esri/widgets/Compass', 'esri/widgets/CoordinateConversion', 'esri/widgets/Home', 'esri/widgets/Legend', 'esri/widgets/Locate', 'esri/Graphic', 'esri/widgets/ScaleBar', 'esri/widgets/Search', 'esri/widgets/Sketch']).then(
      ([Map, MapView, Editor, FeatureLayer, FieldElement, FormTemplate, BasemapGallery, Expand, DistanceMeasurement2D, AreaMeasurement2D, Compass, CoordinateConversion, Home, Legend, Locate, Graphic, ScaleBar, Search, Sketch]) => {
        const map = new Map({
          basemap: 'osm',
        });
        
        const view = new MapView({
          container: 'mapDiv', 
          map: map,
          center: [69, 30.5],
          zoom: 6,
        });

        const baseURL = 'https://gisportal.ptcl.net.pk/arcgis/rest/services/PTCL/new_ptcl_plan_equipment_pending/FeatureServer';
        const numSubLayers = 11;
        const subLayers = [];
        
        for (let i = 0; i < numSubLayers; i++) {
          const subLayerURL = `${baseURL}/${i}`;
          const subLayer = new FeatureLayer({
            url: subLayerURL,
          });
          subLayers.push(subLayer);
        }
        
        map.addMany(subLayers);
        
        const zone = new FeatureLayer({
          url: 'https://gisportal.ptcl.net.pk/arcgis/rest/services/PTCL/Zone/MapServer/0',
        });
        
        map.add(zone);
        
        const layerInfos = isAdmin
        ? subLayers.map((subLayer) => ({
          layer: subLayer,
          enabled: true,
        }))
        : subLayers.map((subLayer) => ({
          layer: subLayer,
          enabled: true,
          addEnabled: true,
          updateEnabled: false
        }));

        const homeWidget = new Home({
          view: view
        });
        
        view.ui.add(homeWidget, "top-left");

        const locateWidget = new Locate({
          view: view, 
          graphic: new Graphic({
            symbol: { type: "simple-marker", color: [255, 0, 0] }
          })
        });
        
        view.ui.add(locateWidget, "top-left");

        let scaleBar = new ScaleBar({
          view: view,
          unit: "dual"
        });
      
        view.ui.add(scaleBar, "bottom-left");

        const legend = new Legend({
          view: view,
          container: document.createElement("div"),
        });

        const legendExpand = new Expand({
          expandIconClass: "esri-icon-collection",
          view: view,
          content: legend,
          expandTooltip: "Legend"
        });
        
        view.ui.add(legendExpand, "bottom-right");

        const sketchWidget = new Sketch({
          layer: subLayers[0],
          view: view,
          container: document.createElement("div")
        });

        const sketchExpand = new Expand({
          expandIconClass: "esri-icon-authorize",
          view: view,
          content: sketchWidget,
          expandTooltip: "Sketch"
        });

        view.ui.add(sketchExpand, "top-right");

        const areaMeasurementWidget = new AreaMeasurement2D({
          view: view,
          container: document.createElement("div")
        });

        const areaExpand = new Expand({
          expandIcon: "measure-area",
          view: view,
          content: areaMeasurementWidget,
          expandTooltip: "Area Measurement"
        });

        areaExpand.watch('expanded', (expanded) => {
          if (expanded) {
            areaMeasurementWidget.viewModel.start('area');
          }
        });

        view.ui.add(areaExpand, 'top-right');

        const distMeasurementWidget = new DistanceMeasurement2D({
          view: view,
          container: document.createElement("div")
        });

        const distExpand = new Expand({
          expandIcon: "measure-line",
          view: view,
          content: distMeasurementWidget,
          expandTooltip: "Distance Measurement"
        });

        distExpand.watch('expanded', (expanded) => {
          if (expanded) {
            distMeasurementWidget.viewModel.start('distance');
          }
        });
        
        view.ui.add(distExpand, 'top-right');

        const searchWidget = new Search({
          view: view,
          container: document.createElement("div")
        });

        const searchExpand = new Expand({
          expandIcon: "search",
          view: view,
          content: searchWidget,
          expandTooltip: "Search"
        });
  
        view.ui.add(searchExpand, {position: "top-left", index: 2});

        const compassWidget = new Compass({
          view: view
        });

        view.ui.add(compassWidget, "top-left");

        const ccWidget = new CoordinateConversion({
          view: view,
          container: document.createElement("div")
        });

        const ccExpand = new Expand({
          expandIcon: "map-pin",
          view: view,
          content: ccWidget,
          expandTooltip: "Coordinate Conversion"
        });
        
        view.ui.add(ccExpand, "bottom-right");

        const basemapGallery = new BasemapGallery({
          view: view,
          container: document.createElement("div")
        });

        const bgExpand = new Expand({
          view: view,
          content: basemapGallery,
          expandTooltip: "Basemaps"
        });
        
        basemapGallery.watch("activeBasemap", () => {
          const mobileSize =
            view.heightBreakpoint === "xsmall" ||
            view.widthBreakpoint === "xsmall";

          if (mobileSize) {
            bgExpand.collapse();
          }
        });

        view.ui.add(bgExpand, "bottom-right");

        const zoneFieldElement = new FieldElement({
          label: "ZONE",
          editable: true,
          fieldName: "ZONE",
          input: {
            type: "combo-box",
            showNoValueOption: true
          }
        });

        const regionFieldElement = new FieldElement({
          label: "REGION",
          editable: true,
          fieldName: "REGION",
          input: {
            type: "combo-box",
            showNoValueOption: true
          }
        });

        const exchFieldElement = new FieldElement({
          label: "EXCH_ID",
          editable: true,
          fieldName: "EXCH_ID",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const nomenclatureFieldElement = new FieldElement({
          label: "STRUCTURE_NOMENCLATURE",
          editable: false,
          fieldName: "STRUCTURE_NOMENCLATURE",
          input: {
            type: "text-box"
          },
          valueExpression: `
            $feature.ZONE + $feature.REGION + $feature.EXCH_ID
          `
        });

        const nameFieldElement = new FieldElement({
          label: "NAME",
          editable: true,
          fieldName: "NAME",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const addressFieldElement = new FieldElement({
          label: "ADDRESS",
          editable: true,
          fieldName: "ADDRESS",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const typeFieldElement = new FieldElement({
          label: "TYPE",
          editable: true,
          fieldName: "TYPE",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const waysFieldElement = new FieldElement({
          label: "NO_OF_WAYS",
          editable: true,
          fieldName: "NO_OF_WAYS",
          input: {
            type: "combo-box",
            showNoValueOption: true
          }
        });

        const approvedFieldElement = new FieldElement({
          label: "ISAPPROVED",
          editable: true,
          fieldName: "ISAPPROVED",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const plannedFieldElement = new FieldElement({
          label: "PLANNED_BY",
          editable: true,
          fieldName: "PLANNED_BY",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const modifiedFieldElement = new FieldElement({
          label: "LAST_MODIFIED_BY",
          editable: true,
          fieldName: "LAST_MODIFIED_BY",
          input: {
            type: "text-box",
            minLength: 0
          }
        });

        const dateFieldElement = new FieldElement({
          label: "MODIFY_DATE",
          editable: true,
          fieldName: "MODIFY_DATE",
          input: {
            type: "datetime-picker",
            includeTime: true,
            min: 1547678342000,
            max: 1610836742000
          }
        });

        const outdoorFieldElement = new FieldElement({
          label: "OUTDOOR",
          editable: true,
          fieldName: "OUTDOOR",
          input: {
            type: "combo-box",
            showNoValueOption: true
          }
        });

        const structureFormTemplate = new FormTemplate({
          elements: [
            nomenclatureFieldElement,
            zoneFieldElement,
            regionFieldElement,
            exchFieldElement,
            nameFieldElement,
            addressFieldElement,
            typeFieldElement,
            waysFieldElement,
            approvedFieldElement,
            plannedFieldElement,
            modifiedFieldElement,
            dateFieldElement,
            outdoorFieldElement
          ],
        });

        view.when(() => {
          const allLayers = view.map.allLayers.toArray();
        
          const loadPromises = allLayers.map((subLayer) => {
            return subLayer.load();
          });
        
          Promise.all(loadPromises).then(() => {
            allLayers.forEach((subLayer) => {
              console.log('Layer Title:', subLayer.title);
              if (subLayer.title === "New ptcl plan equipment pending - STRUCTURE") {
                console.log('Applying Form Template to:', subLayer.title);
                console.log('SubLayer Type:', subLayer.type);
                subLayer.formTemplate = structureFormTemplate;
              }
            });
          }).catch((error) => {
            console.error('Error loading layers:', error);
          });
        
          const editor = new Editor({
            view: view,
            layerInfos: layerInfos,
            supportingWidgetDefaults: {
              featureForm: {
                groupDisplay: "sequential"
              }
            },
            container: document.createElement("div"),
          });

          const editorExpand = new Expand({
            expandIconClass: "esri-icon-edit",
            view: view,
            content: editor,
            expandTooltip: "Editor"
          });
        
          view.ui.add(editorExpand, 'top-right');

        }) 
      }
      
    );

    return (
      <div>
        <h2>Welcome {isAdmin ? 'Admin' : 'Regular User'}</h2>
        <button onClick={handleLogout}>Logout</button>
        <div id="mapDiv" style={{ height: '100vh', margin: 0, padding: 0  }}></div>
        <div id="viewDiv" style={{padding: 0, margin: 0, height: "100%", width: "100%"}}></div>
      </div>
    );
  };

  return <div>{loggedIn ? renderEditorWidget() : renderLoginForm()}</div>;
};

export default EditorWidget;
