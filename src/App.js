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

  useEffect(()=>{
    if(loadCharacters && loadLocations && loadEpisodes){
      const timeFinish = Date.now();
      const time = timeFinish - timeStart;
      console.log("START:", timeStart);
      console.log("FINISH:", timeFinish);
      setDuration(time);
      console.log("RESULT:", duration, time);
    }
  },[loadCharacters, loadLocations, loadEpisodes])

  return (
    <div>
      Rick and morty App
      <Characters isLoad={setLoadCharacters} />
      <Episodes isLoad={setLoadEpisodes} />
      <Locations isLoad={setLoadLocations} />
    </div>
  );
}

export default App;
