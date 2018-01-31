import exec from './exec.js'
import packageJson from '../package.json'

if (packageJson.dependencies.lonogara) {
  Promise.resolve()
  .then(() => exec(true, 'yarn remove lonogara'))
  .then(() => exec(true, 'git add -u'))
  .then(() => exec(true, 'yarn lonogara:add'))
  .catch(({ stderr }) => console.error(stderr))
}