import imagemin from 'imagemin'
import svgo from 'imagemin-svgo'

export default opts => data =>
  imagemin.buffer(data, {
    plugins: [svgo({
      js2svg: { pretty: true },
      full: true,
      plugins
    })]
  })

const plugins = [
  'removeDoctype',
  'removeXMLProcInst',
  'removeComments',
  'removeMetadata',
  'removeXMLNS',
  'removeEditorsNSData',
  'cleanupAttrs',
  'minifyStyles',
  // "convertStyleToAttrs",
  'cleanupIDs',
  'removeRasterImages',
  'removeUselessDefs',
  'cleanupNumericValues',
  'cleanupListOfValues',
  'convertColors',
  'removeUnknownsAndDefaults',
  'removeNonInheritableGroupAttrs',
  'removeUselessStrokeAndFill',
  'removeViewBox',
  'cleanupEnableBackground',
  'removeHiddenElems',
  'removeEmptyText',
  'convertShapeToPath',
  'moveElemsAttrsToGroup',
  'moveGroupAttrsToElems',
  'collapseGroups',
  'convertPathData',
  'convertTransform',
  'removeEmptyAttrs',
  'removeEmptyContainers',
  'mergePaths',
  'removeUnusedNS',
  'sortAttrs',
  'removeTitle',
  'removeDesc',
  'removeDimensions',
  'removeAttrs',
  'removeElementsByAttr',
  'addClassesToSVGElement',
  'removeStyleElement',
  'addAttributesToSVGElement'
]