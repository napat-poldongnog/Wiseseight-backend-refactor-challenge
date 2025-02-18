// * Express
import express, { type Request, type Response } from 'express'

// * RestRouter namespace
import type { RestRouter } from '../../../../application/configuration/router/restRouter'

// * App env vars
import appEnv from '../../../../application/configuration/properties/appEnv'

// * Use cases
import { CreateOrderUseCase } from '../../../../application/useCase/createOrderUseCase'
import { InquiryOrderByIdUserCase } from '../../../../application/useCase/inquiryOrderByIdUserCase'

// * Adapter outbound repositories
import { OrderMongoDBRepository } from '../../../outbound/db/mongoDB/orderMongoDBRepository'
import { OrderRepositoryMongoDBImpl } from '../../../outbound/db/mongoDB/orderRepositoryMongoDBImpl'

// * Adapter outbound API
import { ProductApiImpl } from '../../../outbound/gatewayAPI/productApi/productApiImpl'

// * Adapter inbound DTOs
import type { BaseRestResponse } from './baseResponseDTO'
import type { CreateOrderRestRequestDTO } from './dtos/request/createOrderRestRequestDTO'
import type { CreateOrderRestResponseDTO } from './dtos/response/createOrderRestResponseDTO'
import type { InquiryOrderByIdRequestDTO } from '../../../../application/ports/inbound/http/rest/order/dtos/request/inquiryOrderByIdRequestDTO'
import type { InquiryOrderByIdRestResponeDTO } from './dtos/response/inquiryOrderByIdRestResponeDTO'

const env = appEnv()

export class OrderRestController {
  private readonly router = express.Router()

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly inquiryOrderByIdUseCase: InquiryOrderByIdUserCase,
  ) {
    this.initRoute()
  }

  private initRoute() {
    // * Inquiry order by id
    this.router.get(
      '/:id',
      async (
        req: Request<InquiryOrderByIdRequestDTO>,
        res: Response<BaseRestResponse<InquiryOrderByIdRestResponeDTO>>,
      ): Promise<any> => {
        const { code, message, data } = await this.inquiryOrderByIdUseCase.execute(req.params)

        if (code === '0000') {
          res.status(201).json({ code, message, data })
        } else if (code === '0001') {
          return res.status(400).json({ code, message })
        } else {
          res.status(500).json({ code, message })
        }
      },
    )

    // * Place order
    this.router.post(
      '/',
      async (
        req: Request<object, object, CreateOrderRestRequestDTO>,
        res: Response<BaseRestResponse<CreateOrderRestResponseDTO>>,
      ): Promise<any> => {
        const { code, message, data } = await this.createOrderUseCase.execute(req.body)

        if (code === '0000') {
          res.status(201).json({ code, message, data })
        } else if (code === '0001') {
          return res.status(400).json({ code, message })
        } else if (code === '0002') {
          return res.status(404).json({ code, message })
        } else if (code === '0003') {
          return res.status(400).json({ code, message })
        } else {
          res.status(500).json({ code, message })
        }
      },
    )
  }

  getRouter() {
    return this.router
  }
}

const orderRouteDefinition: RestRouter.RouteDefinition = {
  prefix: `/${env.apiVersion}/orders`,
  /**
   * * We can create a factory function to initialize class instances,
   * * or for a more complex approach, we can use dependency injection (DI)
   */
  router: new OrderRestController(
    new CreateOrderUseCase(new ProductApiImpl(), new OrderRepositoryMongoDBImpl(new OrderMongoDBRepository())),
    new InquiryOrderByIdUserCase(new ProductApiImpl(), new OrderRepositoryMongoDBImpl(new OrderMongoDBRepository())),
  ).getRouter(),
}

export default orderRouteDefinition
