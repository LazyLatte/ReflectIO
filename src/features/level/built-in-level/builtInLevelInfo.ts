import { LevelInfo } from "..";
import { Difficulty } from ".";
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
import e11 from 'src/data/levels/easy/11.json';
import e12 from 'src/data/levels/easy/12.json';
import e13 from 'src/data/levels/easy/13.json';
import e14 from 'src/data/levels/easy/14.json';
import e15 from 'src/data/levels/easy/15.json';
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
// const castingType = (level: typeof e1) => ({
//   ...level,
//   lasers: level.lasers.map(l => ({...l, color: l.color as Color})),
//   targets: level.targets.map(t => ({...t, color: t.color as Color})),
//   reflectors: level.reflectors.map(r => r as Color),
//   lens: level.lens.map(l => l as Color)
// })
const levelNum = 15;
const easyLevels: LevelInfo[] = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15] as LevelInfo[];
const normalLevels: LevelInfo[] = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10] as LevelInfo[];
const hardLevels: LevelInfo[] = [h1, h2, h3, h4, h5] as LevelInfo[];

const builtInLevelInfo = {
  easy: easyLevels,
  normal: normalLevels,
  hard: hardLevels
}
const shifts = {
  easy: 0,
  normal: easyLevels.length,
  hard: easyLevels.length + normalLevels.length
}
const masks = (1 << levelNum) - 1;

export const getClears = (difficulty: Difficulty) => ((Number(localStorage.getItem('reflectio')) || 0) >> shifts[difficulty]) & masks;
export const updateClears = (difficulty: Difficulty, idx: number) => {
  const prevClears: number = Number(localStorage.getItem('reflectio')) || 0;
  const updatedClears: number = prevClears | (1 << (shifts[difficulty] + idx));
  localStorage.setItem('reflectio', updatedClears.toString());
}
export default builtInLevelInfo;