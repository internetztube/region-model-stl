const dotmap = ({topLeft, bottomRight}, resultionInMeters) => {
  const rows = []
  let currentLat = topLeft.lat, currentLng = topLeft.lng
  const maxLat = bottomRight.lat, maxLng = bottomRight.lng
  do {
    const row = []
    do {
      const dot = {lat: currentLat, lng: currentLng}
      row.push(dot)
      console.log(dot)
      // currentLng += 0.000009 * resultionInMeters
      currentLng += (360 * (1/(Math.cos((currentLat * Math.PI) / (90 * 2))) / 40000000)) * resultionInMeters
    } while (currentLng < maxLng)
    rows.push(row)
    currentLng = topLeft.lng
    currentLat -= 0.000009 * resultionInMeters
  } while (currentLat > maxLat)
  return rows
}

export default dotmap