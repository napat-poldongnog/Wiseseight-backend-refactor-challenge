class Logger {
  info(message: string) {
    console.log(message)
  }

  warn(message: string) {
    console.warn(message)
  }

  error(message: string) {
    console.error(message)
  }
}

export default Logger
