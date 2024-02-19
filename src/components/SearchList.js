import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Select from "@mui/material/Select";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CustomPagination from "./CustomPagination";
const SearchList = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountries(response.data);
        setLoading(false);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(true);

        // setLoading(true);
      }
    };

    fetchData();
  }, []);
   useEffect(() => {
     const fetchCountries = async () => {
       try {
         const response = await axios.get(`https://restcountries.com/v2/all`);
         const data = response.data;
         const pageSize = 10; // Sayfa başına görüntülenecek ülke sayısı

         // Toplam sayfa sayısını hesapla
         setTotalPages(Math.ceil(data.length / pageSize));

         // Görüntülenecek ülkeleri belirle
         const startIndex = (page - 1) * pageSize;
         const endIndex = startIndex + pageSize;
         const countriesToDisplay = data.slice(startIndex, endIndex);

         // Ülkeleri state'e kaydet
         setCountries(countriesToDisplay);
       } catch (error) {
         console.error("Error fetching countries:", error);
       }
     };

     fetchCountries();
   }, [page]);
   
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

 const filteredCountries = countries.filter((country) => {
   const countryName = country?.name || ""; // Eğer isim yoksa boş bir string olarak ayarla
   const countryCapital = country?.capital || ""; // Eğer başkent yoksa boş bir string olarak ayarla

   const matchesSearchTerm =
     (typeof countryName === "string" &&
       countryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (typeof countryCapital === "string" &&
       countryCapital.toLowerCase().includes(searchTerm.toLowerCase()));

   const matchesRegion =
     selectedRegion === "" || country.region === selectedRegion;

   return matchesSearchTerm && matchesRegion;
 });


  const LoadingSearch = () => {
    return (
      <div className="lg:px-28 md:px-20 px-5">
        <div className="flex flex-col gap-5 ">
          <Skeleton
            variant="rectangular"
            className="rounded-lg dark:bg-gray-600"
            height={50}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg dark:bg-gray-600 sm:hidden md:hidden lg:hidden"
            height={50}
          />
        </div>
      </div>
    );
  };
  const Loading = () => {
    return (
      <div className="lg:px-28 md:px-20 px-5 py-5">
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
    <div className="search-list container-xxl mx-auto">
      {loading ? (
        <LoadingSearch />
      ) : (
        <div className="lg:px-28 md:px-20 px-5 pb-5 sm:flex md:flex lg:flex flex-wrap items-center gap-2">
          <div className="search-bar cursor-pointer select-none flex-1">
            <div className="relative">
              <input
                type="text"
                className="dark:border-none w-full rounded-lg px-10 py-2 p-2 focus:outline-none"
                placeholder="Search Countries.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="SearchBarIconBox absolute left-3 top-3 flex flex-col justify-center">
                <CiSearch
                  size={20}
                  className="text-gray-500 dark:text-gray-300"
                />
              </div>
            </div>
          </div>
          <div className="selectOpt py-5">
            <FormControl
              className="selectBar w-full font-bold rounded-lg"
              sx={{ minWidth: 150 }}
              size="small"
            >
              <InputLabel
                id="demo-select-small-label"
                className="focus:outline-none dark:border-none text-gray-400 font-bold"
              >
                Region
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedRegion}
                label="Region"
                onChange={handleChange}
                className="rounded-lg"
                style={{ height: "44px" }}
              >
                <MenuItem value="">
                  <em>All Regions</em>
                </MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      {/* Burada filteredCountries'ı kullanarak ülkeleri göster */}
      {loading ? (
        <Loading />
      ) : (
        <div className="country-list">
          {filteredCountries.map((country) => (
            <div
              className="lg:px-28 md:px-20 px-5 pb-5"
              key={country.alpha3Code}
            >
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
            </div>
          ))}
          <div className="lg:px-28 md:px-20 px-5 pb-5 flex justify-center ">
            <Stack spacing={2} mt={3} justifyContent="center">
              {/* <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                // boundaryCount={0}
                // siblingCount={1}
              /> */}
              <CustomPagination
                totalPages={totalPages}
                currentPage={page}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
