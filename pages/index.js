import Link from "next/link";
import { Layout } from "../components/Layout";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../tina/__generated__/client";
import { TextBox } from "../components/rich-text/textBox";
import { TweetEmbed } from "../components/rich-text/tweet";
import { PullQuote } from "../components/rich-text/pullQuote";
import { CaptionedImage } from "../components/rich-text/captionedImage";
import { VideoPlayer } from "../components/rich-text/videoPlayer";
import moment from "moment";

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
      <section className="mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
        <h1 data-tina-field={tinaField(data.page, "title")}>{data.page.title}</h1>
        <article data-tina-field={tinaField(data.page, "body")} >
          <TinaMarkdown components={components} content={content} />
        </article>
        <section>
          <h2 className="text-3xl mt-8">Posts</h2>
          <ul className="list-[circle]">
            {data.postConnection.edges.map((edge) => {
              return (
                <li key={edge.node.id} className="my-0">
                  <Link href={`/posts/${edge.node._sys.filename}`}>{edge.node.title} <span className="text-gray-400 text-sm"> - {moment(edge.node.date).format('MMM DD, YYYY')}</span></Link>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </Layout >
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.homePage({ filter: { draft: { eq: false } } });
  const posts = data.postConnection.edges?.map((edge) => {
    return {
      title: edge.node.title,
      date: edge.node.date,
      filename: edge.node._sys.filename,
    };
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
