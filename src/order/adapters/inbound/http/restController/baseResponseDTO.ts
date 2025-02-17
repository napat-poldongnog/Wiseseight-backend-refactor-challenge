export interface BaseRestResponse<T> {
  code?: string
  data?: T | null
  message?: string
}
