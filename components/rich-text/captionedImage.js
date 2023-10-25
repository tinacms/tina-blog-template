export const CaptionedImage = (props) => {
  return (
    <figure className="flex items-center justify-center flex-col">
      <img style={{ maxWidth: "100%" }} src={props.imgUrl} alt={props.alt} />

      <figcaption className="text-[.8em]">{props.caption}</figcaption>
    </figure>
  );
};
