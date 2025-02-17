// * Express
import express from 'express'

// * Application config
import App from './src/application/configuration/app'
import appEnv from './src/application/configuration/properties/appEnv'

const envVars = appEnv()

const app = new App(express()).init()

app.listen(envVars.port, () => {
  console.log(`Server running on port ${envVars.port}`)
})
