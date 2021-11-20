import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { Episodes } from './components/Episodes';
import { Locations } from './components/Locations';
import getTimeProcess from './utils/getTimeProcess';
import imagenHeader from "./static/images/rick_and_morty.png"
import styled from '@emotion/styled';

const ContainerPage =styled.div`
  display:flex;
  flex-direction:column;
  background:#f7f6f3
`

const ContainerImage = styled.div`
  padding:auto;
  width:100%;
  img{
    display:flex;
    margin-left:auto;
    margin-right:auto;
  }
`

const ContainerResult = styled.div`
  display:flex;
  flex-direction:row;
  width:100%;
  gap:200px;
`


function App() {
  const [loadCharacters, setLoadCharacters] = useState(false);
  const [loadLocations, setLoadLocations] = useState(false);
  const [loadEpisodes, setLoadEpisodes] = useState(false);
  const [startTime,setStartTime]= useState(Date.now());
  const [countE, setCountE]=useState(0)
  const [countL, setCountL]=useState(0)
  const [countC, setCountC]=useState(0)
  const [finishedFirstProcess, setFinishedFirstProcess] = useState(false);
  const [finishedSecondProcess, setFinishedSecondProcess] = useState(false);
  const [result,setResult]=useState([]);
  const [secondResult,setSecondResult]=useState([]);

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      let resultCharCounter = { "exercise_name": "Char counter"};
      const firstProcessTime= getTimeProcess(startTime);
      const resultsByChar = [];
      resultsByChar.push({"char": "l", "count":countL, "resource": "location"});
      resultsByChar.push({"char": "e", "count":countE, "resource": "episodes"});
      resultsByChar.push({"char": "c", "count":countC, "resource": "character"});
      resultCharCounter["time"]= `${firstProcessTime}ms`;
      resultCharCounter["in_time"] = firstProcessTime<3000;
      resultCharCounter["results"]= resultsByChar;
      
      console.log("RESULT:",resultCharCounter);
      setResult([resultCharCounter]);
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
      resultEpisodeLocation["time"]= `${secondProcessTime}ms`;
      resultEpisodeLocation["in_time"] = secondProcessTime<3000;
      resultEpisodeLocation["result"]= episodesWithLocations;
      setSecondResult([resultEpisodeLocation]);
      setFinishedSecondProcess(true);
      console.log("RESULT 2:",resultEpisodeLocation);
      console.log("RESULT TOTAL:",result);
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
    <ContainerPage>
      <ContainerImage>
        <img src={imagenHeader} alt="imagen header" width="1000px"/>
      </ContainerImage>
      <Characters isLoad={setLoadCharacters} resultCount={setCountC}/>
      <Episodes isLoad={setLoadEpisodes} resultCount={setCountE}/>
      <Locations isLoad={setLoadLocations} resultCount={setCountL}/>
      <ContainerResult>
        <div>
          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
        <div>
          <pre>
            {JSON.stringify(secondResult, null, 2)}
          </pre>
        </div>
      </ContainerResult>
    </ContainerPage>
  );
}

export default App;
