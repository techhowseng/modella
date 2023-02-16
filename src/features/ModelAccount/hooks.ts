import { useEffect, useState } from "react";
import { getUser } from "./services";

export const useGetUser = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  const _getUser = async () => {
    const res = await getUser(id);
    console.log("🚀 ~ file: hooks.ts:10 ~ const_getUser= ~ res", res);
    setUser(res.data);
  };

  useEffect(() => {
    _getUser();
  }, []);

  return {
    user,
    loading,
  };
};
