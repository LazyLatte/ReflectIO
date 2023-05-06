import { useRef, useEffect, useState} from "react";
import {useLevel} from "./hooks/useLevel";
import TopBar from './components/TopBar';
import BackButton from './components/BackButton';


import Layout from './pages/Layout';
import Home from "./pages/Home";
import MoreLevels from './pages/MoreLevels';
import CustomStage from "./pages/CustomStage";
import DefaultStage from './pages/DefaultStage';
import PublicStage from './pages/PublicStage';
import MyLevels from "./pages/MyLevels";
import GlobalLevels from "./pages/GlobalLevels";
import Search from "./pages/Search";
import LevelSelect from './pages/LevelSelect';
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";



import { Route, Routes, useLocation} from "react-router-dom";
import {AllLevels} from './gameHelpers';
import {BuiltInLevels} from './Interfaces';
import { AnimatePresence  } from "framer-motion"
import useAxiosPrivate from './hooks/useAxiosPrivate';
import useStageConfig from './hooks/useStageConfig';
import useModalRef from './hooks/useModalRef';
import useRefreshToken from './hooks/useRefreshToken';
import './style.css';



export default function App() {
  const {shouldRearrange} = useStageConfig();
  const [difficulty, setDifficulty] = useState<string>('easy');
  const location = useLocation();

  const builtInLevels: BuiltInLevels = {
    'easy': AllLevels['easy'].map(level => useLevel(level, shouldRearrange, false)),
    'normal': AllLevels['normal'].map(level => useLevel(level, shouldRearrange, false)),
    'hard': AllLevels['hard'].map(level => useLevel(level,shouldRearrange, false))
  }


  const {loginRef, warningModalRef, uploadConfirmModalRef, shouldSignInModalRef, levelClearModalRef, publicLevelClearModalRef} = useModalRef();
  const refresh = useRefreshToken();
  useEffect(()=>{
    const initRequest = async () => {
      try{
        const accessToken = await refresh();
      }catch(err){
        //publicLevelClearModalRef.current.open(()=>{}, 'Personal best : 5 >> 4', 3);
        loginRef.current.open();
      }
    }
    initRequest();
   
  }, [])
  const axiosPrivate = useAxiosPrivate();
  return (
    <div id="app">
      <TopBar levels={builtInLevels}/>
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
                <Route index={true}  element={<LevelSelect difficulty={difficulty} setDifficulty={setDifficulty} levels={builtInLevels}/>} />
                <Route path="level/:id" element={<PublicStage axiosPrivate={axiosPrivate}/>}/>
                <Route path=":difficulty/:id" element={<DefaultStage levels={builtInLevels}/>}/>
              </Route>

              <Route path="explore" element={<GlobalLevels/>}/>
              <Route path="mylevels" element={<MyLevels/>}/>
              <Route path="custom" element={<CustomStage axiosPrivate={axiosPrivate}/>} />
              <Route path="search" element={<Search/>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}




