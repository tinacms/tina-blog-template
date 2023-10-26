import { tinaTableTemplate } from "tinacms";

export const richTextComponents = [
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
        label: "Large Image",
        ui: {
            defaultItem: {
                imgUrl: "https://res.cloudinary.com/forestry-demo/image/upload/v1698329061/Random/abstract_painting1.jpg",
                caption: "Abstract art created with Midjourney",
                alt: "Abstract art"
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
]