export interface Season {
    SeasonNo:number,
    SeasonObject?:SeasonList,
    Spinner:boolean
}

export interface SeasonList {
    Title?:string,
    Season?:string,
    totalSeasons?:string,
    Episodes?:Array<Episode>,
    Response:string,
    Error?:string
}

interface Episode {
    Title:string,
    Released:string,
    Episode:string,
    imdbRating:string,
    imdbID:string
}