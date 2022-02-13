import isInPolygonsService from './is-in-polygons.mjs'
import getElevationFromPointService from './elevation-from-point.mjs'

const elevationDotmap = async (dotmap, outermostPoints, polygons, nasaCredentials) => {
  const result = []

  for (let i = 0; i < dotmap.length; i++) {
    const row = dotmap[i]
    const resultRow = []
    for (let j = 0; j < row.length; j++) {
      const point = row[j]
      let elevation = 0

      if (isInPolygonsService(point, polygons)) {
        elevation = await getElevationFromPointService(point, outermostPoints, nasaCredentials)
      }
      resultRow.push(elevation)
      console.log(`${i}/${dotmap.length} ${Math.round(i*100/dotmap.length)}%  --  ${j}/${row.length} ${Math.round(j*100/row.length)}%  --  ${elevation}`)
    }
    result.push(resultRow)
  }
  return result
}

export default elevationDotmap