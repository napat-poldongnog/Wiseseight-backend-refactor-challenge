// * Express
import express, { type Request, type Response } from 'express'

// * Use cases
import { RegisterUseCase } from '../../../../../application/useCase/user/registerUseCase'
import { UserOrderUseCase } from '../../../../../application/useCase/user/userOrderUseCase'

// * Port interfaces
import { type RegisterRequestDTO } from '../../../../../application/ports/inbound/http/rest/user/dtos/registerRequestDTO'

// * Outbound repositories
import { type UserOrderRequestDTO } from '../../../../../application/ports/inbound/http/rest/user/dtos/userOrderRequestDTO'
import { OrderMongoDBRepository } from '../../../../outbound/db/mongoDB/order/orderMongoDBRepository'
import { UserMongoDBRepository } from '../../../../outbound/db/mongoDB/user/userMongoDBRepository'
import { UserRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/user/userRepositoryMongoDBImpl'
import { OrderRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/order/orderRepositoryMongoDBImpl'
import { ProductMongoDBRepository } from '../../../../outbound/db/mongoDB/product/productMongoDBRepository'
import { ProductRepositoryMongoDBImpl } from '../../../../outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

// * Inbound DTOs
import type { BaseRestResponse } from '../dtos'
import type { RegisterRestResponseDTO } from './dtos/registerRestResponseDTO'
import type { UserOrderRestResponseDTO } from './dtos/userOrderRestResponseDTO'

// * RestRouter namespace
import type { RestRouter } from '../../../../../application/configuration/router/restRouter'

export class UserRestController {
  private readonly router = express.Router()

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly userOrderUseCase: UserOrderUseCase,
  ) {
    this.initRoute()
  }

  private initRoute() {
    this.router.post(
      '/register',
      async (
        req: Request<object, object, RegisterRequestDTO>,
        res: Response<BaseRestResponse<RegisterRestResponseDTO>>,
      ): Promise<any> => {
        const { code, data, message } = await this.registerUseCase.execute(req.body)

        if (code === '0001') {
          return res.status(400).json({ code, message })
        } else if (code === '0002') {
          return res.status(404).json({ code, message })
        } else if (code === '0003') {
          return res.status(400).json({ code, message })
        } else {
          return res.status(201).json({ code, message, data })
        }
      },
    )

    this.router.get(
      '/:id/orders',
      async (req: Request, res: Response<BaseRestResponse<UserOrderRestResponseDTO[]>>): Promise<any> => {
        const result = await this.userOrderUseCase.execute(req.params as unknown as UserOrderRequestDTO)

        if (result.code === '0001') {
          return res.status(404).json(result)
        }

        res.status(200).json(result)
      },
    )
  }

  getRouter() {
    return this.router
  }
}

const userRouteDefinition: RestRouter.RouteDefinition = {
  prefix: '/users',
  /**
   * * We can create a factory function to initialize class instances,
   * * or for a more complex approach, we can use dependency injection (DI)
   */
  router: new UserRestController(
    new RegisterUseCase(new UserRepositoryMongoDBImpl(new UserMongoDBRepository())),

    new UserOrderUseCase(
      new UserRepositoryMongoDBImpl(new UserMongoDBRepository()),
      new OrderRepositoryMongoDBImpl(new OrderMongoDBRepository()),
      new ProductRepositoryMongoDBImpl(new ProductMongoDBRepository()),
    ),
  ).getRouter(),
}

export default userRouteDefinition
