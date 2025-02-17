// * Outbound port interface
import type { UserRepositoryPort } from '../../../../application/ports/outbound/repositories/userRepositoryPort'

// * Model interface
import type { UserMongoDBModel } from './userMongoDBModel'

// * User mongoDB repository
import type { UserMongoDBRepository } from './userMongoDBRepository'

export class UserRepositoryMongoDBImpl implements UserRepositoryPort {
  constructor(private readonly userMongoDBRepository: UserMongoDBRepository) {}

  async findById(userId: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.userMongoDBRepository.findOneById(userId)
  }

  async findByEmail(userEmail: string) {
    return this.userMongoDBRepository.findOneByEmail(userEmail)
  }

  async create(product: UserMongoDBModel) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.userMongoDBRepository.createOne(product)
  }

  async update(product: UserMongoDBModel) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.userMongoDBRepository.updateOne(product)
  }
}
