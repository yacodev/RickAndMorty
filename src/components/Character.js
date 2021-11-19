import { getData } from '../services/data_fecth';
import { URL_CHARACTER } from "../constants";
import { useEffect} from 'react';


export const Character = ()=>{
  
  useEffect(()=>{
    const getAllData = async()=>{
      let dataCharacters = await getData(URL_CHARACTER);
      let allCharacters = [...dataCharacters.results] 
      while(dataCharacters.info.next){
        dataCharacters = await getData(dataCharacters.info.next);
        allCharacters = [...allCharacters,...dataCharacters.results]
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
    getAllData();
  },[])

  return(
    <>
      CHARACTERS
    </>
  )
}