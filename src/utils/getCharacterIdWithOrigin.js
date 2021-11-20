export default function getCharacterIdWithOrigin(){
  const allCharacters = JSON.parse(localStorage.getItem('Characters'));
  let characterIdWithOrigin = {};

  allCharacters.forEach((character)=>{
    const characterId= character.id;
    let obj= {};
    obj[characterId]=character.origin.name;
    characterIdWithOrigin = {...characterIdWithOrigin,...obj};
  })

  return characterIdWithOrigin
}