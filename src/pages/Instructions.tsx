import './Instructions.css';

const Instructions = () => {
  return (
    <div id="instructions">
      <div id='summary'>
        <h1>How To Play</h1>
        <img 
          src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-overall.png'}
          style={{
            
            width: '50%',
            aspectRatio: '1/1'
          }}
        />
        <p>Use mirrors to bend the light and activate all gears</p>
      </div>
      <div className='separated-line'/>
      <div id='introduction'>
        <h1>Introduction</h1>
        <div className='object laser'>
          <div style={{alignSelf: 'flex-start'}}><span>Laser : </span>Emits monochromatic light with a certain direction</div>
          <img 
            src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-laser.png'}
            style={{
              height: 421*0.5,
              width: 1120*0.5
            }}
          />
        </div>

        <div className='object target'>
          <div style={{alignSelf: 'flex-start'}}><span>Gear : </span>use same color light to activate them</div>
          <img 
            src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-target.png'}
            style={{
              height: 565*0.5,
              width: 1258*0.5
            }}
          />
        </div>

        <div className='object mirror'>
          <div style={{alignSelf: 'flex-start'}}><span>Mirror</span></div>
          <div className='reflector'>
            <div style={{alignSelf: 'flex-start'}}><span>Reflector : </span>only reflects light</div>
            <img 
              src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-reflector.png'}
              style={{
                height: 560*0.5,
                width: 1261*0.5
              }}
            />
          </div>

          <div className='lens'>
            <div style={{alignSelf: 'flex-start'}}><span>Lens : </span>reflects and transmits light </div>
            <img 
              src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-lens.png'}
              style={{
                height: 556*0.5,
                width: 1260*0.5
              }}
            />
          </div>
        </div>

      </div>
      <div className='separated-line'/>
      <div id='rule'>
        <h1>Color Mixing</h1>
        <div style={{width: '80%'}}
          ><p>If a certain position has multiple light pass by, the final color will be decided by the color mixing rule of the <a href='https://en.wikipedia.org/wiki/RGB_color_model' target="_blank">RGB color model</a></p>
        </div>
        <div className='img-wrap'>
          <img 
            src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-yellow.png'}
            style={{
              height: 843*0.3,
              width: 985*0.3
            }}
          />
          <img 
            src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/img/examples/example-white.png'}
            style={{
              height: 843*0.3,
              width: 981*0.3
            }}
          />
        </div>
      </div>
    </div>

  );
}

export default Instructions;