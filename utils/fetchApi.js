import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "471ebba5a3msh9dfc2c3ed197ed0p17f530jsn08c32a7440c6",
    },
  });

  return data;
};
