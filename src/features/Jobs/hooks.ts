import { getJobsActions } from "features/JobDetails/services";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<any>({
    search: "",
    jobType: "",
    locations: "",
  });

  const handleChange = (e: any) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(getJobsActions(search));
  };

  return { search, handleChange, handleSubmit };
};
