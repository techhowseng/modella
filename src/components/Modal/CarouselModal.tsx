import Carousel from "components/Carousel";
import { UsablePicture } from "helper/types";
import React from "react";
import { MdClose } from "react-icons/md";

const CarouselModal = ({
  onOpen,
  isOpen,
  images,
}: {
  onOpen: (val: boolean) => void;
  isOpen: boolean;
  images: UsablePicture[];
}) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onOpen(false);
  };

  return (
    <div
      id="gallery-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-0 md:p-4 lg:p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.7)]"
    >
      <div className="relative w-full h-full max-w-full md:max-w-4xl lg:max-w-4xl md:h-auto mx-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          {/* <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3> */}
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            onClick={handleClose}
          >
            <MdClose size={20} />
            <span className="sr-only">Close modal</span>
          </button>
          {/* </div> */}
          {/* <!-- Modal body --> */}
          <div>
            <Carousel images={images} />
          </div>
          {/* <!-- Modal footer --> */}
          {/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            {buttonText && (
              <button
                onClick={onClick}
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {buttonText ?? "Submit"}
              </button>
            )}
            <button
              onClick={handleClose}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CarouselModal;
