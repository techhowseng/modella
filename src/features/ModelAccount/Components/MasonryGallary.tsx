import React, { useEffect } from "react";
import { motion } from "framer-motion";
import bannerBG from "assets/bannerBg.svg";
import { AiOutlineDelete, AiOutlinePicture } from "react-icons/ai";
import Button from "components/Button";
import { useModal } from "components/Modal/hook";
import { MdAddCircleOutline } from "react-icons/md";
import Modal from "components/Modal";
import { useDispatch } from "react-redux";
import { getUserMediaAction } from "../services";
import Loading from "components/loading";
import ImportGallery from "./ImportGallery";
import CarouselModal from "components/Modal/CarouselModal";

function MasonryGallary({ mediaList, loading, isLoggedInUser, user }) {
  const { isOpen, setIsOpen } = useModal();
  const { isOpen: galleryModalIsOpen, setIsOpen: setGalleryModalIsOpen } =
    useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.userId) {
      // @ts-ignore
      dispatch(getUserMediaAction(user.userId));
    }
  }, [user]);

  return (
    <div>
      <div className="mb-6 z-10 border rounded-lg flex flex-col lg:flex-row item-center bg-white w-full mx-auto py-6 px-6 lg:px-8 justify-between relative overflow-hidden">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
              <svg
                aria-hidden="true"
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Fire icon</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl">Add new pictures</h1>
            <h3 className="text-md">
              Upload your best photos, this is what clients would see.
            </h3>
          </div>
        </div>

        <div className="flex flex-row z-10 mt-4 lg:mt-0">
          <Button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-white !w-full p-1 md:w-[0px] lg:w-[0px] mr-10 text-white lg:text-white space-x-2"
          >
            <MdAddCircleOutline size={54} />
            <p className="block lg:block">Add Photo</p>
          </Button>
        </div>

        <img
          className="absolute right-[-400px] top-[-100px] z-0"
          src={bannerBG.src}
          alt="banner background image"
        />
      </div>

      <>
        {loading && (
          <div className="flex w-full justify-center item-center">
            <div className="flex text-center p-20 flex-col">
              <Loading color="base-color" w={14} h={14} />
            </div>
          </div>
        )}
        {!loading && mediaList.length > 0 ? (
          <div className="gap-1 columns-2 md:columns-3 lg:columns-3">
            {/* @ts-ignore */}
            {mediaList
              ?.map((image: any) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative cursor-pointer mb-1 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20"
                  onClick={() => setGalleryModalIsOpen(true)}
                >
                  <img
                    loading="lazy"
                    className="w-full"
                    src={image.content.url}
                    alt={image.content.public_id}
                  />
                  {isLoggedInUser && user?.type === "Model" ? (
                    <button className="p-4 absolute top-0 right-0 group hover:bg-[rgba(0,0,0,0.5)] hover:scale-75 transition-all duration-200 ease-in-out rounded">
                      <AiOutlineDelete className="h-5 w-5 text-white" />
                      {/* <p>Remove</p> */}
                    </button>
                  ) : null}
                </motion.div>
              ))
              .reverse()}

            {/* <!-- Gallery modal --> */}
            <CarouselModal
              isOpen={galleryModalIsOpen}
              onOpen={setGalleryModalIsOpen}
              images={mediaList?.map((image: any) => {
                return {
                  src: image.content.url,
                  caption: image.content.public_id,
                };
              })}
            />
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <div className="flex text-center p-20 flex-col items-center">
              <AiOutlinePicture size={54} />
              <p className="flex">No Gallery Photo</p>
            </div>
          </div>
        )}
      </>

      {/* <!-- Upload modal --> */}
      <Modal isOpen={isOpen} onOpen={setIsOpen} title={"Upload Photos"}>
        <ImportGallery closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export default MasonryGallary;
