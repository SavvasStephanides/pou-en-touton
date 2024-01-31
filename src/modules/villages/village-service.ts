import villages from "../data/villages.json"
import DistrictService from "./district-service"
import Village from "./village"

export default class VillageService {
    districtService = new DistrictService()

    getVillageById(villageId: number): Village{
        return this.jsonToVillage(villages.find((village) => village.id === villageId))
    }

    getVillagesByDistrict(district: string): Village[]{
        return villages.filter((village) => village.district === district).map((village) => this.jsonToVillage(village))
    }

    private jsonToVillage(jsonObject: any){
        return new Village(jsonObject.id, jsonObject.name, jsonObject.population, this.districtService.getDistrictById(jsonObject.district), jsonObject.photoFilename)
    }
}