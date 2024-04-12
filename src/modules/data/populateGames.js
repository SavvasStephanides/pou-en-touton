const fs = require('fs')

const currentGame = require("./game.json")
const villages = require("./villages.json")
const districts = require("./districts.json")

let gameId = ++currentGame.game.id

let ranges = {
    "BIG": (v) => {
        return v.population >= 2000
    },
    "MEDIUM": (v) => {
        return v.population >= 1000 && v.population < 2000
    },
    "SMALL": (v) => {
        return v.population >= 500 && v.population < 1000
    },
    "TINY": (v) => {
        return v.population < 500
    }
}

const getRandomVillage = (props) => {

    let filteredVillages = [...villages]

    if(props){
        if(props.onlyWithPhotos){
            console.log("Only with photos")
            filteredVillages = filteredVillages
                .filter(v => v.photoFilename !== undefined)
        }
        
        if(props.villageNameToExclude){
            filteredVillages = filteredVillages
                .filter(v => v.name !== props.villageNameToExclude)
        }
    }
        
    return filteredVillages[Math.floor(Math.random() * filteredVillages.length)]
}

const getRandomVillageByDistrict = (districtId) => {
    let districtVillages = villages.filter(v => v.district === districtId)
    return districtVillages[Math.floor(Math.random() * districtVillages.length)]
}

function getGameFromVillage(village) {
    console.log(village);

    const game = {
        game: {
            id: gameId,
            currentLevel: 0,
            gameQuestions: [
                {
                    question: "Πού εν τούτον;",
                    iconEmoji: "📍"
                },
                {
                    question: `Σε πια επαρχία βρίσκεται το χωριό ${village.name};`,
                    iconEmoji: "🌆"
                },
                {
                    question: `Πόσος είναι ο πληθυσμός του χωριού ${village.name};`,
                    iconEmoji: "👨‍👩‍👦"
                },
                {
                    question: `Ποιό απο τα χωριά βρίσκονται στην επαρχία ${districts.find(d => d.id === village.district).name};`,
                    iconEmoji: "🏙️"
                }
            ]
        }
    }

    // 'Πού εν τούτον;'
    game.game.gameQuestions[0].possibleAnswers = Array(4)

    for (let i = 0; i <= 2; i++) {
        game.game.gameQuestions[0].possibleAnswers[i] = getRandomVillage({villageNameToExclude: village.name}).name
    }
    game.game.gameQuestions[0].possibleAnswers[3] = village.name
    game.game.gameQuestions[0].possibleAnswers.sort((a, b) => 0.5 - Math.random())
    game.game.gameQuestions[0].correctAnswer = game.game.gameQuestions[0].possibleAnswers.indexOf(village.name)
    game.game.gameQuestions[0].possibleAnswers = game.game.gameQuestions[0].possibleAnswers.map((answer) => ({ title: answer, status: "none" }))
    game.game.gameQuestions[0].placePhoto = village.photoFilename ? village.photoFilename : ""

    // Σε πια επαρχία βρίσκεται

    game.game.gameQuestions[1].possibleAnswers = districts.map((district) => district.id)
    game.game.gameQuestions[1].correctAnswer = game.game.gameQuestions[1].possibleAnswers.indexOf(village.district)
    game.game.gameQuestions[1].possibleAnswers = game.game.gameQuestions[1].possibleAnswers.map((district) => ({ title: districts.find(d => d.id === district).name, status: "none" }))
    game.game.gameQuestions[1].placePhoto = village.photoFilename ? village.photoFilename : ""

    // Πόσος είναι ο πληθυσμός

    game.game.gameQuestions[2].possibleAnswers = [
        {
            "status": "none",
            "title": "<1000"
        },
        {
            "status": "none",
            "title": "1000-5000"
        },
        {
            "status": "none",
            "title": "5000-10000"
        },
        {
            "status": "none",
            "title": ">10000"
        }
    ]

    if (village.population < 1000) game.game.gameQuestions[2].correctAnswer = 0
    if (village.population >= 1000 && village.population < 5000) game.game.gameQuestions[2].correctAnswer = 1
    if (village.population >= 5000 && village.population < 10000) game.game.gameQuestions[2].correctAnswer = 2
    if (village.population >= 10000) game.game.gameQuestions[2].correctAnswer = 3

    game.game.gameQuestions[2].placePhoto = village.photoFilename ? village.photoFilename : ""

    // Ποιό απο τα χωριά βρίσκονται στην επαρχία

    let district = districts.find(district => district.id === village.district)

    game.game.gameQuestions[3].placePhoto = `districts/${district.photoFilename}`
    game.game.gameQuestions[3].possibleAnswers = Array(4)
    let correctIndex = Math.floor(Math.random() * 4)
    game.game.gameQuestions[3].correctAnswer = correctIndex
    game.game.gameQuestions[3].possibleAnswers[correctIndex] = {
        title: getRandomVillageByDistrict(village.district).name,
        status: "none"
    }
    
    for(let i = 0 ; i < 4 ; i++){
        if(game.game.gameQuestions[3].possibleAnswers[i] === undefined){
            let districtsWithVillageDistrictFilteredOut = districts.filter(district => district.id !== village.district)
            let district = districtsWithVillageDistrictFilteredOut[Math.floor(Math.random() * districtsWithVillageDistrictFilteredOut.length)]
            game.game.gameQuestions[3].possibleAnswers[i] = {
                title: getRandomVillageByDistrict(district.id).name,
                status: "none"
            }
        }
    }

    return game
}

const weeklyRanges = ["MEDIUM", "BIG", "TINY", "SMALL", "TINY", "MEDIUM", "BIG"]

let village = getRandomVillage({onlyWithPhotos: true})
let game = getGameFromVillage(village)
fs.writeFileSync("game.json", JSON.stringify(game))