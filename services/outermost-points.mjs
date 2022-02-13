const getOutermostPointsOfPolygons = (polygons) => {
  const latList = [], lngList = []
  polygons.forEach((polygon) => {
    polygon.forEach(({lat, lon}) => {
      latList.push(lat), lngList.push(lon)
    })
  })

  const maxLat = Math.max(...latList)
  const minLat = Math.min(...latList)
  const maxLng = Math.max(...lngList)
  const minLng = Math.min(...lngList)

  return {
    topLeft: { lat: Math.max(...latList), lng: Math.min(...lngList)},
    bottomRight: { lat: Math.min(...latList), lng: Math.max(...lngList)},
  }
}

export default getOutermostPointsOfPolygons