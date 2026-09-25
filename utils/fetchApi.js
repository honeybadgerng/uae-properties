import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

const apiError = (message, status = 502) => ({
  ok: false,
  data: null,
  error: message,
  status,
});

export const fetchApi = async (url) => {
  if (!process.env.RAPID_API_KEY) {
    return apiError("Property data is temporarily unavailable.", 503);
  }

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "x-rapidapi-host": "bayut.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
    });

    if (!response.data || typeof response.data !== "object") {
      return apiError("Property data is temporarily unavailable.", 502);
    }

    return { ok: true, data: response.data, error: null, status: 200 };
  } catch (error) {
    const status = error.response?.status;

    if (status === 404) {
      return apiError("Property data was not found.", 404);
    }

    if (status === 429) {
      return apiError("Property data is temporarily unavailable.", 429);
    }

    console.error("Bayut API request failed", {
      status: status || "network",
      code: error.code || "unknown",
    });

    return apiError("Property data is temporarily unavailable.", 502);
  }
};
