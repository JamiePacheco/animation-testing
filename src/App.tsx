import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ParallaxSection from './components/ParallaxSection';
import { CityMappings } from './assets/CityImageMappings';
import MultiLayerParallax, { Layer } from './components/MultiLayerParallax';

import roadImage from './assets/road/road-asset-dark.png'
import nightRoadImage from './assets/road/road-asset-night.png'

function App() {

  const [currentScene, ChangeCurrentScene] = useState<number>(0);
  const [sceneSpeed, changeSceneSpeed] = useState<number>(25);

  const changeScene = () => {
    ChangeCurrentScene(prev => (prev + 1) % CityMappings.length)
  } 

  const layers : Layer[] = Object.entries(CityMappings[currentScene]).map(([_, value], idx) => {
              return {image : value, zIndex : idx, speed : sceneSpeed - (5 * idx)}  
            }) 

  return (
    <div className="App">
      <div>
        <button onClick ={() => {
          changeSceneSpeed(prev => {
            return prev + 1;
          })
        }}> Slow Down  </button>
        
        <button onClick = {() => {changeScene()}} > Change Scene </button>
        
        <button onClick ={() => {
          changeSceneSpeed(prev => {
            if (prev === 20) {
              return prev;
            }
            return prev - 1;
          })
        }}> Speed Up </button>
        
        {/* <ParallaxSection 
          speed={20} 
          image = {CityOneImageMappings["One"]} 
        /> */}

        {/* <span> Current Speed {sceneSpeed}</span> */}

        <ParallaxSection image={nightRoadImage} zIndex={100}/>

        <MultiLayerParallax
          layers={layers}
        />


        

      </div>
    </div>
  );
}

export default App;
