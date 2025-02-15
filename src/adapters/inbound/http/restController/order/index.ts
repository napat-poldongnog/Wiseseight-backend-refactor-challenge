// * Express
import express, { type Request, type Response } from 'express'

// * Use cases
import { CreateOrderUseCase } from '../../../../../application/useCase/order/createOrderUseCase'

// * Port interfaces
import { type CreateOrderRequestDTO } from '../../../../../application/ports/inbound/http/rest/order/dtos/createOrderRequestDTO'

// * Outbound repositories
import { OrderMongoDBRepository } from '../../../../outbound/db/mongoDB/order/orderMongoDBRepository'
import { OrderRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/order/orderRepositoryMongoDBImpl'
import { ProductMongoDBRepository } from '../../../../outbound/db/mongoDB/product/productMongoDBRepository'
import { ProductRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

// * Inbound DTOs
import type { BaseRestResponse } from '../dtos'
import type { CreateOrderRestResponseDTO } from './dtos/createOrderRestResponseDTO'

// * RestRouter namespace
import type { RestRouter } from '../../../../../application/configuration/router/restRouter'

export class OrderRestController {
  private readonly router = express.Router()

  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {
    this.initRoute()
  }

  private initRoute() {
    this.router.post(
      '/',
      async (
        req: Request<object, object, CreateOrderRequestDTO>,
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
          return res.status(400).json({ code: '', message })
        } else {
          res.status(201).json({ code: '', message, data })
        }
      },
    )
  }

  getRouter() {
    return this.router
  }
}

const orderRouteDefinition: RestRouter.RouteDefinition = {
  prefix: '/orders',
  /**
   * * We can create a factory function to initialize class instances,
   * * or for a more complex approach, we can use dependency injection (DI)
   */
  router: new OrderRestController(
    new CreateOrderUseCase(
      new ProductRepositoryMongoDBImpl(new ProductMongoDBRepository()),
      new OrderRepositoryMongoDBImpl(new OrderMongoDBRepository()),
    ),
  ).getRouter(),
}

export default orderRouteDefinition
