import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import moment from 'moment';

export default function PostList(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const postsList = data.postConnection.edges;

  return (
    <Layout>
      <ul className="pl-0">
        {postsList.map((post) => (
          <li key={post.node.id}>
            <Link href={`/posts/${post.node._sys.filename}`}>{post.node.title} <span className="text-gray-400 text-sm"> - {moment(post.node.date).format('MMM DD, YYYY')}</span></Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.postConnection({ filter: { draft: { eq: false } } });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
