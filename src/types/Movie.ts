export interface movieDeital {
     category?: categoryMovie[]
     content?: string
     time?: string
     name?: string
     thumb_url?: string
     origin_name?: string
     actor?: string[]
     country?: categoryMovie[]
     lang?: string
     quality?: string
     episode_current?: string
     episode_total?: string
     year?: string
}
export interface categoryMovie {
     id: string
     name: string
     slug: string
}

export interface dataPage {
     modified?: object
     _id?: string
     slug?: string
     name?: string
     origin_name?: string
     thumb_url?: string
     poster_url?: string
     year?: string
}
//////////////////////////////////

export interface resultsMovie {
     adult?: boolean
     backdrop_path?: string
     genre_ids?: number[]
     id?: number
     original_language?: string
     original_title?: string
     overview?: string
     popularity?: number
     poster_path?: string
     release_date?: string
     title?: string
     video?: boolean
     vote_average?: number
     vote_count?: number
     media_type?: string
}
export interface pageMovieType {
     dates?: object
     page?: number
     results?: resultsMovie[]
     total_pages?: number
     total_results?: number
}
interface belongs_to_collection {
     id: number
     name: string
     poster_path: string
     backdrop_path: string
}
interface genres {
     id: number
     name: string
}
interface production_companies {
     id: number
     logo_path: string
     name: string
     origin_country: string
}
interface production_countries {
     iso_3166_1: string
     name: string
}
interface spoken_languages {
     english_name: string
     iso_639_1: string
     name: string
}
export interface detailMovieType {
     adult?: boolean
     backdrop_path?: string
     belongs_to_collection?: belongs_to_collection
     budget?: number
     genres?: genres[]
     homepage?: string
     id?: number
     imdb_id?: string
     original_language?: string
     original_title?: string
     overview?: string
     popularity?: number
     poster_path?: string
     production_companies?: production_companies[]
     production_countries?: production_countries[]
     release_date?: string
     revenue?: number
     runtime?: number
     spoken_languages?: spoken_languages[]
     status?: string
     tagline?: string
     title?: string
     video?: boolean
     vote_average?: number
     vote_count?: number
}

export interface commentType {
     [key: string]: null | string
}
export interface listMovieTypes {
     average_rating?: number
     backdrop_path?: string
     results?: resultsMovie[]
     comments?: commentType
     created_by?: object
     description?: string
     id?: number
     iso_3166_1?: string
     iso_639_1?: string
     item_count?: number
     name?: string
     object_ids?: object
     page?: number
     poster_path?: string
     public?: boolean
     revenue?: number
     runtime?: number
     sort_by?: string
     total_pages?: number
     total_results?: number
}
interface trailerMovieResults {
     iso_639_1: string
     iso_3166_1: string
     name: string
     key: string
     site: string
     size: number
     type: string
     official: boolean
     published_at: string
     id: string
}
export interface trailerMovieType {
     id?: number
     results?: trailerMovieResults[]
}
interface cast {
     adult?: boolean
     gender?: number
     id?: number
     known_for_department?: string
     name?: string
     original_name?: string
     popularity?: number
     profile_path?: string
     cast_id?: number
     character?: string
     credit_id?: string
     order?: number
}
export interface castMovieType {
     id?: number
     cast?: cast[]
}
export interface resultsFavoriteMovie {
     account_object_id?: string
     adult?: number
     average_rating?: number
     created_at?: string
     description?: string
     featured?: number
     id?: number
     iso_3166_1?: string
     iso_639_1?: string
     name: string
     number_of_items?: number
     public?: number
     revenue?: number
     runtime?: string
     sort_by?: number
     updated_at?: string
}
export interface favoriteMovieType {
     page?: number
     results: resultsFavoriteMovie[]
     total_pages?: number
     total_results?: number
}
export interface resultsAddItem {
     media_id: number
     media_type: string
     error: string[]
     success: boolean
}
export interface AddItems {
     success: boolean
     status_code: number
     status_message: string
     results: resultsAddItem[]
}
export interface AddList {
     status_message: string
     id: number
     success: boolean
     status_code: number
}
