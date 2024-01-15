import './App.css';
import GetHourElecPrice from './Components/GetElectricityPrice';
import Bar48hPRices from './Components/Charts/Chart_48h';
import Get48HourElecPrice from './Components/48hPrices';

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
      <div>
        <Bar48hPRices/>
      </div>
    </div>
  );
}

export default App;
