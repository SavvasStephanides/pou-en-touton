import District from "./district"

export default class Village{
    id: number
    name: string
    population: number
    district: District | undefined
    photoFilename: string

    constructor(id: number, name: string, population: number, district: District | undefined, photoFilename: string){
        this.id = id
        this.name = name
        this.population = population
        this.district = district
        this.photoFilename = photoFilename
    }
}