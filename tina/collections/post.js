/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Posts",
  name: "post",
  path: "content/post",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
      isTitle: true,
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
    filename: {
      slugify: values => {
        return `${(values.title || "").toLowerCase().replace(/ /g, "-")}`.replace(/[^\w\.\/-\s]/gi, "");
      }
    }
  },
};
