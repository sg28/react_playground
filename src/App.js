import logo from './logo.svg';
import './App.css';

import Employee from '../src/Employee/Employee'

function App() {
  let AppName = "GE Financials";
  
  return (
    <div className="App">
      <Employee appname={AppName}/>
    </div>
  );
}

export default App;
