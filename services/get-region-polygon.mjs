import LatLon from 'geodesy/latlon-nvector-spherical.js'
import parseKMZ from "parse2-kmz"

const getRegionPolygon = async (filePath) => {
  const polygons = []
  const { features } = await parseKMZ.toJson(filePath)
  features[0].geometry.geometries.forEach((geometry) => {
    geometry.coordinates.forEach((coordinates) => {
      const polygon = coordinates.map(([lng, lat]) => new LatLon(lat, lng))
      polygons.push(polygon)
    })
  })
  return polygons
}

export default getRegionPolygon