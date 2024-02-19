"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../assets/CountryList.css";
import SearchList from "./SearchList";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);
  const LoadingSearch = () => {
    return (
      <div className="lg:px-28 md:px-20 px-5">
        <div className="flex flex-col gap-5">
          <Skeleton
            variant="rectangular"
            className="rounded-lg dark:bg-gray-600"
            height={50}
          />
        </div>
      </div>
    );
  };
   const Loading = () => {
     return (
       <div className="lg:px-28 md:px-20 px-5">
         <div className="flex flex-col gap-5">
           <Skeleton
             variant="rectangular"
             className="rounded-lg dark:bg-gray-600"
             height={100}
           />
           <Skeleton
             variant="rectangular"
             className="rounded-lg dark:bg-gray-600"
             height={100}
           />
           <Skeleton
             variant="rectangular"
             className="rounded-lg dark:bg-gray-600"
             height={100}
           />
           <Skeleton
             variant="rectangular"
             className="rounded-lg dark:bg-gray-600"
             height={100}
           />
           <Skeleton
             variant="rectangular"
             className="rounded-lg dark:bg-gray-600"
             height={100}
           />
         </div>
       </div>
     );
   };
  return (
    <>
      <section id="searchList">
        <div className="py-5">
          {loading ? <LoadingSearch /> : <SearchList />}
        </div>
      </section>
      <section id="countryList">
        {loading ? (
          <Loading />
        ) : (
          <div className="lg:px-28 md:px-20 px-5 space-y-4">
            {countries.map((country) => (
              <div
                key={country.alpha3Code}
                className="country-box p-3 rounded-lg shadow-md hover:shadow-lg"
              >
                <Link
                  href="/country/[id]"
                  as={`/country/${country.alpha3Code}`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 items-center justify-between">
                    <div className="col-span-3 sm:col-span-1 md:col-span-1 lg:col-span-1">
                      <div className="flex items-center">
                        <div>
                          <img
                            src={country.flag}
                            className="w-10 h-1o object-contain"
                            alt=""
                          />
                        </div>

                        <p className="ml-3">{country.name}</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div>
                        <p>Region</p>
                        <p className="text-gray-400">{country.region}</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div>
                        <p>Area</p>
                        <p className="text-gray-400">{country.area}</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div>
                        <p>Population</p>
                        <p className="text-gray-400">
                          {country.population.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CountryList;
