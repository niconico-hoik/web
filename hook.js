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
    Promise.all([
      isExist(`_local/${dllname}.manifest.json`).then(exist => execIf(!exist, 'npm run wpack:dll')),
      // exec('yarn upgrade imagemin-jpegtran')
    ])
    .catch(errorhandler),

  'prebuild': () =>
    Promise.all([
      // exec('yarn upgrade imagemin-jpegtran')
    ])
    .catch(errorhandler)
}

const hook = hooks[process.env.HOOK_ENV]
typeof hook === 'function' && hook()