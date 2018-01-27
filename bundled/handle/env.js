const api_key = process.env.TUMBLR_KEY
const proxy = Boolean(process.env.REPOSITORY_URL) && './tumblr'
export default () => ({ api_key, proxy })