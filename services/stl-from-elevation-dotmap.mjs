import stlSerializer from '@jscad/stl-serializer'
import Blob from 'node-blob'
import fs from 'fs'

import modeling from '@jscad/modeling'
const { cube, cylinder, sphere, cuboid, roundedCuboid, torus } = modeling.primitives
const { expand } = modeling.expansions
const { hull, hullChain } = modeling.hulls

const stlFromElevationDotmap = (rows, resultFilePath) => {
  const shapes = []
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const elevation = rows[i][j];
      if (!elevation) { continue }
      const shape = cuboid({center: [i, j, (elevation/50)/2], size: [1, 1, elevation/50]})
      shapes.push(shape)
    }
  }

  const rawData = stlSerializer.serialize({ binary: true }, shapes)
  const file = fs.createWriteStream(resultFilePath)
  rawData.forEach(buf => file.write(Buffer.from(buf)))
}

export default stlFromElevationDotmap