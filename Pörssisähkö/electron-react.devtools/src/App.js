import './App.css';
import GetHourElecPrice from './Components/GetElectricityPrice';


function App() {
  return (
    <div className="App">
      <header >
       Pörssisähkö projekti.
      </header>
      
      <div>
        <h1>Pörssisähkö tunnettain</h1>
        <GetHourElecPrice/>
      </div>
    </div>
  );
}

export default App;
