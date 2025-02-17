export interface UserMongoDBModel {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  role: 'user' | 'admin'
}
