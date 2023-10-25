import { defineConfig, tinaTableTemplate } from "tinacms";


export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
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
      },
      {
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
              tinaTableTemplate,
              {
                name: "VideoPlayer",
                label: "VideoPlayer",
                fields: [
                  {
                    name: "url",
                    label: "Video URL",
                    type: "string",
                  },
                ],
                ui: {
                  defaultItem: {
                    url: "https://www.youtube.com/watch?v=PcgnJDILv4w&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB",
                  },
                },
              },
              {
                name: "CaptionedImage",
                label: "Img with caption",
                ui: {
                  defaultItem: {
                    imgUrl: "https://res.cloudinary.com/forestry-demo/image/upload/v1698260502/Random/eat-your-food.jpg",
                    caption: "Napoleon and Tina",
                    alt: "Napoleon Dynamite Feeding Llama"
                  }
                },
                fields: [
                  {
                    name: "imgUrl",
                    label: "Image URL",
                    type: "image",
                  },
                  {
                    name: "caption",
                    label: "Caption",
                    type: "string",
                  },
                  {
                    name: "alt",
                    label: "Image alt text",
                    type: "string",
                  },
                ],
              },
              {
                name: "TweetEmbed",
                label: "Tweet",
                ui: {
                  defaultItem: {
                    tweetId: "1715750219537621120"
                  }
                },
                fields: [
                  {
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
                ui: {
                  defaultItem: {
                    text: "How much you wanna make a bet I can throw a football over them mountains?",
                    author: "Uncle Rico",
                  }
                },
                fields: [
                  {
                    name: "text",
                    label: "Text",
                    type: "string",
                  },
                  {
                    name: "author",
                    label: "Author",
                    description: "Optional",
                    type: "string",
                  },
                  {
                    name: "authorLink",
                    label: "Author Link",
                    description: "Optional",
                    type: "string",
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
      }
    ],
  },
});

export default config;
