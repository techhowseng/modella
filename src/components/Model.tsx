import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ModelProps = {
  id: Number;
  email: String;
  firstname: String;
  lastname: String;
  age: number;
  bio: string;
  userId: String;
};

const Model: React.FC<{ model: ModelProps }> = ({ model }) => {
  const modelName = model.firstname ? model.lastname : "Name not given";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${model.id}`)}>
      <h2>{modelName}</h2>
      <small>By {model.email}</small>
      <ReactMarkdown children={model.bio} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Model;
