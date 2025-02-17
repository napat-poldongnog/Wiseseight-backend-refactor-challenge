// * UUID
import { v4 as uuidv4 } from 'uuid'

// * Use case config interface
import type { UseCase } from '../../configuration/useCase'

// * Inbound port interface
import type { RegisterPort } from '../../ports/inbound/http/rest/user/registerPort'

// * Outbound repository
import type { UserRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/user/userRepositoryMongoDBImpl'

export class RegisterUseCase implements UseCase<RegisterPort.Body, RegisterPort.Result> {
  constructor(private readonly userRepositoryMongoDBImpl: UserRepositoryMongoDBImpl) {}

  async execute(reqBody: RegisterPort.Body) {
    try {
      const { email, password } = reqBody

      if (!email || !password) {
        return { code: '0001', data: null, message: 'Email and password are required' }
      }

      if (!email.includes('@')) {
        return { code: '0002', data: null, message: 'Invalid email format' }
      }

      const existingUser = this.userRepositoryMongoDBImpl.findByEmail(email)

      if (existingUser) {
        return { code: '0003', data: null, message: 'User already exists' }
      }

      const newUser = {
        id: uuidv4(),
        email,
        password,
        firstName: '',
        lastName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        role: 'user' as const,
      }
      this.userRepositoryMongoDBImpl.create(newUser)

      console.log(`Sending welcome email to ${email}`)

      return {
        code: '0000',
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          isActive: newUser.isActive,
          role: 'user',
        } as RegisterPort.Result['data'],
        message: 'User registered successfully',
      }
    } catch (e: unknown) {
      let message = 'An error occurred'

      if (typeof e === 'string') {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      }

      return {
        data: null,
        code: 'E500', // Just mock
        message,
      }
    }
  }

  validate() {}
}
