
export interface SaveTypes {
  title: string
  description: string
  userID?: string
}

export interface GetTypes {
  page: number,
  userID: string
}

export interface TodoTypes {
  _id: string
  userID: string
  title: string
  description: string
  checked: boolean
  image: string

  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface TodoState {
  todoLoader: boolean,
  todoData: TodoTypes[],
  allData: TodoTypes[],
  todoError: boolean,
  page: number,
  isFetching: boolean,
  dataCount: number,
  paginateError: boolean
}