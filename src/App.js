import './App.css';
import { Characters } from './components/Characters';
import { Episodes } from './components/Episodes';
import { Locations } from './components/Locations';

function App() {

  return (
    <div>
      Rick and morty App
      <Characters />
      <Episodes />
      <Locations />
    </div>
  );
}

export default App;
