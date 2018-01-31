import execa from 'execa'

const log = (message) => console.log(`
${message}
`)

export default (condition, command) =>
  condition
  ? execa.shell(command).then(({ cmd }) => log(`done: ${cmd}`))
  : log(`ignored: ${command}`)