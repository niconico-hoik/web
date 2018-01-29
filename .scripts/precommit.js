import execa from 'execa'
import packageJson from '../package.json'

/**
 * A better child_process
 * https://github.com/sindresorhus/execa
 */

const shellThenOut = (command) =>
  execa.shell(command)
  .then(({ stdout }) => console.log(stdout))

if (packageJson.dependencies.lonogara) {
  Promise.resolve()
  .then(() => shellThenOut('yarn remove lonogara'))
  .then(() => shellThenOut('git add -u'))
  .then(() => shellThenOut('yarn lonogara:add'))
  .catch(({ stderr }) => console.error(stderr))
}