import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { useFieldsErrorCheck, useForm } from "features/hooks";
import { signUpCompleteFormDataSchema } from "features/Auth/schema";
import { createModel } from "features/Auth/services";
import { getSessionUser } from "features/Auth/slice";
import { AuthRegistrationCompleteFormType } from "features/Auth/types";
import { APP_ROUTES } from "lib/routes";
import Router from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CREATOR_SIGNUP_COMPLETE_FORM } from "../../formFieldData";
import { SIGN_UP_STEPS } from "../constants";
import ProfessionalAssetsComponent from "./ProfessionalAssetsComponent";
import SetUpProfile from "./SetUpProfile";

function ModelCompleteForm() {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const { data, loading, error, message } = useAppSelector(getSessionUser);
  const {
    formData: values,
    handleChange,
    handleSubmit,
    handleNext,
    stepState,
    errorMessage,
    setErrorMessage,
  } = useForm(
    {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      DOB: "",
      state: "",
      country: "",
    },
    signUpCompleteFormDataSchema,
    (formData: AuthRegistrationCompleteFormType) => {
      formData.phone = {
        phone_1: formData.phone,
      };

      dispatch(createModel(formData)).then((res) => {
        if (res.payload.error) {
          setErrorMessage(res.payload.data.message);
        } else {
          if (res.payload.DOB) {
            Router.push(APP_ROUTES.bioData);
          }
          setSuccessMessage(res.payload.message);
        }
      });
    }
  );

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Pass in the schema for the current step
    let schema = signUpCompleteFormDataSchema;
    switch (stepState) {
      case SIGN_UP_STEPS.MORE_DETAILS:
        schema = signUpCompleteFormDataSchema;
        break;
      case SIGN_UP_STEPS.PROFILE_PICTURE:
        schema = signUpCompleteFormDataSchema;
        break;
      default:
        break;
    }
    useFieldsErrorCheck(values, schema, handleNext, setErrorMessage, e);
  };

  // check if the current step is the last step
  const isFinal = stepState === SIGN_UP_STEPS.PROFILE_PICTURE;

  return (
    <div className="flex-1 w-full lg:my-10 py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 flex flex-col justify-center">
      <div className="flex flex-col lg:mt-10">
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}

        <div>
          {stepState === SIGN_UP_STEPS.MORE_DETAILS && (
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
                {CREATOR_SIGNUP_COMPLETE_FORM.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    options={field.options}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </>
          )}
          {stepState === SIGN_UP_STEPS.PROFILE_PICTURE && <SetUpProfile />}
          {stepState === SIGN_UP_STEPS.SET_UP_PROFILE && (
            <ProfessionalAssetsComponent />
          )}
          {/* {stepState === SIGN_UP_STEPS.FINISH && <SkillsComponents />} */}
          <div className="mt-10">
            {errorMessage && (
              <AlertMessage type="error" message={errorMessage} />
            )}
          </div>
          <Button
            className="mt-10"
            onClick={isFinal ? handleSubmit : handleNextClick}
            loading={loading}
            loadingText={"Submitting..."}
          >
            <p className="text-white">{isFinal ? "Submit" : "Next"}</p>
          </Button>
          {/* <!------------> */}
        </div>
      </div>
    </div>
  );
}

export default ModelCompleteForm;
