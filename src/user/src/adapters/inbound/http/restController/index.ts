// * Express
import express, { type Request, type Response } from 'express'

// * RestRouter namespace
import type { RestRouter } from '../../../../application/configuration/router/restRouter'

// * App env vars
import appEnv from '../../../../application/configuration/properties/appEnv'

// * Use cases
import { RegisterUseCase } from '../../../../application/useCase/registerUseCase'
import { UserOrderUseCase } from '../../../../application/useCase/userOrderUseCase'

// * Adapter outbound repositories
import { UserMongoDBRepository } from '../../../outbound/db/mongoDB/userMongoDBRepository'
import { UserRepositoryMongoDBImpl } from '../../../outbound/db/mongoDB/userRepositoryMongoDBImpl'

// * Adapter outbound APIs
import { OrderApiImpl } from '../../../outbound/gatewayAPI/orderApi/orderApiImpl'
import { ProductApiImpl } from '../../../outbound/gatewayAPI/productApi/productApiImpl'

// * Adapter inbound DTOs
import type { BaseRestResponse } from './baseResponseDTO'
import type { RegisterRestRequestDTO } from './dtos/request/registerRestRequestDTO'
import type { RegisterRestResponseDTO } from './dtos/response/registerRestResponseDTO'
import type { InquiryUserOrderRestRequestDTO } from './dtos/request/inquiryUserOrderRestRequestDTO'
import type { InquiryUserOrderRestResponseDTO } from './dtos/response/inquiryUserOrderRestResponseDTO'

const env = appEnv()

export class UserRestController {
  private readonly router = express.Router()

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly userOrderUseCase: UserOrderUseCase,
  ) {
    this.initRoute()
  }

  private initRoute() {
    // * Register
    this.router.post(
      '/register',
      async (
        req: Request<object, object, RegisterRestRequestDTO>,
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

    // * Inquiry all user orders
    this.router.get(
      '/:id/orders',
      async (
        req: Request<InquiryUserOrderRestRequestDTO>,
        res: Response<BaseRestResponse<InquiryUserOrderRestResponseDTO[]>>,
      ): Promise<any> => {
        const result = await this.userOrderUseCase.execute(req.params)

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
  prefix: `/${env.apiVersion}/users`,
  /**
   * * We can create a factory function to initialize class instances,
   * * or for a more complex approach, we can use dependency injection (DI)
   */
  router: new UserRestController(
    new RegisterUseCase(new UserRepositoryMongoDBImpl(new UserMongoDBRepository())),

    new UserOrderUseCase(
      new UserRepositoryMongoDBImpl(new UserMongoDBRepository()),
      new OrderApiImpl(),
      new ProductApiImpl(),
    ),
  ).getRouter(),
}

export default userRouteDefinition
