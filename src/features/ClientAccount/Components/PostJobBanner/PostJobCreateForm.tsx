import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { createJob, editJob } from "features/ClientAccount/services";
import { JobAttributesType } from "features/ClientAccount/types";
import { useForm } from "features/hooks";
import { T } from "helper/types";
import React from "react";
import { useAppDispatch } from "store/hooks";
import { JOB_FIELDS } from "./formFieldsData";
import { jobFormDataSchema } from "./schema";

const PostJobCreateForm = ({ defaultValues, onClose }: any) => {
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
      jobRole: defaultValues?.jobRole || "",
      jobDescription: defaultValues?.jobDescription || "",
      jobType: defaultValues?.jobType || "",
      salary: defaultValues?.salary || "",
      jobLength: defaultValues?.jobLength || "",
      location: defaultValues?.location || "",
    },
    jobFormDataSchema,
    (formData: JobAttributesType) => {
      if (defaultValues?.id) {
        formData.id = defaultValues.id;
      }
      dispatch(defaultValues?.id ? editJob(formData) : createJob(formData)).then(
        (res) => {
          if (res.payload.error) {
            setErrorMessage(res.payload.data.message);
          } else {
            setSuccessMessage(res.payload.message ?? res.type);
            setTimeout(() => {
              setSuccessMessage("");
              onClose && onClose();
            }, 2000);
          }
        }
      );
    }
  );

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-6">
          <div className="px-4 sm:px-0">
            <p className="mt-1 text-sm text-gray-600">
              Provide proper job detail, So models can find if best fit for
              them.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-6 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden border sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                {errorMessage && (
                  <AlertMessage type="error" message={errorMessage} />
                )}
                <div className="grid grid-cols-12 gap-6">
                  {JOB_FIELDS.map((field: T) => (
                    <div key={field.name} className="col-span-6 sm:col-span-6">
                      <Input
                        type={field.type}
                        onChange={handleChange}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
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
                  <p className="my-6 text-green-700">Created Successfully!!!</p>
                )}
                <Button
                  className={"!base-bg-color text-white"}
                  onClick={handleSubmit}
                  type="submit"
                  loading={loading}
                  loadingText="Saving..."
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobCreateForm;
