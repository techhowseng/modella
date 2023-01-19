import Button from "components/Button";
import Input from "components/Input";
import React from "react";

function JobApplicationForm() {
  return (
    <div className="flex flex-col min-h-screen p-5 w-9/12 my-0 mx-auto">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Welcome to your first proffesional job application
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please ensure you meet at least 60% of the jobs criteria before
                applying
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <fieldset>
                        <legend className="contents text-base font-medium text-gray-900">
                          Would you be available for a time duration of 2 weeks?
                        </legend>
                        <div className="flex mt-4 space-x-4">
                          <div className="flex items-center">
                            <input
                              id="yes"
                              name="yes"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                            />
                            <label
                              htmlFor="yes"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="partially"
                              name="partially"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                            />
                            <label
                              htmlFor="partially"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Partially
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="no"
                              name="no"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
                            />
                            <label
                              htmlFor="no"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <Input
                        type="email"
                        onChange={() => {}}
                        label="Please provide your working e-mail or contact details here."
                        name="email"
                        id="email"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <Button
                    className={"!base-bg-color text-white"}
                    onClick={() => {}}
                    type="submit"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationForm;
