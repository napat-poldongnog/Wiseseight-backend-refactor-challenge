// * Model interface
import type { UserMongoDBModel } from './userMongoDBModel'

export class UserMongoDBRepository {
  private users: UserMongoDBModel[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      role: 'user',
    },
  ] // pretend this is a mongoDB collection

  findOneById = (id: string) => {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.users.find((u) => u.id === id) ?? null
  }

  findOneByEmail = (email: string) => {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.users.find((u) => u.email === email) ?? null
  }

  createOne = (user: UserMongoDBModel) => {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.users.push(user)

    return user
  }

  updateOne = (user: UserMongoDBModel) => {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const index = this.users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this.users[index] = user
    }
  }
}
