const service =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'http://121.40.248.96:3001/'

const config = {
  baseUrl: service,
  fileUploadUrl: service + 'uploads'
}
export default config
