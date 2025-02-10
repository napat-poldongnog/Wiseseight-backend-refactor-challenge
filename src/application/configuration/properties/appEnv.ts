// * Dotenv
import dotenv from 'dotenv'

dotenv.config()

const appEnv = () => {
  // * You can implement a custom environment file loader that depends on the environment mode
  return {
    port: process.env.PORT || 3000,
  }
}

export default appEnv
