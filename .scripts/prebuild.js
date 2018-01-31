import exec from './exec.js'
import isExist from 'path-exists'
import packageJson from '../package.json'

isExist('.env').then((exist) => {
  if (!exist) {
    console.error(new Error('.env is not exist'))
    process.exit(1)
  }

  return Promise.all([
    exec(
      !packageJson.dependencies.lonogara,
      'yarn lonogara:add'
    )
  ])
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
})

