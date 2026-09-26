import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon, Button } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import {
  bayut16BaseUrl,
  fetchApi,
  normalizeProperties,
} from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";

const PAGE_SIZE = 24;

const Search = ({ properties, error, purpose, page }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {purpose}
      </Text>
      {error && (
        <Text color="gray.600" px="4">
          {error}
        </Text>
      )}
      <Flex flexWrap="wrap">
        {properties.map((property, index) => (
          <Property
            property={property}
            key={property.externalID || property.id || index}
          />
        ))}
      </Flex>
      {!error && properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="No properties found" width={300} height={200} />
          <Text fontSize="xl" marginTop="3">
            No properties match your search.
          </Text>
        </Flex>
      )}
      {!error && (
        <Flex justifyContent="center" alignItems="center" gap="3" p="4">
          <Button
            isDisabled={page <= 1}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page: String(page - 1) },
              })
            }
          >
            Previous
          </Button>
          <Text>Page {page}</Text>
          <Button
            isDisabled={properties.length < PAGE_SIZE}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page: String(page + 1) },
              })
            }
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = Array.isArray(query.purpose)
    ? query.purpose[0] || "for-rent"
    : query.purpose || "for-rent";
  const requestedPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const parsedPage = Number.parseInt(requestedPage || "1", 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const params = new URLSearchParams({
    purpose,
    page: String(page),
    price_min: minPrice,
    price_max: maxPrice,
    area_max: areaMax,
    location_ids: locationExternalIDs,
  });

  const propertyType = {
    "4": "apartments",
    "16": "townhouses",
    "3": "villas",
    "18": "penthouse",
    "21": "hotel-apartments",
    "19": "villa-compound",
    "14": "residential-plots",
    "12": "residential-floors",
    "17": "residential-building",
  }[categoryExternalID];

  if (propertyType) {
    params.set("property_type", propertyType);
  }

  if (roomsMin !== "0") {
    params.set("rooms", roomsMin);
  }

  if (bathsMin !== "0") {
    params.set("baths", bathsMin);
  }

  const furnishingStatus = query.furnishingStatus;
  if (furnishingStatus === "furnished" || furnishingStatus === "unfurnished") {
    params.set("is_furnished", furnishingStatus);
  }

  if (purpose === "for-rent") {
    params.set("rent_frequency", rentFrequency);
  }

  const sortOrder = {
    "price-asc": "lowest_price",
    "price-des": "highest_price",
    "date-asc": "latest",
    "verified-score": "verified",
  }[sort];

  if (sortOrder) {
    params.set("sort_order", sortOrder);
  }

  const data = await fetchApi(
    `${bayut16BaseUrl}/search-property?${params.toString()}`,
    "bayut16.p.rapidapi.com"
  );

  return {
    props: {
      properties: data.ok ? normalizeProperties(data.data) : [],
      error: data.ok ? null : data.error,
      purpose,
      page,
    },
  };
}

export default Search;
