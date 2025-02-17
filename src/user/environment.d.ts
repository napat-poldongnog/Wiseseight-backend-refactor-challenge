declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      PORT: string
      API_VERSION: string
      ORDER_SERVICE_VERSION: string
      ORDER_SERVICE_ENDPOINT: string
      PRODUCT_SERVICE_VERSION: string
      PRODUCT_SERVICE_ENDPOINT: string
    }
  }
}

export {}
