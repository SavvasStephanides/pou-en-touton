import districts from "../data/districts.json"
import District from "./district"

export default class DistrictService{
    getDistrictById(districtId: string): District|undefined{
        let jsonDistrict = districts.find((district) => district.id === districtId)
        
        if(jsonDistrict !== undefined){
            return new District(jsonDistrict.id, jsonDistrict.name, jsonDistrict.photoFilename)
        }
    }
}