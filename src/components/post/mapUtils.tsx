import { useEffect } from "react";
// react-leaflet is provided at runtime, but its types may be unavailable in
// environments that do not ship the package declarations.
// @ts-expect-error -- keep this utility usable when react-leaflet types are absent.
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet's default marker icon paths are broken by bundlers, so we point
// them at the bundled assets once here for both post forms to share.
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export interface AddressDetails {
  suburb?: string;
  village?: string;
  town?: string;
  city?: string;
  county?: string;
  country?: string;
}

export interface NominatimResponse {
  display_name: string;
  lat: string;
  lon: string;
  address: AddressDetails;
}

// Re-centers the Leaflet map whenever `center` changes (e.g. after a
// geocoding lookup or a click on the map).
export const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};
