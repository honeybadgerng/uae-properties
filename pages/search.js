import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import {
  bayut16BaseUrl,
  fetchApi,
  normalizeProperties,
} from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";

const Search = ({ properties, error }) => {
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
        Properties {router.query.purpose}
      </Text>
      {error && (
        <Text color="gray.600" px="4">
          {error}
        </Text>
      )}
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="No properties found" width={300} height={200} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
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
    page: "1",
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

  if (purpose === "for-rent") {
    params.set("rent_frequency", rentFrequency);
  }

  const sortOrder = {
    "price-asc": "lowest_price",
    "price-des": "highest_price",
    "date-asc": "latest",
    "date-desc": "popular",
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
    },
  };
}

export default Search;
