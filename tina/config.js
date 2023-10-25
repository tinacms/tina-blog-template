import { defineConfig } from "tinacms";
import { richTextComponents } from "./richTextSchema";

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
            templates: richTextComponents
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
            templates: richTextComponents
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
