// * User domain entity
import type { UserDomainEntity } from '../../../domain/entities/user/userDomainEntity'

export interface UserRepositoryPort {
  findById: (userId: string) => Promise<UserDomainEntity | null>

  findByEmail: (userEmail: string) => Promise<UserDomainEntity | null>

  create: (user: UserDomainEntity) => Promise<UserDomainEntity>

  update: (user: UserDomainEntity) => Promise<void>
}
