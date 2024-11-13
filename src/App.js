import logo from './logo.svg';
import './App.css';

import Employee from '../src/Employee/Employee'
import ProgressBar from '../src/Employee/ProgressBar'
import { useState } from 'react';

function App() {
  let [orgName, setOrgName] = useState("GE Financials");


  const changeOrganization =()=>{
    setOrgName(" GE Construction")
  }
  return (
    <div className="App">
      {/* <Employee appname={orgName} changeOrganization={changeOrganization}/> */}
      <ProgressBar/>
    </div>
  );
}

export default App;
