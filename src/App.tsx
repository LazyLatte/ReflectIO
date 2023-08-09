import { useState} from "react";
import { Difficulty} from "@features/level";
import TopBar from '@features/layout';
import Home from "./pages/Home";
import More from './pages/More';
import Play from "./pages/Play";
import MyLevels from "./pages/MyLevels";
import GlobalLevels from "./pages/GlobalLevels";
import Search from "./pages/Search";
import LevelSelect from './pages/LevelSelect';
import Tutorial from "./pages/Tutorial";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import { BackButton } from "@features/ui/button";

import { Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence  } from "framer-motion"
import {Mode} from './features/stage';

import './style.css';
export default function App() {
  
  const location = useLocation();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  return (
    <div id="app">
      <TopBar/>
      <BackButton/>
  
      <div id='main'>
        <AnimatePresence initial={false}>
          <Routes key={location.key} location={location}>
            <Route path='/' element={<Home/>} />
            <Route path='more' element={<More/>}/>
            
            <Route path="about" element={<AboutUs/>} />
            <Route path="account" element={<Account/>} />

            <Route path="tutorial">
              <Route index={true} element={<Tutorial/>} />
              <Route path=":id" element={<Play mode={Mode.Tutorial} />}/>
            </Route>
            
            <Route path="explore" element={<GlobalLevels/>}/>
            <Route path="mylevels" element={<MyLevels/>}/>
            <Route path="custom" element={<Play mode={Mode.Custom} />} />
            <Route path="search" element={<Search/>}/>
          </Routes>
        </AnimatePresence>
        <Routes key={location.key} location={location}>
          <Route path="play">
            <Route index={true} element={<LevelSelect difficulty={difficulty} setDifficulty={setDifficulty}/>} />
            <Route path="level/:id" element={<Play mode={Mode.Public} />}/>
            <Route path=":difficulty/:id" element={<Play mode={Mode.BuiltIn}/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}




