import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import outermostPointsService from './services/outermost-points.mjs'
import dotmapService from './services/dotmap.mjs'
import getRegionPolygonService from './services/get-region-polygon.mjs'
import elevationDotmapService from './services/elevation-dotmap.mjs'
import stlFromElevationDotmapService from './services/stl-from-elevation-dotmap.mjs'

const nasaCredentials = {
  username: process.env.NASA_USERNAME,
  password: process.env.NASA_PASSWORD
}
const resultionInMeters = 10_000;

(async () => {
  const cacheFilePath = `./data/cache/at-${resultionInMeters}m.json`;
  const resultFilePath = `./data/result/at-${resultionInMeters}m.stl`;
  let elevationDotmap;
  if (!fs.existsSync(cacheFilePath)) {
    const shapeFile = `${path.resolve()}/data/country-shapes/gadm36_AUT_0.kmz`
    const polygons = await getRegionPolygonService(shapeFile)
    const outermostPoints = outermostPointsService(polygons)
    const dotmap = dotmapService(outermostPoints, resultionInMeters)
    elevationDotmap = await elevationDotmapService(dotmap, outermostPoints, polygons, nasaCredentials)
    stlFromElevationDotmapService(elevationDotmap, resultFilePath)
    fs.writeFileSync(cacheFilePath, JSON.stringify(elevationDotmap))
  } else {
    elevationDotmap = JSON.parse(fs.readFileSync(cacheFilePath))
    stlFromElevationDotmapService(elevationDotmap, resultFilePath)
  }
})()

