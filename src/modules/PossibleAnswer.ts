export default class PossibleAnswer {
    id: number
    title: string
    status:string = "none"

    constructor(id:number, title:string){
        this.id = id
        this.title = title
    }
}