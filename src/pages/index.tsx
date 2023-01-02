import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Model, { ModelProps } from "../components/Model"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  // @ts-ignore
  const feed = []
  // prisma?.model ? await prisma?.model.findMany() : [];
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: ModelProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((model, i) => (
            <div key={i} className="post">
              <Model model={model} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
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
  )
}

export default Blog
