import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import CurrenciesRates from './components/CurrenciesRates'


function App() {
  return (
    <>
      <Router>

        {/* ESTE ES EL COMPONENTE DE SIDEBAR */}

        <div style={{
          display: "flex"
          }}>
          <Sidebar />

          <Switch>

            <Route 
              exact
              path="/:currency"
              component={CurrenciesRates}
            />

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
