import { Layout } from "../../components/Layout";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../tina/__generated__/client";
import moment from 'moment';

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  let publishDate = moment(data.post.date).format('MMM DD, YYYY');

  const content = data.post.body;
  return (
    <Layout>
      <article className="mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
        <h1 className="text-center">{data.post.title}</h1>
        <p className="prose-sm text-center">{publishDate}</p>
        <div className="font-charter" data-tina-field={tinaField(data.page, "body")}>
          <TinaMarkdown content={content} />
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
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
