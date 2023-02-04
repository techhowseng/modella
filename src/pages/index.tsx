import React, { useEffect } from "react";
import { GetStaticProps } from "next";
// import Layout from "../components/Layout"
// import Model, { ModelProps } from "../components/Model"
import prisma from "../lib/prisma";
import HeaderFooter from "layouts/HeaderFooter";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuthUser } from "features/Auth/slice";
import { getKanyeQuote, selectKanye } from "features/Auth/kanyeSlice";

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
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const { data, pending, error } = useAppSelector(selectKanye);

  // console.log(data, pending, error);

  useEffect(() => {
    dispatch(getKanyeQuote());
  }, []);

  return <HeaderFooter title={""}>Hello home</HeaderFooter>;
};

export default HomePage;
