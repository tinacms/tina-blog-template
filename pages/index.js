import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";


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
        <h1>{data.page.title}</h1>
        <div className="font-charter" data-tina-field={tinaField(data.page, "body")}>
          <TinaMarkdown content={content} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
