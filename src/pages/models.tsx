import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Model, { ModelProps } from '../components/Model';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  // if (!session) {
  //   res.statusCode = 403;
  //   return { props: { models: [] } };
  // }

  const models = await prisma.model.findMany();
  return {
    props: { models },
  };
};

type Props = {
  models: ModelProps[];
};

const Models: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  console.log("props>>>>>>>", props)
  // if (!session) {
  //   return (
  //     <Layout>
  //       <h1>My Drafts</h1>
  //       <div>You need to be authenticated to view this page.</div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <div className="page">
        <h1>Models</h1>
        <main>
          {props.models.map((model, i) => (
            <div key={i} className="post">
              <Model model={model} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Models;
