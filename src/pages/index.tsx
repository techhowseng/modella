import React from "react";
import { GetStaticProps } from "next";
// import Layout from "../components/Layout"
// import Model, { ModelProps } from "../components/Model"
import prisma from "../lib/prisma";
import HeaderFooter from "layouts/HeaderFooter";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuthUser } from "features/Auth/slice";

export const getStaticProps: GetStaticProps = async () => {
  // @ts-ignore
  const feed = [];
  // prisma?.model ? await prisma?.model.findMany() : [];
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {};

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector(getAuthUser);
  // const dispatch = useAppDispatch();

  return <HeaderFooter title={""}>Hello home</HeaderFooter>;
};

export default HomePage;
