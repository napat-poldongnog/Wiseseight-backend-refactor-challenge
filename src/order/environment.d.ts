declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      PORT: string
      API_VERSION: string
      PRODUCT_SERVICE_VERSION: string
    }
  }
}

export {}
