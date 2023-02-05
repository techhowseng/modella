import React, { useEffect } from "react";
import HeaderFooter from "layouts/HeaderFooter";
import { useAppDispatch } from "store/hooks";

type Props = {};

const HomePage: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  return <HeaderFooter title={""}>Hello home</HeaderFooter>;
};

export default HomePage;
