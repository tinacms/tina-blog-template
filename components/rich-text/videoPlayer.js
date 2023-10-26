import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export const VideoPlayer = (props) => {
  return <ReactPlayer width="100%" controls={true} url={props.url} />;
};
