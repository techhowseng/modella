import React, { useRef, useState } from "react";
import { Card, Progress } from "flowbite-react";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import Button from "components/Button";
import { useForm } from "features/hooks";
import { importGallerySchema } from "./schema";
import ImageList from "./ImageList";
import { useUploadForm } from "./hooks";

const ImportGallery = ({ closeModal }) => {
  const toastId = React.useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [currentUploading, setCurrentUploading] = useState();
  const { isSuccess, uploadForm, progress } = useUploadForm("media");

  const {
    dragActive,
    handleFileChange,
    handleDrop,
    handleDrag,
    handleRemoveFile,
    multipleImageFormData,
  } = useForm(
    {
      file: null,
    },
    importGallerySchema,
    async (formData: any) => {}
  );

  const notifyToast = () =>
    (toastId.current = toast("Upload in progress, Please wait...", {
      autoClose: false,
    }));
  const updateToast = () =>
    toast.update(toastId.current, {
      render: "Upload Done!!!",
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
    });

  const handleSubmitImages = async () => {
    setLoadingImage(true);
    notifyToast();
    const promiseAll = [];

    const imageList = Array.from(multipleImageFormData);
    for (var i = 0, len = imageList.length; i < len; i++) {
      const form = new FormData();
      form.append("content", imageList[i]);
      form.append("contentType", "Gallery");
      promiseAll.push(form);
    }

    Promise.all(promiseAll.map(uploadForm)).then((responses) => {
      if (responses[responses.length - 1].data) {
        updateToast();
        setLoadingImage(false);
        closeModal();
      }
    });
  };

  const isInProgress = progress > 0;

  return (
    <div className="relative">
      <form>
        {!isSuccess && isInProgress ? (
          <div className="z-10 p-6 absolute top-0 left-0 bottom-0 right-0 bg-color-[rgba(0, 0, 0, .5)] w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-x-2">
              <p className="font-bold text-4xl">
                {isInProgress ? progress : 0}%
              </p>
              <Progress
                className="transition-all duration-700 ease-out delay-300 w-[300px] my-auto"
                color="blue"
                progress={isInProgress ? progress : 0}
                size="md"
              />
            </div>
          </div>
        ) : null}
        <div className={`${isInProgress ? "opacity-50" : ""}`}>
          {multipleImageFormData?.length > 0 ? (
            <>
              <ImageList
                imagesFormData={multipleImageFormData}
                progress={progress}
                onListChange={handleRemoveFile}
              />
              <div className="mt-10">
                <Button
                  onClick={handleSubmitImages}
                  loading={loadingImage}
                  loadingText={"Uploading..."}
                >
                  Upload
                </Button>
              </div>
            </>
          ) : (
            <Card
              className="cursor-pointer min-h-[300px]"
              draggable
              aria-label="import-gallery"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col justify-center items-center">
                <FiUploadCloud size={54} />
                {dragActive ? (
                  <>
                    <h2 className="mt-5 text-2xl">Drop your photos here</h2>
                  </>
                ) : (
                  <>
                    <h2 className="mt-5 text-2xl">Drag and Drop photos here</h2>
                    <h4 className="my-5">Or</h4>
                    <Button
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                    >
                      Browse
                    </Button>
                    <input
                      name={"file"}
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      multiple
                      type="file"
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </Card>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImportGallery;
