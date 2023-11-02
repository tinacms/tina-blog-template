import { useRouter } from 'next/router';
import { Layout } from "../../components/Layout";
import Head from "next/head";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../tina/__generated__/client";
import moment from 'moment';
import { TextBox } from "../../components/rich-text/textBox";
import { TweetEmbed } from "../../components/rich-text/tweet";
import { PullQuote } from "../../components/rich-text/pullQuote";
import { CaptionedImage } from "../../components/rich-text/captionedImage";
import { VideoPlayer } from "../../components/rich-text/videoPlayer";

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

  let publishDate = moment(data.post.date).format('MMM DD, YYYY');

  const content = data.post.body;

  const { asPath } = useRouter()

  return (
    <Layout>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content={data.post.seo?.seoDescription} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={asPath} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.post.seo?.seoTitle ? data.post.seo.seoTitle : data.post.title} />
        <meta property="og:description" content={data.post.seo?.seoDescription} />
        <meta property="og:image" content={data.post.seo?.seoImage} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="article" />
        <meta property="twitter:url" content={asPath} />
        <meta name="twitter:title" content={data.post.seo?.seoTitle ? data.post.seo.seoTitle : data.post.title} />
        <meta name="twitter:description" content={data.post.seo?.seoDescription} />
        <meta name="twitter:image" content={data.post.seo?.seoImage} />
      </Head>
      <article className="mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
        <h1 className="text-center" data-tina-field={tinaField(data.post, "title")}>{data.post.title}</h1>
        <p className="prose-sm text-center" data-tina-field={tinaField(data.post, "date")}>{publishDate}</p>
        <div>
          <TinaMarkdown components={components} content={content} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: ctx.params.slug + ".mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
