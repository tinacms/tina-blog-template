import { TinaMarkdown } from "tinacms/dist/rich-text";


export const TextBox = (props) => {
  return (
    <>
      <p className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 p-8 py-1">
        <TinaMarkdown
          content={props.text}
        />
      </p>
    </>
  );
};
