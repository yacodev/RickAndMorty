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
  const [result,setResult]=useState([]);

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      let resultCharCounter = { "exercise_name": "Char counter"};
      const firstProcessTime= getTimeProcess(startTime);
      const resultsByChar = [];
      resultsByChar.push({"char": "l", "count":countL, "resource": "location"});
      resultsByChar.push({"char": "e", "count":countE, "resource": "episodes"});
      resultsByChar.push({"char": "c", "count":countC, "resource": "character"});
      resultCharCounter["results"]= resultsByChar;
      resultCharCounter["time"]= `${firstProcessTime}ms`;
      resultCharCounter["in_time"] = firstProcessTime<3000;
      
      console.log("RESULT:",resultCharCounter);
      setFinishedFirstProcess(true);
    }
  },[loadCharacters, loadLocations, loadEpisodes])

  useEffect(()=>{
    if(finishedFirstProcess){
      setStartTime(Date.now());
      let resultEpisodeLocation = { "exercise_name": "Episode locations"};
      let episodesWithLocations = [];
      const allCharacters = JSON.parse(localStorage.getItem('Characters'));
      let characterIdWithOrigin = {};
      characterIdWithOrigin= getCharacterIdWithOrigin(allCharacters);
      const allEpisodes = JSON.parse(localStorage.getItem('Episodes'));
      
      episodesWithLocations = getEpisodesWithLocations(allEpisodes, characterIdWithOrigin);
      const secondProcessTime = getTimeProcess(startTime);
      resultEpisodeLocation["result"]= episodesWithLocations;
      resultEpisodeLocation["time"]= `${secondProcessTime}ms`;
      resultEpisodeLocation["in_time"] = secondProcessTime<3000;
      console.log("RESULT 2:",resultEpisodeLocation);
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
