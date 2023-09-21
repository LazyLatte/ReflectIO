import {FC, memo} from 'react';
import { Group, Image} from 'react-konva';
import useImage from 'use-image';
import { LevelInfo } from '@features/level';
import DownloadIcon from '@images/icons/download.svg';
interface DownloadButtonProps {
    levelInfo: LevelInfo;
}

const DownloadButton: FC<DownloadButtonProps> = memo(({levelInfo}) => {
  const [image] = useImage(DownloadIcon);
  const handleOnClick = () => {
    // create file in browser
    const fileName = "level-info";
    const json = JSON.stringify(levelInfo);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return (
    <Group
      onMouseEnter={e => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = "pointer");
      }}
      onMouseLeave={e => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = "default");
      }}
      onclick={handleOnClick}
    >
      <Image
        image={image}
        width={40} 
        height={40} 
      />
    </Group>
  )
})

export default DownloadButton;