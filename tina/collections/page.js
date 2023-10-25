/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Pages",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      required: true,
      isTitle: true,
    },
    {
      name: "body",
      label: "Main Content",
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
          name: "Tweets",
          label: "Tweet",
          fields: [
            {
              name: "tweetId",
              label: "Tweet ID",
              type: "string",
              description: "Unique number (about 20-digits) at the end of the Tweet URL",
              ui: {
                defaultValue: "1533470815550939136",
              },
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
      if (document._sys.filename === "home") {
        return `/`;
      }
      return undefined;
    },
    filename: {
      slugify: values => {
        return `${(values.title || "").toLowerCase().replace(/ /g, "-")}`.replace(/[^\w\.\/-\s]/gi, "");
      }
    }
  },
};