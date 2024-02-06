import './App.css';
import React, { useEffect } from 'react';
import {HashRouter,Route,Routes} from "react-router-dom";
import GetAllFromTable from './Components/Requests/AllFromTable';
import Layout from './Pages/Layout';
import AddPage from './Pages/Add';
import EditePage from './Pages/Edit';
import DeletePage from './Pages/Delete';
import SearchPage from './Pages/Search';

let tableid;
const fetchOtableid = async () =>{
  tableid = await GetAllFromTable();
}
fetchOtableid();

function App() {
  
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={ <Layout/> } >
        <Route path="/add"  element={ <AddPage/>} />
        <Route path="/edit"  element={ <EditePage/> } />
        <Route path="/delete" element={ <DeletePage/>} />
        <Route path="/search" element={ <SearchPage/> } />
      </Route>
      </Routes>
      
    </HashRouter>
   
  );
}

export default App;
