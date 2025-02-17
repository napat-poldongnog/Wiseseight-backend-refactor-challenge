// * NodeJS modules
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

// * Express instance type
import type { ExpressInstance } from '../../../app'

// * App interface
import type { Router } from 'express'

export declare namespace RestRouter {
  export interface RouteDefinition {
    prefix: string
    router: Router
  }

  export interface BaseResponse<T> {
    code?: string
    data?: T
    error?: string
    message?: string
  }
}

class AppRestRouter {
  private readonly expressInstance: ExpressInstance
  private readonly restRouteFilePath: string = path.resolve('./adapters/inbound/http/restController')

  constructor(expressInstance: ExpressInstance) {
    this.expressInstance = expressInstance
  }

  private async importAllRestRoutes(dir: string) {
    const files = fs.readdirSync(dir, { withFileTypes: true })

    for (const file of files) {
      const fullPath = path.join(dir, file.name)

      if (file.isDirectory()) {
        await this.importAllRestRoutes(fullPath)
      } else if (file.name === 'index.ts') {
        try {
          const fileUrl = pathToFileURL(fullPath).href
          const { prefix, router } = (await import(fileUrl)).default as RestRouter.RouteDefinition

          this.expressInstance.use(prefix, router)
        } catch (error) {
          console.error(`Failed to import REST route ${fullPath}:`, error)
        }
      }
    }
  }

  async init() {
    this.importAllRestRoutes(this.restRouteFilePath)
  }
}

export default AppRestRouter
