import { LevelInfo } from "..";
//------------------------

// easy levels
import e1 from 'src/data/levels/easy/1.json';
import e2 from 'src/data/levels/easy/2.json';
import e3 from 'src/data/levels/easy/3.json';
import e4 from 'src/data/levels/easy/4.json';
import e5 from 'src/data/levels/easy/5.json';
import e6 from 'src/data/levels/easy/6.json';
import e7 from 'src/data/levels/easy/7.json';
import e8 from 'src/data/levels/easy/8.json';
import e9 from 'src/data/levels/easy/9.json';
import e10 from 'src/data/levels/easy/10.json';
// import e11 from 'src/data/levels/easy/11.json';
// normal levels
import n1 from 'src/data/levels/normal/1.json';
import n2 from 'src/data/levels/normal/2.json';
import n3 from 'src/data/levels/normal/3.json';
import n4 from 'src/data/levels/normal/4.json';
import n5 from 'src/data/levels/normal/5.json';
import n6 from 'src/data/levels/normal/6.json';
import n7 from 'src/data/levels/normal/7.json';
import n8 from 'src/data/levels/normal/8.json';
import n9 from 'src/data/levels/normal/9.json';
import n10 from 'src/data/levels/normal/10.json';
// hard levels
import h1 from 'src/data/levels/hard/1.json';
import h2 from 'src/data/levels/hard/2.json';
import h3 from 'src/data/levels/hard/3.json';
import h4 from 'src/data/levels/hard/4.json';
import h5 from 'src/data/levels/hard/5.json';


//------------------------
const easyLevels: LevelInfo[] = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10];
const normalLevels: LevelInfo[] = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10];
const hardLevels: LevelInfo[] = [h1, h2, h3, h4, h5];

const builtInLevelInfo = {
  easy: easyLevels,
  normal: normalLevels,
  hard: hardLevels
}

export default builtInLevelInfo;