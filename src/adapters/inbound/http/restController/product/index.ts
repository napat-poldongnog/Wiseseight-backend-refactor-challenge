// * Express
import express, { type Request, type Response } from 'express'

// * Use cases
import { InquiryAllProductUseCase } from '../../../../../application/useCase/product/inquiryAllProductUseCase'

// * Outbound repositories
import { ProductMongoDBRepository } from '../../../../outbound/db/mongoDB/product/productMongoDBRepository'
import { ProductRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

// * Inbound DTOs
import type { BaseRestResponse } from '../dtos'
import type { InquiryAllProductRestResponseDTO } from './dtos/inquiryAllProductRestResponseDTO'

// * RestRouter namespace
import type { RestRouter } from '../../../../../application/configuration/router/restRouter'

import appEnv from '../../../../../application/configuration/properties/appEnv'

const env = appEnv()

export class ProductRestController {
  private readonly router = express.Router()

  constructor(private readonly inquiryAllProductUseCase: InquiryAllProductUseCase) {
    this.initRoute()
  }

  private initRoute() {
    this.router.get('/', async (_req: Request, res: Response<BaseRestResponse<InquiryAllProductRestResponseDTO[]>>) => {
      const { data, code, message } = await this.inquiryAllProductUseCase.execute()
      res.json({
        code,
        data,
        message,
      })
    })
  }

  getRouter() {
    return this.router
  }
}

const productRouteDefinition: RestRouter.RouteDefinition = {
  prefix: `/${env.apiVersion}/products`,
  /**
   * * We can create a factory function to initialize class instances,
   * * or for a more complex approach, we can use dependency injection (DI)
   */
  router: new ProductRestController(
    new InquiryAllProductUseCase(new ProductRepositoryMongoDBImpl(new ProductMongoDBRepository())),
  ).getRouter(),
}

export default productRouteDefinition
