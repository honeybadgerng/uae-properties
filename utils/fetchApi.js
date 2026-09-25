import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";
export const bayut16BaseUrl = "https://bayut16.p.rapidapi.com";

const apiError = (message, status = 502) => ({
  ok: false,
  data: null,
  error: message,
  status,
});

export const fetchApi = async (url, apiHost = "bayut.p.rapidapi.com") => {
  if (!process.env.RAPID_API_KEY) {
    return apiError("Property data is temporarily unavailable.", 503);
  }

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "x-rapidapi-host": apiHost,
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

    if ([401, 403, 500, 502, 503].includes(status)) {
      console.error("Bayut API request failed", {
        status,
        code: error.code || "unknown",
      });
      return apiError("Property data is temporarily unavailable.", status);
    }

    console.error("Bayut API request failed", {
      status: status || "network",
      code: error.code || "unknown",
    });

    return apiError("Property data is temporarily unavailable.", 502);
  }
};

const textValue = (value) => {
  if (typeof value === "string") {
    return value;
  }

  return value?.en || value?.name || null;
};

export const normalizeProperty = (property) => {
  if (!property || typeof property !== "object") {
    return null;
  }

  const coverPhoto = property.coverPhoto?.url
    ? { ...property.coverPhoto, url: property.coverPhoto.url }
    : null;

  return {
    id: property.id ?? null,
    externalID:
      property.externalID || property.external_id || property.id || null,
    title: textValue(property.title),
    description: textValue(property.description),
    price: property.price ?? null,
    rentFrequency:
      property.rentFrequency || property.rent_frequency || null,
    rooms: property.rooms ?? null,
    baths: property.baths ?? null,
    area: property.area ?? null,
    type: textValue(property.type),
    purpose: property.purpose ?? null,
    furnishingStatus:
      property.furnishingStatus || property.furnishing_status || null,
    isVerified: property.isVerified ?? property.is_verified ?? null,
    coverPhoto,
    photos: Array.isArray(property.photos) ? property.photos : [],
    location: Array.isArray(property.location) ? property.location : [],
    amenities: Array.isArray(property.amenities)
      ? property.amenities.map((amenity) => ({
          amenities: [{ text: textValue(amenity) }].filter((item) => item.text),
        }))
      : [],
    agency:
      property.agency && typeof property.agency === "object"
        ? {
            id: property.agency.id ?? null,
            name: property.agency.name ?? null,
            logo:
              property.agency.logo && typeof property.agency.logo === "object"
                ? property.agency.logo
                : null,
          }
        : null,
  };
};

export const normalizeProperties = (data) => {
  const properties = Array.isArray(data?.data?.properties)
    ? data.data.properties
    : Array.isArray(data?.properties)
      ? data.properties
      : [];

  return properties.map(normalizeProperty).filter(Boolean);
};
