export interface userType {
     userName: string
     passWord: string
     sessionId: string
     listMovieId: number[]
     status: boolean
}
declare interface userType {
     userName: string
     passWord: string
     sessionId: string
     listMovieId: number[]
     status: boolean
}
declare global {
     interface listMovieType {
          description: string
          favorite_count: number
          id: number
          item_count: number
          iso_639_1: string
          list_type: string
          name: string
          poster_path: string
     }
}

export {}
