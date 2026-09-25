import { Box, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import {
  bayut16BaseUrl,
  fetchApi,
  normalizeProperty,
} from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails,
  error,
}) => {
  if (error || !propertyDetails) {
    return (
      <Box maxWidth="1000px" margin="auto" p="4">
        <Text color="gray.600">
          {error || "Property details are temporarily unavailable."}
        </Text>
      </Box>
    );
  }

  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities = [],
    photos = [],
    externalID,
  } = propertyDetails;

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {Array.isArray(photos) && photos.length > 0 && (
        <ImageScrollbar data={photos} />
      )}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            Property ID: {externalID}
          </Text>
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {price != null ? millify(price) : "Price unavailable"}{" "}
            {rentFrequency && `/${rentFrequency}`}
          </Text>

          <Spacer />
          <Avatar size="sm" src={agency?.logo?.url}></Avatar>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms ?? "-"}
          <FaBed /> | {baths ?? "-"} <FaBath /> |{" "}
          {area != null ? millify(area) : "-"} sqft <BsGridFill />
        </Flex>
      </Box>
      <Box marginTop="2">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
          {title || "Property title unavailable"}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description || "Property description unavailable."}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type || "-"}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose || "-"}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus || "-"}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {Array.isArray(amenities) && amenities.length > 0 && (
          <Text fontSize="2xl" fontWeight="black" marginTop="5">
            Facilites:
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities.map((item) =>
            item?.amenities?.map((amenity) => (
              <Text
                key={amenity.text}
                fontWeight="bold"
                color="blue.400"
                fontSize="l"
                p="2"
                bg="gray.200"
                m="1"
                borderRadius="5"
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
      <Box color="gray.600">
        Contact actions are temporarily unavailable. Please use the property ID
        when contacting us through the configured internal channel.
      </Box>
      <Flex justify="space-between" mt="4">
        <Button colorScheme="green" isDisabled>
          WhatsApp
        </Button>
        <Button colorScheme="blue" isDisabled>
          Call Now
        </Button>
        <Button colorScheme="orange" isDisabled>
          Send Email
        </Button>
      </Flex>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(
    `${bayut16BaseUrl}/property-details?external_id=${encodeURIComponent(id)}`,
    "bayut16.p.rapidapi.com"
  );

  return {
    props: {
      propertyDetails:
        data.ok && data.data?.data && !Array.isArray(data.data.data)
          ? normalizeProperty(data.data.data)
          : null,
      error: data.error,
    },
  };
}
