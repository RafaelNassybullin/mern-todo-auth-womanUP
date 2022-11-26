
export interface Login {
  email: string,
  password: string
}

export interface Register {
  name: string,
  email: string,
  password: string
}

export interface JWT_Decoded {
  name: string,
  email: string,
  id: string,
  iat: number,
  exp: number
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface LogOut {
  acknowledged: boolean
  deletedCount: boolean
}
