import React, { useEffect, useState, Fragment } from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import RowCard from "components/RowCard";
import SecondRowCard from "components/SecondRowCard";
import { recomData } from "../../dummyData"

function Dashboard() {
   return (
      <div className="ml-[5rem] text-gray-700 md:ml-[17rem] relative min-h-screen px-6 py-4 w-[100%] my-0">
         <Navbar />
         <Banner />
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

export default Dashboard;
