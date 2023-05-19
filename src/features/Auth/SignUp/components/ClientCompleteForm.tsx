import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { clientCompleteFormDataSchema } from "features/Auth/schema";
import { createClient } from "features/Auth/services";
import { getSessionUser, getStateList } from "features/Auth/slice";
import { ClientRegistrationCompleteFormType } from "features/Auth/types";
import { useForm } from "features/hooks";
import { APP_ROUTES } from "lib/routes";
import Router from "next/router";
import React, { useEffect } from "react";
import { CLIENT_SIGNUP_COMPLETE_FORM } from "../../formFieldData";
import { useAppDispatch, useAppSelector } from "store/hooks";

const ClientCompleteForm = ({ stateList }: { stateList?: any[] }) => {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const { data, loading, error, message } = useAppSelector(getSessionUser);
  const {
    formData: values,
    handleChange,
    handleSubmit,
    errorMessage,
    setErrorMessage,
  } = useForm(
    {
      companyName: "",
      phone: {
        number_1: "",
      },
      address: "",
      country: "",
      state: "",
      social: {
        facebook: "",
        twitter: "",
        linkedIn: "",
        instagram: "",
      },
    },
    clientCompleteFormDataSchema,
    (formData: ClientRegistrationCompleteFormType) => {
      // @ts-ignore
      dispatch(createClient(formData)).then((res) => {
        if (res.payload.error) {
          setErrorMessage(res.payload.data.message);
        } else {
          if (res.payload.id) {
            Router.push(APP_ROUTES.clientProfile);
          }
          setSuccessMessage(res.payload.message);
        }
      });
    }
  );

  // useEffect(() => {
  //   console.log("stateList >>>> ", values, stateList);
  // }, [stateList]);
  // console.log("stateList 2 >>>> ", values, stateList);

  return (
    <div className="flex-1 w-full lg:my-10 py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 flex flex-col justify-center">
      <div className="flex flex-col lg:mt-10">
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}

        <div>
          <>
            <div className="flex flex-col mt-0 lg:mt-16 mb-10">
              <h1 className="text-3xl mb-5 font-bold">
                Thank you for signing up
              </h1>
              <p className="mr-1 text-xl">
                Please fill out the important data needed for your profile
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 items-center">
              {/* @ts-ignore */}
              {CLIENT_SIGNUP_COMPLETE_FORM(stateList).map(
                (field: {
                  name: string;
                  label: string;
                  type: string;
                  options: any[];
                }) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    options={field.options}
                    onChange={handleChange}
                  />
                )
              )}
            </div>
          </>

          {/* {stepState === SIGN_UP_STEPS.PROFILE_PICTURE && <SetUpProfile />}
          {stepState === SIGN_UP_STEPS.SET_UP_PROFILE && (
            <ProfessionalAssetsComponent />
          )} */}
          {/* {stepState === SIGN_UP_STEPS.FINISH && <SkillsComponents />} */}
          <div className="mt-10">
            {errorMessage && (
              <AlertMessage type="error" message={errorMessage} />
            )}
          </div>
          <Button
            className="mt-10"
            onClick={handleSubmit}
            loading={loading}
            loadingText={"Submitting..."}
          >
            <p className="text-white">{"Submit"}</p>
          </Button>
          {/* <!------------> */}
        </div>
      </div>
    </div>
  );
};

export default ClientCompleteForm;
