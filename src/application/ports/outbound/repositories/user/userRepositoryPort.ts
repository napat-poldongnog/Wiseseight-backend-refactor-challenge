// * User domain entity
import type { UserDomainEntity } from '../../../../domain/entities/user/userDomainEntity'

export interface UserRepositoryPort {
  findById: (userId: string) => UserDomainEntity | null

  findByEmail: (userEmail: string) => UserDomainEntity | null

  create: (user: UserDomainEntity) => UserDomainEntity

  update: (user: UserDomainEntity) => void
}
