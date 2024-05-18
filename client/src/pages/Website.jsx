import React from 'react'
import Hero from "../component/hero/hero";
import Header from "../component/Header/Header";
import Companies from "../component/companies/Companies";
import Residencies from "../component/Residencies/Residencies";
import { sliderSettings } from "../utils/common";
import Value from "../component/Value/Value";
import Contact from "../component/Contact/Contact";
import GetStarted from "../component/GetStarted/GetStarted";
import Footer from "../component/Footer/Footer";

const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        
        <Hero />
      </div>
        
      <Companies/>
      <Residencies/>
      <Value/>
      <Contact/> 
      <GetStarted/>
     
    </div>
  )
}

export default Website