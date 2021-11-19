import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { Episodes } from './components/Episodes';
import { Locations } from './components/Locations';

function App() {
  const [loadCharacters, setLoadCharacters] = useState(false);
  const [loadLocations, setLoadLocations] = useState(false);
  const [loadEpisodes, setLoadEpisodes] = useState(false);
  const [timeStart,setTimeStart]= useState(Date.now());
  const [duration, setDuration] = useState(0);
  const [countE, setCountE]=useState(0)
  const [countL, setCountL]=useState(0)
  const [countC, setCountC]=useState(0)

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      const timeFinish = Date.now();
      const time = timeFinish - timeStart;
      console.log("START:", timeStart);
      console.log("FINISH:", timeFinish);
      setDuration(time);
      console.log("TIME:", duration, time);
      console.log("RESULT:",countE,countC,countL);
    }
  },[loadCharacters, loadLocations, loadEpisodes])

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
