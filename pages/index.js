import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Property from "../components/Property";
import {
  bayut16BaseUrl,
  fetchApi,
  normalizeProperties,
} from "../utils/fetchApi";

export const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} alt={purpose} width={500} height={300} />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Link href={linkName}>
        <Button fontSize="xl" bg="blue.300" color="white">
          {buttonText}
        </Button>
      </Link>
    </Box>
  </Flex>
);

export default function Home({
  propertiesForSale,
  propertiesForRent,
  error,
}) {
  return (
    <div>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1=" Explore from Apartments, builder floors, villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      {/* Fetch the properties for rent and map over them  */}
      {error && (
        <Text color="gray.600" px="10">
          {error}
        </Text>
      )}
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      {/* Fetch the properties for sale and map over them  */}
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </div>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${bayut16BaseUrl}/search-property?purpose=for-sale`,
    "bayut16.p.rapidapi.com"
  );
  const propertyForRent = await fetchApi(
    `${bayut16BaseUrl}/search-property?purpose=for-rent`,
    "bayut16.p.rapidapi.com"
  );

  return {
    props: {
      propertiesForSale:
        propertyForSale.ok && Array.isArray(propertyForSale.data?.hits)
          ? normalizeProperties(propertyForSale.data)
          : [],
      propertiesForRent:
        propertyForRent.ok && Array.isArray(propertyForRent.data?.hits)
          ? normalizeProperties(propertyForRent.data)
          : [],
      error: propertyForSale.ok && propertyForRent.ok
        ? null
        : "Properties are temporarily unavailable. Please try again.",
    },
    revalidate: 300,
  };
}
