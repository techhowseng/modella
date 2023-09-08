import { getJobsActions } from "features/JobDetails/services";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<any>({
    jobRole: null,
    jobType: null,
    locations: null,
    page: 1,
    perPage: 10,
    // sortBy: "newest",
  });

  useEffect(() => {
    dispatch(getJobsActions(search));
  }, [search]);

  const handleChange = (e: any) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(getJobsActions(search));
  };

  return { search, setSearch, handleChange, handleSubmit };
};
