import SyncTileSet from 'srtm-elevation/src/sync-tile-set.js'

const getElevationFromPoint = ({lat, lng}, {topLeft, bottomRight}, nasaCredentials) => {
  return new Promise((resolve, reject) => {
    const tileset = new SyncTileSet('./data/hgt/', [bottomRight.lat, topLeft.lng], [topLeft.lat, bottomRight.lng], (error) => {
      if (error) {
        reject(error)
      } else {
        const result = tileset.getElevation([lat, lng]);
        resolve(result)
      }
    }, nasaCredentials)
  })
}

export default getElevationFromPoint