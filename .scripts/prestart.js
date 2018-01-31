import exec from './exec.js'
import isExist from 'path-exists'
import packageJson from '../package.json'
import { dllVariable } from './variables.js'

isExist('.env').then((exist) => {
  if (!exist) {
    console.error(new Error('.env is not exist'))
    process.exit(1)
  }

  return Promise.all([
    exec(
      !packageJson.dependencies.lonogara,
      'yarn lonogara:add'
    ),
    isExist(`_local/${dllVariable}.manifest.json`).then(exist =>
      exec(
        !exist,
        'yarn webpack --config .scripts/webpack.config.dll.js'
      )
    ),
    isExist('_local/index.html').then(exist =>
      exec(
        !exist,
        'yarn pipe DEVELOPMENT'
      )
    )
  ])
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
})

