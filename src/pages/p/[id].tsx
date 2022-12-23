import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Router from 'next/router';
import Layout from "../../components/Layout"
import { ModelProps } from "../../components/Model"
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const model = await prisma.model.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: model,
  }
}

async function updateModel(id: Number): Promise<void> {
  await fetch(`/api/model/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

const Model: React.FC<ModelProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.email;

  let title = props.email
  const modelName = props.firstname ? props.lastname : "Name not given";


  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {modelName}</p>
        <ReactMarkdown children={props.bio} />
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => updateModel(props.id)}>Update</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Model
