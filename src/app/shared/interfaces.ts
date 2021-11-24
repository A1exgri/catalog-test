export interface User {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface FirebaseAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface Product {
  id?: string,
  name: string,
  price: number,
  category: string,
  shelfLife: Date,
  date: Date
}
export interface Category {
  id?: string,
  name: string,
  date: Date
}
