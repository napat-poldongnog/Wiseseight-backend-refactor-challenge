// * Express
import express, { type Request, type Response } from 'express'

// * RestRouter namespace
import type { RestRouter } from '../../../../application/configuration/router/restRouter'

// * App env vars
import appEnv from '../../../../application/configuration/properties/appEnv'

// * Use cases
import { UpdateProductUseCase } from '../../../../application/useCase/updateProductUseCase'
import { InquiryAllProductUseCase } from '../../../../application/useCase/inquiryAllProductUseCase'
import { InquiryProductByIdUseCase } from '../../../../application/useCase/inquiryProductByIdUseCase'

// * Outbound repositories
import { ProductMongoDBRepository } from '../../../outbound/db/mongoDB/productMongoDBRepository'
import { ProductRepositoryMongoDBImpl } from '../../../outbound/db/mongoDB/productRepositoryMongoDBImpl'

// * Adapter inbound DTOs
import type { BaseRestResponse } from './baseResponseDTO'
import type { UpdateProductRequestDTO } from './dtos/request/updateProductRequestDTO'
import type { InquiryProductByIdRequestDTO } from './dtos/request/inquiryProductByIdRequestDTO'
import type { UpdateProductRestResponseDTO } from './dtos/response/updateProductRestResponseDTO'
import type { InquiryAllProductRestResponseDTO } from './dtos/response/inquiryAllProductRestResponseDTO'
import type { InquiryProductByIdRestResponseDTO } from './dtos/response/inquiryProductByIdRestResponseDTO'

const env = appEnv()

const productRepositoryMongoDBImpl = new ProductRepositoryMongoDBImpl(new ProductMongoDBRepository())

export class ProductRestController {
  private readonly router = express.Router()

  constructor(
    private readonly inquiryAllProductUseCase: InquiryAllProductUseCase,
    private readonly inquiryProductByIdUseCase: InquiryProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {
    this.initRoute()
  }

  private initRoute() {
    // * Inquiry all products
    this.router.get('/', async (_req: Request, res: Response<BaseRestResponse<InquiryAllProductRestResponseDTO[]>>) => {
      const { data, code, message } = await this.inquiryAllProductUseCase.execute()
      res.json({
        code,
        data,
        message,
      })
    })

    // * Inquiry product by user
    this.router.get(
      '/:id',
      async (
        req: Request<InquiryProductByIdRequestDTO>,
        res: Response<BaseRestResponse<InquiryProductByIdRestResponseDTO>>,
      ) => {
        const { data, code, message } = await this.inquiryProductByIdUseCase.execute(req.params.productId)
        res.json({
          code,
          data,
          message,
        })
      },
    )

    // * Update product
    this.router.put(
      '/',
      async (
        req: Request<object, object, UpdateProductRequestDTO>,
        res: Response<BaseRestResponse<UpdateProductRestResponseDTO>>,
      ) => {
        const { data, code, message } = await this.updateProductUseCase.execute(req.body)
        res.json({
          code,
          data,
          message,
        })
      },
    )
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
    new InquiryAllProductUseCase(productRepositoryMongoDBImpl),
    new InquiryProductByIdUseCase(productRepositoryMongoDBImpl),
    new UpdateProductUseCase(productRepositoryMongoDBImpl),
  ).getRouter(),
}

export default productRouteDefinition
