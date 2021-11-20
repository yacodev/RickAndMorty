import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { Episodes } from './components/Episodes';
import { Locations } from './components/Locations';
import { formatResult } from './utils/formatResult';
import getTimeProcess from './utils/getTimeProcess';
import imagenHeader from "./static/images/rick_and_morty_header.png"
import styled from '@emotion/styled';
import getCharacterIdWithOrigin from './utils/getCharacterIdWithOrigin';
import getEpisodesWithLocations from './utils/getEpisodesWithLocations';

const ContainerPage =styled.div`
  display:flex;
  flex-direction:column;
`

const ContainerImageHeader = styled.div`
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
  gap:80px;
`

const ContainerImagen = styled.div`
  margin-top:200px;
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
    if(finishedSecondProcess){
      localStorage.removeItem("Characters");
      localStorage.removeItem("Episodes");
      localStorage.removeItem("Locations");
      setStartTime(0);
      setCountC(0);
      setCountL(0);
      setCountE(0);
    }
  },[finishedSecondProcess])

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      const firstProcessTime= getTimeProcess(startTime);
      
      const resultsByChar = [];
      resultsByChar.push({"char": "l", "count":countL, "resource": "location"});
      resultsByChar.push({"char": "e", "count":countE, "resource": "episodes"});
      resultsByChar.push({"char": "c", "count":countC, "resource": "character"});
      let resultCharCounter = formatResult("Char counter", firstProcessTime, resultsByChar)
      
      setResult([resultCharCounter]);
      setFinishedFirstProcess(true);
    }
  },[loadCharacters, loadLocations, loadEpisodes])

  useEffect(()=>{
    if(finishedFirstProcess){
      setStartTime(Date.now());
      let episodesWithLocations = [];
      
      let characterIdWithOrigin = {};
      characterIdWithOrigin= getCharacterIdWithOrigin();
      
      const allEpisodes = JSON.parse(localStorage.getItem('Episodes'));
      episodesWithLocations = getEpisodesWithLocations(allEpisodes, characterIdWithOrigin);
      const secondProcessTime = getTimeProcess(startTime);
      
      let resultEpisodeLocation = formatResult("Episode locations", secondProcessTime, episodesWithLocations);
      setSecondResult([resultEpisodeLocation]);
      setFinishedSecondProcess(true);
    }
    
  },[finishedFirstProcess])

  return (
    <ContainerPage>
      <ContainerImageHeader>
        <img src={imagenHeader} alt="imagen header" width="1000px"/>
      </ContainerImageHeader>
      <Characters 
        isLoad={setLoadCharacters}
        resultCount={setCountC}
      />
      <Episodes 
        isLoad={setLoadEpisodes}
        resultCount={setCountE}
      />
      <Locations
        isLoad={setLoadLocations}
        resultCount={setCountL}
      />
      <ContainerResult>
        <ContainerImagen>
          <img 
            src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-mind-bending-season-mysteries-quidd-6.png" 
            width="300" 
            alt="rick and morty mind bending season mysteries quidd" 
          />
        </ContainerImagen>
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
