import { useRef, useEffect, useState} from "react";
import { Difficulty, BuiltInLevelClearRecordsInterface, getClearRecords } from "@features/level";
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
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";



import { Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence  } from "framer-motion"
import {Mode} from './features/stage';
import useModalRef from './features/modal/useModalRef';
import useRefreshToken from './hooks/useRefreshToken';
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import './style.css';



export default function App() {
  
  const location = useLocation();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [builtInLevelClearRecords, setBuiltInLevelClearRecords] = useState<BuiltInLevelClearRecordsInterface>({
    easy: 0,
    normal: 0,
    hard: 0
  })



  const {loginRef, warningModalRef, uploadConfirmModalRef, shouldSignInModalRef, levelClearModalRef, publicLevelClearModalRef} = useModalRef();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
    const initRequest = async () => {
      try{
        const accessToken = await refresh();
        const data = await getClearRecords(axiosPrivate);
        setBuiltInLevelClearRecords(data);
      }catch(err){
        //publicLevelClearModalRef.current.open(()=>{}, 'Personal best : 5 >> 4', 3);
        loginRef.current.open();
      }
    }
    initRequest();
   
  }, [])
  return (
    <div id="app">
      <TopBar/>
      <BackButton/>
      
      <div id='main'>
        <AnimatePresence initial={false}>
          <Routes key={location.pathname} location={location}>
            <Route path='/' element={<Layout/>}>
              <Route path='/' element={<Home/>} />
              <Route path='more' element={<MoreLevels/>}/>
              <Route path="instructions" element={<Instructions/>} />
              <Route path="about" element={<AboutUs/>} />
              <Route path="play">
                <Route index={true}  element={<LevelSelect difficulty={difficulty} setDifficulty={setDifficulty} clearRecords={builtInLevelClearRecords}/>} />
                <Route path="level/:id" element={<Play mode={Mode.Public} />}/>
                <Route path=":difficulty/:id" element={<Play mode={Mode.BuiltIn}/>}/>
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




