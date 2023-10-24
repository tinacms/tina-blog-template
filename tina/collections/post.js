/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
    },
    {
      type: "boolean",
      label: "Draft",
      name: "draft",
      description: "Turn on to hide post from public site",
    },
    {
      label: "Body",
      name: "body",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/${document._sys.filename}`;
    },
  },
};
