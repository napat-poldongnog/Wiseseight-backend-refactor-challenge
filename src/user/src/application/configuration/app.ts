// * Express
import express, { type Request, type Response } from 'express'

// * App REST router
import AppRestRouter from './router/restRouter'

// * Express instance type
import { type ExpressInstance } from '../../app'

class App {
  readonly #expressInstance: ExpressInstance

  constructor(expressInstance: ExpressInstance) {
    this.#expressInstance = expressInstance
  }

  #registerRootRoute() {
    this.#expressInstance.get('/', (_: Request, res: Response) => {
      res.status(200).json({ message: 'Hello World' })
    })
  }

  #intiMiddlewares() {
    this.#expressInstance.use(express.json())
  }

  #router() {
    const restRouter = new AppRestRouter(this.#expressInstance)

    return {
      init: () => {
        restRouter.init()
      },
    }
  }

  init() {
    this.#intiMiddlewares()

    this.#registerRootRoute()

    this.#router().init()

    return this.#expressInstance
  }
}

export default App
