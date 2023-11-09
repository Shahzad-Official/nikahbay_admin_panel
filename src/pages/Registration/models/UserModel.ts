export interface UserModel {
    success: boolean
    message: string
    data?: UserData
    token?: string
  }
  
  export interface UserData {
    _id: string
    profile: string
    firstName: string
    lastName: string
    email: string
    password: string
    tokenAuth: boolean
    isAuthorized: boolean
  }
  