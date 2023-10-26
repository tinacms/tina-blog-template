// import ReactPlayer from "react-player/lazy";
// Can't import ReactPlayer due to this bug https://github.com/cookpete/react-player/issues/1474
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export const VideoPlayer = (props) => {
  return <ReactPlayer width="100%" controls={true} url={props.url} />;
};
