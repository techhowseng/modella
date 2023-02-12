import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { T } from "helper/types";
import React from "react";
import { useAppDispatch } from "store/hooks";
import { MODEL_ATTRIBUTES_DATA_FIELDS } from "../formFieldData";
import { modelAttributesFormDataSchema } from "../schema";
import { updateModel } from "../services";
import { ModelAttributesType } from "../types";

const ModelAttributes = () => {
  const dispatch = useAppDispatch();
  const {
    handleChange,
    handleSubmit,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    loading,
  } = useForm(
    {
      height: "",
      bust: "",
      waist: "",
      hip: "",
      shoeSize: "",
      weight: "",
      complexion: "",
      isAvailable: false,
    },
    modelAttributesFormDataSchema,
    (formData: ModelAttributesType) => {
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
              Physical Attributes
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Provide your physical attributes, So we can better find the best
              jobs for you.
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
                  {MODEL_ATTRIBUTES_DATA_FIELDS.map((field: T) => (
                    <div key={field.name} className="col-span-6 sm:col-span-6">
                      <Input
                        type={field.type}
                        onChange={handleChange}
                        label={field.label}
                        name={field.name}
                        id={field.name}
                        options={field.options}
                        placeholder={field?.placeholder ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6 transition-all duration-200 ease-in-out">
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

export default ModelAttributes;
