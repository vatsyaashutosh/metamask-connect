import "./App.css";
import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import Home from "./components/Home";

function getLibrary(provider) {
  return new Web3(provider);
}
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Home />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
