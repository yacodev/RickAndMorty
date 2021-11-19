import { getData } from '../services/data_fecth';
import { URL_CHARACTER } from "../constants";
import { useEffect} from 'react';
import countLetters from '../utils/countLetters';


export const Characters = (props)=>{
  
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
      let countC = countLetters(nameAllCharacters,'c')
      props.resultCount(countC);
      props.isLoad(true);
    }
    getAllCharacters();
  },[])

  return(
    <>
      CHARACTERS
    </>
  )
}