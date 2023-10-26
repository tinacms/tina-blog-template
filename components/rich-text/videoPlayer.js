import ReactPlayer from "react-player/lazy";

export const VideoPlayer = (props) => {
    return <ReactPlayer width="100%" controls={true} url={props.url} />;
}