import LatLon from 'geodesy/latlon-nvector-spherical.js';

const isInPolygons = ({ lat, lng }, polygons) => {
  const point = new LatLon(lat, lng)
  for (let i = 0; i < polygons.length; i++) {
    if (point.isEnclosedBy(polygons[i])) { return true }
  }
  return false
}

export default isInPolygons