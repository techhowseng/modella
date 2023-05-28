import React from "react";
import { Card, Progress } from "flowbite-react";
import { MdClose } from "react-icons/md";

type ImageList = {
  src: string;
  name: string;
  size: number;
};

const ImageList = ({ imagesFormData, progress, onListChange }) => {
  const imageList = imagesFormData ? [...imagesFormData] : [];

  const handleRemoveFile = (e: any, index: number) => {
    // delete imageList[index];
    onListChange(e, index);
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Photos
        </h5>
      </div>
      <div className="flow-root">
        {imageList?.length > 0 &&
          imageList?.map((imageItem: File, index: number) => {
            const src = URL.createObjectURL(imageItem);
            return (
              <ul
                role="list"
                className="divide-y divide-gray-100"
                key={imageItem.name}
              >
                <li className="flex justify-between items-center gap-y-6 pb-5">
                  <div className="flex gap-x-4 items-center">
                    <img
                      className="object-contain w-20 flex-none bg-gray-50"
                      src={src}
                      alt={imageItem.name}
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm leading-6 text-gray-900">
                        {imageItem.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {Math.ceil(imageItem.size / 1000)}KB
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center sm:flex-row gap-x-4">
                    {progress > 1 ? null : (
                      <div className="sm:flex sm:flex-col sm:items-end">
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="defaultModal"
                          onClick={(e) => handleRemoveFile(e, index)}
                        >
                          <MdClose size={20} />
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            );
          })}
      </div>
    </Card>
  );
};

export default ImageList;
