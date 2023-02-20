import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { T } from "helper/types";
import React from "react";
import { useAppDispatch } from "store/hooks";
import { SOCIAL_DATA_FIELDS } from "../formFieldData";
import { socialsFormDataSchema } from "../schema";
import { updateModel } from "../services";
import { SocialFormType } from "../types";

const SocialForm = ({ socials }: { socials: any }) => {
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
      social: {
        facebook: socials?.facebook || "",
        instagram: socials?.instagram || "",
        linkedIn: socials?.linkedIn || "",
        twitter: socials?.twitter || "",
      },
    },
    socialsFormDataSchema,
    (formData: SocialFormType) => {
      dispatch(updateModel(formData)).then((res) => {
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
              Social Links
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Input your social links.
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
                <div className="grid grid-cols-12 gap-6">
                  {SOCIAL_DATA_FIELDS.map((field: T) => (
                    <div key={field.name} className="col-span-6 sm:col-span-6">
                      <Input
                        type={field.type}
                        onChange={handleChange}
                        label={field.label}
                        name={field.name}
                        value={
                          field.name.includes(".")
                            ? values[field.name.split(".")[0]][
                                field.name.split(".")[1]
                              ]
                            : values[field.name]
                        }
                        id={field.name}
                        placeholder={field?.placeholder ?? ""}
                      />
                    </div>
                  ))}

                  {/* <div className="col-span-6 sm:col-span-6">
                    <fieldset>
                      <legend className="contents text-base font-medium text-gray-900">
                        Skill set Level
                      </legend>
                      <p className="text-sm text-gray-500">
                        What sill level are you?.
                      </p>
                      <div className="flex mt-4 space-x-4">
                        <div className="flex items-center">
                          <input
                            id="beginner"
                            name="beginner"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                          />
                          <label
                            htmlFor="beginner"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Beginner
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="intermediate"
                            name="intermediate"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                          />
                          <label
                            htmlFor="intermediate"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Intermediate
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="professional"
                            name="professional"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                          />
                          <label
                            htmlFor="professional"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Professional
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div> */}
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

export default SocialForm;
