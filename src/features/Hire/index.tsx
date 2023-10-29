import React, { useEffect, useState, Fragment } from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import RowCard from "components/RowCard";
import SecondRowCard from "components/SecondRowCard";
import { modelData, recomData } from "../../dummyData"
import ModelCard from "components/ModelCard";

function Hire() {
   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0">
         <Navbar />
         <Banner />
         <div className="flex items-center justify-between mt-5">
            <h1 className="text-md font-bold mb-1">Nearby Models</h1>
            <p className="cursor-pointer base-color underline">View All</p>
         </div>
         <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modelData.map(model => {
               return <ModelCard model={model} />
            })}
         </div>
         <h1 className="text-md font-bold mt-5 mb-1">Recommendations</h1>
         {
            recomData.map((item) => (
               <RowCard models={item} />
            ))
         }

         <h1 className="text-md font-bold mt-5 mb-1">Top Models</h1>
         {
            recomData.map((item) => (
               <SecondRowCard models={item} />
            ))
         }
      </div>
   );
}

export default Hire;
