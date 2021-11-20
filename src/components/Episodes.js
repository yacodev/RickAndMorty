import { useEffect, useState } from "react"
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
      localStorage.setItem("Episodes", JSON.stringify(allEpisodes));
      let nameAllEpisodes = [];
      
      allEpisodes.forEach((episode)=>{
        nameAllEpisodes.push(episode.name);
      })
      let countE = countLetters(nameAllEpisodes, "e");
      props.resultCount(countE);
      props.isLoad(true);
    }
    getAllEpisodes();
  },[])

  return(
    <>
    </>
  )
}