import {useState, useEffect, useRef, FC} from 'react';

import ClipLoader from "react-spinners/ClipLoader";
// interface StageThumbnailProps {
//   height: number; 
//   width: number;
//   lasers: Laser[];
//   targets: Target[];
// }
const thumbnailSize = 200;
export const StageThumbnail = () => {
  return (
    <div 
      className='stageThumbnail'
      style={{
        height: '100%',
        width: '100%',
        justifyContent: "center",
        border: 'solid #FDF5E6 2px',
        backgroundColor: '#141b2d'
      }}
      onContextMenu={e => e.preventDefault()}
    >
      <ClipLoader
        color={'green'}
        loading={true}
        size={thumbnailSize}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}


/*


*/

/*
        <img 
          src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-overall.png'}
          style={{
            width: '100%',
            height: '100%'
          }}
        />



*/