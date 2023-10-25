export const PullQuote = (props) => {
  return (
    <>
      <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 mb-1 leading-8">
        <p className="opacity-80 mb-1">
          {props.text}
        </p>
      </blockquote>
      {props.author &&
        <a className="italic text-[.8em] opacity-80" href={props.authorLink}>
          - {props.author}
        </a>
      }
    </>
  );
};
