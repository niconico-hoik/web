import execa from 'execa'
import isExist from 'path-exists'
import packageJson from './package.json'
import { dllname } from './.variables.js'

const throws = (message) => { throw new Error(message) }
const errorhandler = (err) => {
  console.error(err)
  process.exit(1)
}

const ignored = (target) => console.log(`ignored: ${target}`)
const done = (target) => console.log(`done: ${target}`)

const exec = (command) => execa.shell(command).then(({ cmd }) => done(cmd))
const execIf = (condition, command) => Promise.resolve(!condition ? ignored(command) : exec(command))

const hooks = {
  'prestart': () =>
    isExist('.env')
    .then(exist =>
      !exist
      ? throws('.env is not exist')
      : Promise.all([
        execIf(!packageJson.dependencies.lonogara, 'yarn lonogara:add'),
        isExist(`_local/${dllname}.manifest.json`).then(exist => execIf(!exist, 'yarn wpack:dll')),
        exec('yarn upgrade imagemin-jpegtran')
      ])
    )
    .catch(errorhandler),

  'prebuild': () =>
    isExist('.env')
    .then(exist =>
      !exist
      ? throws('.env is not exist')
      : Promise.all([
        execIf(!packageJson.dependencies.lonogara, 'yarn lonogara:add'),
        exec('yarn upgrade imagemin-jpegtran')
      ])
    )
    .catch(errorhandler),

  'precommit': () =>
    !packageJson.dependencies.lonogara
    ? ignored('remove lonogara')
    : Promise.resolve()
      .then(() => exec('yarn remove lonogara'))
      .then(() => exec('git add -u'))
      .catch(({ stderr }) => console.error(stderr))
}

const hook = hooks[process.env.HOOK_ENV]
typeof hook === 'function' && hook()