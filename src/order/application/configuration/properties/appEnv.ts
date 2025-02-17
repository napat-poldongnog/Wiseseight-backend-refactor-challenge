// * Dotenv
import dotenv from 'dotenv'

dotenv.config()

const appEnv = () => {
  // * You can implement a custom environment file loader that depends on the environment mode
  return {
    port: process.env.PORT || 3000,
    apiVersion: process.env.API_VERSION || 'v1',
    productServiceVersion: process.env.PRODUCT_SERVICE_VERSION || 'v1',
    productServiceEndpoint: process.env.PRODUCT_SERVICE_ENDPOINT || 'http://localhost:3001',
  }
}

export default appEnv
