import { useEffect } from "react"
import { URL_LOCATION } from "../constants"
import { getData } from "../services/data_fecth"

export const Locations = ()=>{
  useEffect(()=>{
    const getAllLocations = async()=>{
      let chunkLocations = await getData(URL_LOCATION);
      let allLocations = [...chunkLocations.results]
      while(chunkLocations.info.next){
        chunkLocations = await getData(chunkLocations.info.next);
        allLocations = [...allLocations, ...chunkLocations.results];
      }
      let nameAllLocations = [];
      allLocations.forEach((location)=>{
        nameAllLocations.push(location.name);
      })
      console.log("ALL LOCATIONS", nameAllLocations)
    }
    getAllLocations();
  },[])

  return(
    <>
      LOCATIONS
    </>
  )
}