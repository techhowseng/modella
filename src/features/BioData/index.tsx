import Button from "components/Button";
import Input from "components/Input";
import React from "react";

function BioDataForm() {
  return (
    <div className="flex flex-col justify-center min-h-screen p-2 w-9/12 my-0 mx-auto">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <Input
                        type="textarea"
                        onChange={() => {}}
                        label="Bio"
                        name="bio"
                        id="bio"
                        placeholder="Tell us a little about yourself."
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <Input
                        type="date"
                        onChange={() => {}}
                        label="Birthday"
                        name="dob"
                        id="dob"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <Input
                        type="phone"
                        onChange={() => {}}
                        label="Phone"
                        name="phone"
                        id="phone"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <Input
                        type="text"
                        onChange={() => {}}
                        label="Location"
                        name="location"
                        id="location"
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
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

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
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="link"
                        onChange={() => {}}
                        label="Facebook Profile"
                        name="facebook"
                        id="facebook"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="text"
                        onChange={() => {}}
                        label="Instagram Profile"
                        name="instagram"
                        id="instagram"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="link"
                        onChange={() => {}}
                        label="Linkedin Profile"
                        name="linkedin"
                        id="linkedin"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="text"
                        onChange={() => {}}
                        label="Twitter Profile"
                        name="twitter"
                        id="twitter"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <Input
                        type="text"
                        onChange={() => {}}
                        label="Skill Styles"
                        name="skillStyles"
                        id="skillStyles"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
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
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <Button
                    className={"!base-bg-color text-white"}
                    onClick={() => {}}
                    type="submit"
                  >
                    Save
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

export default BioDataForm;
