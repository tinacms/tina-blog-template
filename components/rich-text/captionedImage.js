export const CaptionedImage = (props) => {
  return (
    <figure className="md:min-w-[calc(100%+100px)] md:ml-[-50px] lg:min-w-[calc(100%+200px)] lg:ml-[-100px] xl:min-w-[calc(100%+260px)] xl:ml-[-130px] py-6 flex items-center justify-center flex-col">
      <img style={{ maxWidth: "100%" }} src={props.imgUrl} alt={props.alt} />

      <figcaption className="text-[.8em]">{props.caption}</figcaption>
    </figure>
  );
};
