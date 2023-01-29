import React from "react";
import { motion } from "framer-motion";

function MasonryGallary() {
  return (
    <div className="gap-1 columns-2 md:columns-3 lg:columns-3">
      {/* @ts-ignore */}
      {[...Array(25).keys()].map((image) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-1 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20"
        >
          <img
            className="w-full"
            src={`https://source.unsplash.com/random/${image}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default MasonryGallary;
