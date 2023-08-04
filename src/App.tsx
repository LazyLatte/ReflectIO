import { useRef, useEffect, useState} from "react";
import { Difficulty} from "@features/level";
import TopBar from '@features/layout';
import { BackButton } from "@features/ui";


import Layout from './pages/Layout';
import Home from "./pages/Home";
import MoreLevels from './pages/MoreLevels';
import Play from "./pages/Play";
import MyLevels from "./pages/MyLevels";
import GlobalLevels from "./pages/GlobalLevels";
import Search from "./pages/Search";
import LevelSelect from './pages/LevelSelect';
import Tutorial from "./pages/Tutorial";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";


import { Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence  } from "framer-motion"
import {Mode} from './features/stage';

import './style.css';

import { StageSizeModal, StageSizeModalHandle } from "@features/level";

export default function App() {
  
  const location = useLocation();
  //console.log(location.pathname.split('/'))
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const modalRef = useRef<StageSizeModalHandle>(null);
  useEffect(()=>{
    //modalRef.current?.open();
  }, []);
  return (
    <div id="app">
      <TopBar/>
      <BackButton/>
      <StageSizeModal ref={modalRef}/>
      <div id='main'>
        <AnimatePresence initial={false}>
          <Routes key={location.pathname.split('/')[1]} location={location}>
            <Route path='/' element={<Layout/>}>
              <Route path='/' element={<Home/>} />
              <Route path='more' element={<MoreLevels/>}/>
              
              <Route path="about" element={<AboutUs/>} />
              <Route path="account" element={<Account/>} />
              <Route path="play">
                <Route index={true}  element={<LevelSelect difficulty={difficulty} setDifficulty={setDifficulty}/>} />
                <Route path="level/:id" element={<Play mode={Mode.Public} />}/>
                <Route path=":difficulty/:id" element={<Play mode={Mode.BuiltIn}/>}/>
              </Route>
              <Route path="tutorial">
                <Route index={true} element={<Tutorial/>} />
                <Route path=":id" element={<Play mode={Mode.Tutorial} />}/>
              </Route>
              <Route path="explore" element={<GlobalLevels/>}/>
              <Route path="mylevels" element={<MyLevels/>}/>
              <Route path="custom" element={<Play mode={Mode.Custom} />} />
              <Route path="search" element={<Search/>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}




