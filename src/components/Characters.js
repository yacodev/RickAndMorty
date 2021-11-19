import { getData } from '../services/data_fecth';
import { URL_CHARACTER } from "../constants";
import { useEffect} from 'react';


export const Characters = ()=>{
  
  useEffect(()=>{
    const getAllCharacters = async()=>{
      let chunkCharacters = await getData(URL_CHARACTER);
      let allCharacters = [...chunkCharacters.results] 
      while(chunkCharacters.info.next){
        chunkCharacters = await getData(chunkCharacters.info.next);
        allCharacters = [...allCharacters,...chunkCharacters.results]
      }
      let nameAllCharacters = []
      allCharacters.forEach((character)=>{
        nameAllCharacters.push(character.name);
      })
      console.log("ALL NAMES",nameAllCharacters);
      const allLetters = nameAllCharacters.join();
      const countC = allLetters.split("c").length - 1;
      console.log("RESULT", countC);
    }
    getAllCharacters();
  },[])

  return(
    <>
      CHARACTERS
    </>
  )
}