import React from 'react';
import logo from './logo.svg';
import './App.css';
import CovidSidebar from './components/sidebar/Sidebar';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <Provider store={store}>
          <Router>
              <div className="App">
                  <CovidSidebar/>
              </div>
          </Router>
      </Provider>
   );
}

export default App;
