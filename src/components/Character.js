import { getData } from '../services/data_fecth';
import { URL_CHARACTER } from "../constants";

export const Character = ()=>{
  async function getDataCharacter(){
    let dataCharacters = await getData(URL_CHARACTER);
    console.log(dataCharacters);
  }

  return(
    <>
      CHARACTERS
      <button onClick={getDataCharacter}>character</button>
    </>
  )
}