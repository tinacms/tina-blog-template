import { richTextComponents } from "./richTextSchema";
import {
  TextField,
  defineConfig
} from "tinacms";

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
            return `/${document._sys.filename}`;
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
        format: "mdx",
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
            description: "Remove this post from the list of posts so people can't find it (but it's still accessible via direct link)",
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              {
                type: "string",
                name: "seoTitle",
                label: "SEO Title",
                description: "If left blank the post title will be used",
              },
              {
                type: "string",
                name: "seoDescription",
                label: "SEO Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "seoImage",
                label: "SEO Image",
                description: "Facebook	1200 x 630 pixels, Twitter	1200 x 675 pixels (minimum), LinkedIn	1200 x 627 pixels, Pinterest	1000 x 1500 pixels (2:3 aspect ratio)",
              }
            ]
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
          defaultItem: () => {
            return {
              draft: true,
              date: new Date(),
              seo: {
                seoTitle: "",
                seoDescription: "",
                seoImage: ""
              }
            };
          },
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
