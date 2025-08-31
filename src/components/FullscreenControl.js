// src/components/FullscreenControl.js
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

function FullscreenControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control.fullscreen({
      position: "topright",
      title: "View Fullscreen",
      titleCancel: "Exit Fullscreen",
      forceSeparateButton: true,
    });

    control.addTo(map);

    // store reference so we can properly remove later
    map._customFullscreen = control;

    return () => {
      if (map._customFullscreen) {
        map.removeControl(map._customFullscreen);

        // remove attached event listeners to avoid this._map = null issues
        map.off("enterFullscreen");
        map.off("exitFullscreen");

        delete map._customFullscreen;
      }
    };
  }, [map]);

  return null;
}

export default FullscreenControl;
