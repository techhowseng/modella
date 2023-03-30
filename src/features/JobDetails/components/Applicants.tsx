import { Model } from "@prisma/client";
import Button from "components/Button";
import React from "react";

function Applicants({
  isClient,
  applicants,
}: {
  isClient?: boolean;
  applicants: Model[];
}) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl">Applicants (22)</h1>

      <div className="text-sm font-light text-gray-500">
        <div className="w-full max-w-md mt-2 px-4 bg-white border border-gray-200 rounded-lg">
          <div className="flow-root">
            <ul role="list" className="w-full divide-y divide-gray-200">
              {applicants?.length > 0 ? (
                applicants.map((applicant: Model) => (
                  <li key={applicant.id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          // src={applicant.image}
                          alt={applicant.firstname}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {applicant.firstname} {applicant.lastname}
                        </p>
                        {/* <p className="text-sm text-gray-500 truncate">
                          {applicant.title}
                        </p> */}
                      </div>
                      {isClient && (
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          <Button href={`/model/${applicant.userId}`}>
                            {"View Profile"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-3 sm:py-4"> No applicants yet </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicants;
