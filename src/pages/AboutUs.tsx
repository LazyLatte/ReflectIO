import {FC} from 'react';
interface AboutUsProps {};
const AboutUs: FC<AboutUsProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '5rem'
      }}
    >
      Contribution: Kuan-Fu Chen
    </div>
  );
}

export default AboutUs;