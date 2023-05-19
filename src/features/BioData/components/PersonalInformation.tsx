import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { BioCompleteFormType } from "features/BioData/types";
import React from "react";
import { bioCompleteFormDataSchema } from "../schema";
import { BIO_DATA_FIELDS } from "../formFieldData";
import { T } from "helper/types";
import AlertMessage from "components/AlertMessage";
import { useAppDispatch } from "store/hooks";
import { updateModel } from "../services";

const PersonalInformation = ({ userData, bio, phone, dob }: any) => {
  const dispatch = useAppDispatch();

  const {
    formData: values,
    handleChange,
    handleSubmit,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    loading,
  } = useForm(
    {
      bio: bio || "",
      phone: {
        phone_1: phone || "",
      },
      DOB: dob || "",
    },
    bioCompleteFormDataSchema,
    (formData: BioCompleteFormType) => {
      dispatch(updateModel({ id: userData.userId, formData })).then((res) => {
        if (res.payload.error) {
          setErrorMessage(res.payload.data.message);
        } else {
          setSuccessMessage(res.payload.message ?? res.type);
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      });
    }
  );

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Tell us more about yourself.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                {errorMessage && (
                  <AlertMessage type="error" message={errorMessage} />
                )}
                <div className="grid grid-cols-6 gap-6">
                  {BIO_DATA_FIELDS.map((field: T) => (
                    <div key={field.name} className="col-span-6 sm:col-span-6">
                      <Input
                        type={field.type}
                        onChange={handleChange}
                        label={field.label}
                        value={
                          field.name.includes(".")
                            ? values[field.name.split(".")[0]]?.phone_1
                            : values[field.name]
                        }
                        name={field.name}
                        id={field.name}
                        placeholder={field?.placeholder ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                {successMessage && (
                  <p className="my-6 text-green-700">Saved Successfully!!!</p>
                )}
                <Button
                  className={"!base-bg-color text-white"}
                  onClick={handleSubmit}
                  type="submit"
                  loading={loading}
                  loadingText="Saving..."
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
