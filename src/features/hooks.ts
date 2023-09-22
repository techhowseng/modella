import { isEmptyObject } from "helper/functions";
import { APP_ROUTES } from "lib/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SIGN_UP_STEPS } from "./Auth/SignUp/constants";
import {
  getSessionUser,
  registerSessionUser,
  updateSelectedCountryOption,
} from "./Auth/slice";
import { getCookieData } from "./functions";
import { getUser } from "./ModelAccount/services";
import { getUserDetails } from "./Auth/services";
import { useDispatch } from "react-redux";

export const useGetUser = (id: string, fetch: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const dispatch = useAppDispatch();

  const {
    data: { user: sessionStoreUser },
  } = useAppSelector(getSessionUser);

  const _getUser = async () => {
    setLoading(true);
    const res = await dispatch(getUser({ id }));
    if (res.payload.userId) {
      setUser(res.payload);
      setLoading(false);
    } else {
      setLoading(false);
      // Router.push("/404");
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (!fetch && sessionStoreUser?.userId) {
      setUser(sessionStoreUser);
    } else {
      _getUser();
    }
  }, []);

  return {
    user,
    loading,
  };
};

export const useGetSessionUser = (authenticate?: boolean) => {
  const { data: session }: any = useSession();
  const userData = getCookieData();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authenticate && !userData.session.id) {
      router.push(APP_ROUTES.login);
    }
  }, [authenticate, userData]);
  // @ts-ignore
  if (session && session.data) {
    dispatch(registerSessionUser(session.data));
    return { userData: session.data };
  }

  return { userData };
};

export const useGetUserDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUserDetails] = useState<any>({});
  const dispatch = useAppDispatch();

  const {
    data: { user: sessionStoreUser },
  } = useAppSelector(getSessionUser);

  const _getUser = async () => {
    setLoading(true);
    const res = await dispatch(getUserDetails());
    if (res.payload.data.id) {
      setUserDetails(res.payload.data);
      setLoading(false);
    } else {
      setLoading(false);
      // Router.push("/404");
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (sessionStoreUser?.userId) {
      setUserDetails(sessionStoreUser);
    } else {
      _getUser();
    }
  }, []);

  return {
    user,
    loading,
  };
};

export const useFieldsErrorCheck = (
  values: any,
  schema: any,
  handleNext: any,
  setErrorMessage: any,
  e: any
) => {
  schema
    .validate(values)
    .then(() => {
      handleNext(e);
    })
    .catch((err: { errors: string[] }) => {
      setErrorMessage(err.errors[0]);
    });
};

export const useForm = (initialValues: any, schema: any, cb: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [image, setImageFormData] = useState<FormData>();
  const [multipleImageFormData, setMultipleImageFormData] =
    useState<FileList>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [stepState, setStepState] = React.useState(SIGN_UP_STEPS.MORE_DETAILS);
  const [preview, setPreview] = useState<string>();
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEmptyObject(formData)) {
      setFormData(initialValues);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCheckBox = e.target.type === "checkbox";

    if (e.target.type === "select-one") {
      dispatch(updateSelectedCountryOption(e.target.value));
    }

    if (e.target.type === "file") {
      const files = e.target.files;
      const imageFormData = new FormData();
      const reader = new FileReader();

      imageFormData.append("image", files[0]);
      setImageFormData(imageFormData);

      if (files.length) {
        reader.readAsDataURL(files[0]);
        reader.onload = (readerEvent) => {
          setPreview(readerEvent.target.result as string);
        };
      }
    }

    if (e.target.name.includes(".")) {
      const name = e.target.name.split(".")[0];
      const subName = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        [name]: {
          ...formData[name],
          [subName]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: isCheckBox ? e.target.checked : e.target.value,
      });
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    // validate data and dispatch action to move to next step here ...
    setStepState(stepState + 1);
  };

  const handlePrevious = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    // validate data and dispatch action to move to next step here ...
    setStepState(stepState - 1);
  };

  // handle submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    // validate data and dispatch action to register user here ...
    // confirm password and confirmPassword match
    schema
      .validate(formData)
      .catch((err: { errors: React.SetStateAction<string>[] }) => {
        setErrorMessage(err.errors[0]);
        setLoading(false);
      });
    const isValid = await schema.isValid(formData);
    if (isValid) {
      delete formData.confirmPassword;
      !!image ? cb(formData, image) : cb(formData);
      return setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMultipleImageFormData(e.target.files);
    }
  };

  const handleDrop = (e: any, name?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      setMultipleImageFormData(e.dataTransfer.files);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    index?: number
  ) => {
    e.preventDefault();
    const fileListArr = Array.from(multipleImageFormData);
    fileListArr.splice(index, 1);
    setMultipleImageFormData(fileListArr as unknown as FileList);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errorMessage,
    setErrorMessage,
    setSuccessMessage,
    successMessage,
    stepState,
    handleNext,
    handlePrevious,
    loading,
    setFormData,
    preview,
    dragActive,
    handleFileChange,
    handleDrop,
    handleDrag,
    handleRemoveFile,
    setMultipleImageFormData,
    multipleImageFormData,
  };
};
