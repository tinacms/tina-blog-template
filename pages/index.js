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
        <h1 data-tina-field={tinaField(data.page, "title")}>
          {data.page.title}
        </h1>
        <div
          className="font-charter"
          data-tina-field={tinaField(data.page, "body")}
        >
          <TinaMarkdown content={content} />
        </div>
        {props.posts.map((post) => {
          return (
            <div>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
            </div>
          );
        })}
      </article>
    </Layout>
  );
}

export const getStaticProps = async () => {
  // const { data, query, variables } = await client.queries.page({
  //   relativePath: "home.mdx",
  // });

  // const postsResult = await client.queries.postConnection({ sort: "date" });

  // const posts = postsResult.data.postConnection.edges?.map((edge) => {
  //   return {
  //     title: edge.node.title,
  //     date: edge.node.date,
  //   };
  // });
  const { data, query, variables } = await client.queries.homePage();
  const posts = data.postConnection.edges?.map((edge) => {
    return {
      title: edge.node.title,
      date: edge.node.date,
    };
  });

  return {
    props: {
      data,
      query,
      variables,
      posts,
      //myOtherProp: 'some-other-data',
    },
  };
};
