import execa from 'execa'
import path from 'path'
import packageJson from '../package.json'

/**
 * A better child_process
 * https://github.com/sindresorhus/execa
 */

if (packageJson.dependencies.lonogara) {
  Promise.resolve()
  .then(() =>
    execa.shell('yarn lonogara:rm').then(({ stdout, stderr }) => {
      console.log(stdout)
      console.log(stderr)
    })
  )
  .then(() =>
    execa.shell('git add -u').then(({ stdout, stderr }) => {
      console.log(stdout)
      console.log(stderr)
    })
  )
  .then(() =>
    execa.shell('yarn lonogara:add').then(({ stdout, stderr }) => {
      console.log(stdout)
      console.log(stderr)
    })
  )
  .catch(err => console.error(err))
}