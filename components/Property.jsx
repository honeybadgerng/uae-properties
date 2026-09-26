import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/images/house.jpg";

const Property = ({ property }) => {
  const {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  } = property;
  const propertyId = externalID || property.id;

  const card = (
    <Flex
      flexWrap="wrap"
      w={["100%", "420px"]}
      maxW="100%"
      p="5"
      paddingTop="0px"
      justifyContent="flex-start"
      cursor={propertyId ? "pointer" : "default"}
    >
      <Box w="full" maxW="100%">
        <Image
          alt={title || "Property"}
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          width={400}
          height={260}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {price != null ? millify(price) : "Price unavailable"}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url}></Avatar>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms}
          <FaBed /> | {baths ?? "-"} <FaBath /> |{" "}
          {area != null ? millify(area) : "-"} sqft <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {title
            ? title.length > 30
              ? title.substring(0, 30) + "..."
              : title
            : "Property details unavailable"}
        </Text>
      </Box>
    </Flex>
  );

  return propertyId ? (
    <Link href={`/property/${propertyId}`} passHref>
      {card}
    </Link>
  ) : (
    card
  );
};

export default Property;
