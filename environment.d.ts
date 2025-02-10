declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      [key: string]: string | undefined
    }
  }
}

export {}
