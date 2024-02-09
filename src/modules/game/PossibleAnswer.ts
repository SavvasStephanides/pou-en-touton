export default class PossibleAnswer {
    title: string
    status:string = "none"

    constructor(title:string, status?: string){
        this.title = title

        if(status !== undefined){
            this.status = status
        }
    }
}