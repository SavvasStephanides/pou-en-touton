import GameQuestion from "./GameQuestion";

export default class Game{
    whereIsThisGame: GameQuestion
    whichDistrict: GameQuestion
    population: GameQuestion

    constructor(whereIsThisGame: GameQuestion, whichDistrict: GameQuestion, population: GameQuestion){
        this.whereIsThisGame = whereIsThisGame
        this.whichDistrict = whichDistrict
        this.population = population
    }
}