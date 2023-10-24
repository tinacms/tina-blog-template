import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import Link from "next/link";
import moment from 'moment';

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
        <article className="font-charter" data-tina-field={tinaField(data.page, "body")} >
          <TinaMarkdown content={content} />
        </article>
        <section>
          <h2 className="text-3xl mt-8">Posts</h2>
          <ul className="list-[circle]">
            {data.postConnection.edges.map((edge) => {
              return (
                <li className="my-0">
                  <Link href={`/posts/${edge.node._sys.filename}`}>{edge.node.title} - {moment(edge.node.date).format('MMM DD, YYYY')}</Link>
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
  const { data, query, variables } = await client.queries.homePage();
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
