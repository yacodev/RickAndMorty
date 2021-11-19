import { useEffect } from "react"
import { URL_EPISODE } from "../constants"
import { getData } from "../services/data_fecth"


export const Episodes = ()=>{
  useEffect(()=>{
    const getAllEpisodes = async()=>{
      let chunkEpisodes= await getData(URL_EPISODE);
      let allEpisodes = [...chunkEpisodes.results];
      while(chunkEpisodes.info.next){
        chunkEpisodes = await getData(chunkEpisodes.info.next);
        allEpisodes = [...allEpisodes,...chunkEpisodes.results];
      }
      let nameAllEpisodes = []
      allEpisodes.forEach((episode)=>{
        nameAllEpisodes.push(episode.name);
      })
      console.log("ALL EPISODES", nameAllEpisodes);
    }
    getAllEpisodes();
  },[])

  return(
    <>
      EPISODES
    </>
  )
}