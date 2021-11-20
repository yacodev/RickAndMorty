import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { Episodes } from './components/Episodes';
import { Locations } from './components/Locations';
import getTimeProcess from './utils/getTimeProcess';

function App() {
  const [loadCharacters, setLoadCharacters] = useState(false);
  const [loadLocations, setLoadLocations] = useState(false);
  const [loadEpisodes, setLoadEpisodes] = useState(false);
  const [startTime,setStartTime]= useState(Date.now());
  const [countE, setCountE]=useState(0)
  const [countL, setCountL]=useState(0)
  const [countC, setCountC]=useState(0)
  const [finishedFirstProcess, setFinishedFirstProcess] = useState(false);

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      const firstProcessTime= getTimeProcess(startTime);
      console.log("TIME PROCESS1:", firstProcessTime);
      console.log("RESULT:",countE,countC,countL);
      setFinishedFirstProcess(true);
    }
  },[loadCharacters, loadLocations, loadEpisodes])

  useEffect(()=>{
    if(finishedFirstProcess){
      setStartTime(Date.now());
      let resultEpisodesLocations = [];
      const allCharacters = JSON.parse(localStorage.getItem('Characters'));
      let characterIdWithOrigin = {};
      characterIdWithOrigin= getCharacterIdWithOrigin(allCharacters);
      const allEpisodes = JSON.parse(localStorage.getItem('Episodes'));
      
      resultEpisodesLocations = getEpisodesWithLocations(allEpisodes, characterIdWithOrigin);
      console.log("result final", resultEpisodesLocations);
      const secondProcessTime = getTimeProcess(startTime);
      console.log("TIME PROCESS2:", secondProcessTime);
    }

  },[finishedFirstProcess])

  function getCharacterIdWithOrigin(allCharacters){
    let characterIdWithOrigin = {};

    allCharacters.forEach((character)=>{
      const characterId= character.id;
      let obj= {};
      obj[characterId]=character.origin.name;
      characterIdWithOrigin = {...characterIdWithOrigin,...obj};
    })
    return characterIdWithOrigin
  }

  function getEpisodesWithLocations(allEpisodes, characterIdWithOrigin){
    let resultEpisodesLocations = [];
    allEpisodes.forEach((episode)=>{
      let episodesByLocations = {};
      episodesByLocations["name"]= episode.name;
      episodesByLocations["episode"]=episode.episode;
      episodesByLocations["locations"]=[];
      let arrayLocationsOrigin = [];

      episode.characters.forEach((character)=>{
        let characterIdFound = character.match(/\d+/);
        let locationOrigin = characterIdWithOrigin[characterIdFound[0]];
        arrayLocationsOrigin.push(locationOrigin);
      })

      episodesByLocations["locations"] = [... new Set(arrayLocationsOrigin)]
      resultEpisodesLocations.push(episodesByLocations);
    })
    return resultEpisodesLocations
  }

  return (
    <div>
      Rick and morty App
      <Characters isLoad={setLoadCharacters} resultCount={setCountC}/>
      <Episodes isLoad={setLoadEpisodes} resultCount={setCountE}/>
      <Locations isLoad={setLoadLocations} resultCount={setCountL}/>
    </div>
  );
}

export default App;
