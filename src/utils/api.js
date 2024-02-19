// utils/api.js

import axios from "axios";

export const getCountriesByPage = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/all?page=${page}&pageSize=${pageSize}`
    );
    console.log(response,'sasasasa' );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
