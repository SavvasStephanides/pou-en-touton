const axios = require('axios')
const fs = require('fs')
const villages = require("./src/modules/data/villages.json")

function addPhoto(){
    const arguments = getArguments()
    const localFilename = `v-${arguments.villageId}.jpg`

    const outputPath = `./public/place-photos/${localFilename}`
    downloadImage(arguments.imageUrl, outputPath)

    updateVillagesDataFile(arguments.villageId, localFilename)
}

function getArguments(){
    return {
        villageId: process.argv[2],
        imageUrl: process.argv[3]
    }
}

function downloadImage(imageUrl, outputPath){
    axios({
        method: 'get',
        url: imageUrl,
        responseType: 'stream'
      })
      .then(function(response) {
        response.data.pipe(fs.createWriteStream(outputPath))
      })
      .catch(function(error) {
        console.error('Error downloading image:', error);
      })
}

function updateVillagesDataFile(villageId, photoFileName){
    villages.find((village) => village.id == villageId).photoFilename = photoFileName
    fs.writeFileSync("./src/modules/data/villages.json", JSON.stringify(villages, null, 2))
}

addPhoto()