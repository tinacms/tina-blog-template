import { Layout } from "../components/Layout";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../tina/__generated__/client";
import { TextBox } from "../components/rich-text/textBox";
import { TweetEmbed } from "../components/rich-text/tweet";
import { PullQuote } from "../components/rich-text/pullQuote";
import { CaptionedImage } from "../components/rich-text/captionedImage";
import { VideoPlayer } from "../components/rich-text/videoPlayer";

// adding some components for use in the Rich Text editor and customizing the existing block quote component 
const components = {
  TextBox, TweetEmbed, PullQuote, CaptionedImage, VideoPlayer, blockquote: (props) => {
    return <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 mb-1 leading-8">{props.children}</blockquote>
  },
};


export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  return (
    <Layout>
      <article className="mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
        <h1 className="text-center" data-tina-field={tinaField(data.page, "title")}>{data.page.title}</h1>
        <div data-tina-field={tinaField(data.page, "body")}>
          <TinaMarkdown components={components} content={content} />
        </div>
      </article>
    </Layout>
  );
}

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getServerSideProps = async ({ params }) => {
  const { data, query, variables } = await client.queries.page({
    relativePath: `${params.slug}.mdx`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
