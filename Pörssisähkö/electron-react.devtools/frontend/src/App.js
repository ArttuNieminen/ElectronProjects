import './App.css';
import Bar48hPrices from './Components/Charts/Chart_48h';
import React, { useEffect } from 'react';
import getHour from './Components/GetElectricityPrice';


let oneHour;
const fetchOneHour = async () =>{
  oneHour = await getHour();
}
fetchOneHour();

function App() {
  useEffect(() => {
    // Calculate the initial delay to the next hour in Finland's time (EET)
    const now = new Date();
    const currentHour = now.getUTCHours();
    const minutesToNextHour = 60 - now.getUTCMinutes();
    const delayToNextHour = minutesToNextHour * 60 * 1000;

    const refreshOnHourChange = () => {
      const currentHour = new Date().getUTCHours();

      // Replace with the logic you need to determine when the hour changes
      // Here, we refresh the page when the hour changes
      if (currentHour !== localStorage.getItem('lastHour')) {
        localStorage.setItem('lastHour', currentHour);
        window.location.reload(true); // Reload the window
      }
    };

    // Check for hour changes every hour
    const intervalId = setInterval(refreshOnHourChange, 60 * 60 * 1000);

    // Initial delay to align with the next hour in Finland's time
    setTimeout(() => {
      refreshOnHourChange();
      // Start the interval after the initial delay
      setInterval(refreshOnHourChange, 60 * 60 * 1000);
    }, delayToNextHour);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);
  return (
    <div className="App">
      <header >
       Pörssisähkö projekti.
      </header>
      
      <div>
        <h1>Pörssisähkö tunnettain</h1>
        {oneHour}
      </div>
      <div>
        <Bar48hPrices/>
      </div>
    </div>
  );
}

export default App;
