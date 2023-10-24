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
      templates: [
        {
          name: "CaptionedImage",
          label: "Img with caption",
          fields: [
            {
              ui: {
                defaultValue:
                  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
              },
              name: "imgUrl",
              label: "Image URL",
              type: "string",
            },
            {
              ui: {
                defaultValue: "This is my caption",
              },
              name: "caption",
              label: "Caption",
              type: "string",
            },
            {
              ui: {
                alt: "This is my caption",
              },
              name: "alt",
              label: "Image alt text",
              type: "string",
            },
          ],
        },
        {
          name: "Tweet",
          label: "Tweet",
          fields: [
            {
              ui: {
                defaultValue: "1533470815550939136",
              },
              name: "tweetId",
              label: "Tweet ID",
              type: "string",
              description: "Unique number (about 20-digits) at the end of the Tweet URL",
            },
          ],
        },
        {
          name: "TextBox",
          label: "Text Box",
          fields: [
            {
              name: "text",
              label: "Text",
              type: "rich-text",
              ui: {
                defaultValue: "Lorem Ipsum Dolor",
              },
            },
          ],
        },
        {
          name: "PullQuote",
          label: "Pull Quote",
          fields: [
            {
              name: "text",
              label: "Text",
              type: "string",
              ui: {
                defaultValue: "This is my quote",
                component: "textarea",
              },
            },
            {
              name: "author",
              label: "Author",
              description: "Optional",
              type: "string",
              ui: {
                defaultValue: "Herman Melville",
              },
            },
            {
              name: "authorLink",
              label: "Author Link",
              description: "Optional",
              type: "string",
              ui: {
                defaultValue: "https://en.wikipedia.org/wiki/Herman_Melville",
              },
            },
          ],
        },
      ],
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
