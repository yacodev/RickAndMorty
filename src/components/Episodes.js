import { useEffect } from "react"
import { URL_EPISODE } from "../constants"
import { getData } from "../services/data_fecth"
import countLetters from "../utils/countLetters"


export const Episodes = (props)=>{
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
      let countE = countLetters(nameAllEpisodes, "e");
      console.log("RESULT E", countE);
      props.resultCount(countE);
      props.isLoad(true);
    }
    getAllEpisodes();
  },[])

  return(
    <>
      EPISODES
    </>
  )
}