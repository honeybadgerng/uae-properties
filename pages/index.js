import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import Property from "../components/Property";
import {
  bayut16BaseUrl,
  fetchApi,
  normalizeProperties,
} from "../utils/fetchApi";

const needs = [
  {
    id: "short-stay",
    label: "Short stay",
    description: "I'm visiting for days or weeks",
    prompt: "What kind of stay do you have in mind?",
    example:
      "I'm visiting Dubai for 12 days and need a furnished 2-bedroom apartment.",
  },
  {
    id: "long-term-rental",
    label: "Long-term rental",
    description: "I'm looking for a place to rent",
    prompt: "What would you like in a rental?",
    example: "I'm looking for a 2-bedroom apartment for a year.",
  },
  {
    id: "buy",
    label: "Buy",
    description: "I'm exploring a home to purchase",
    prompt: "What are you hoping to buy?",
    example: "I'm looking to buy a 2-bedroom apartment in Dubai.",
  },
  {
    id: "not-sure",
    label: "Not sure / need help",
    description: "I could use a place to start",
    prompt: "Tell us what matters to you so far.",
    example:
      "I'm not sure which area is right for me, but I'd like to be near the beach.",
  },
];

export default function Home({
  propertiesForSale,
  propertiesForRent,
  saleError,
  rentError,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [description, setDescription] = useState("");
  const selectedNeedDetails = needs.find((need) => need.id === selectedNeed);

  return (
    <Box>
      <Box
        as="section"
        aria-labelledby="home-hero-title"
        mx={["3", "6", "10"]}
        mt={["4", "6"]}
        borderRadius="2xl"
        border="1px solid rgba(255, 255, 255, 0.12)"
        color="#F9FAFB"
        backgroundImage="radial-gradient(circle at 90% 0%, rgba(212, 175, 55, 0.16), transparent 38%), linear-gradient(135deg, #0B0F19 0%, #171B26 100%)"
      >
        <Flex
          maxW="1280px"
          mx="auto"
          px={["5", "8", "12"]}
          py={["10", "14"]}
          direction="column"
          alignItems="flex-start"
        >
          <Text
            color="#EED888"
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="0.12em"
          >
            DUBAI STAY &amp; PROPERTY CONCIERGE
          </Text>
          <Heading
            id="home-hero-title"
            as="h1"
            mt="4"
            maxW="760px"
            fontSize={["4xl", "5xl", "6xl"]}
            lineHeight="1.08"
          >
            Your Dubai stay, sorted.
          </Heading>
          <Text
            mt="5"
            maxW="680px"
            color="gray.200"
            fontSize={["md", "lg"]}
            lineHeight="1.7"
          >
            Whether you&apos;re visiting, looking to rent long-term, or thinking
            of buying, start with what you need. You don&apos;t have to know the
            right area or property type before you begin.
          </Text>
          <Button
            onClick={onOpen}
            mt="7"
            minH="52px"
            w={["full", "auto"]}
            px="7"
            bg="#D4AF37"
            color="#0B0F19"
            fontSize="lg"
            fontWeight="bold"
            borderRadius="xl"
            _hover={{ bg: "#EED888" }}
            _focusVisible={{ outline: "3px solid #EED888", outlineOffset: "3px" }}
          >
            Tell us what you need
          </Button>
          <Box
            as="nav"
            aria-label="Browse property listings"
            mt="8"
            w="full"
          >
            <Text color="gray.300" fontSize="sm" mb="3">
              Prefer to browse?
            </Text>
            <Flex gap="3" wrap="wrap">
              <Button
                as={Link}
                href="/search?purpose=for-rent"
                minH="44px"
                w={["full", "auto"]}
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.28)"
                color="white"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
              >
                Rent
              </Button>
              <Button
                as={Link}
                href="/search?purpose=for-sale"
                minH="44px"
                w={["full", "auto"]}
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.28)"
                color="white"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
              >
                Buy
              </Button>
              <Button
                as={Link}
                href="/search"
                minH="44px"
                w={["full", "auto"]}
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.28)"
                color="white"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
              >
                Search properties
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay bg="rgba(5, 8, 14, 0.76)" />
        <ModalContent
          mx="4"
          maxH="calc(100vh - 2rem)"
          bg="#0F131D"
          color="#F9FAFB"
          border="1px solid rgba(255, 255, 255, 0.15)"
          borderRadius="2xl"
        >
          <ModalHeader pr="12">What are you looking for?</ModalHeader>
          <ModalCloseButton
            aria-label="Close requirement dialog"
            minW="44px"
            minH="44px"
          />
          <ModalBody>
            <Text color="gray.300" mb="4">
              Choose whichever feels closest. You can add a few details in your
              own words.
            </Text>
            <SimpleGrid columns={[1, 2]} spacing="3">
              {needs.map((need) => {
                const isSelected = selectedNeed === need.id;

                return (
                  <Button
                    key={need.id}
                    onClick={() => setSelectedNeed(need.id)}
                    aria-pressed={isSelected}
                    h="auto"
                    minH="72px"
                    w="full"
                    px="4"
                    py="3"
                    whiteSpace="normal"
                    textAlign="left"
                    justifyContent="flex-start"
                    variant="outline"
                    bg={isSelected ? "#D4AF37" : "#171B26"}
                    color={isSelected ? "#0B0F19" : "#F9FAFB"}
                    borderColor={
                      isSelected ? "#D4AF37" : "rgba(255, 255, 255, 0.15)"
                    }
                    _hover={{
                      bg: isSelected ? "#EED888" : "#262A35",
                    }}
                  >
                    <Box>
                      <Text fontWeight="bold">{need.label}</Text>
                      <Text
                        mt="1"
                        fontSize="sm"
                        color={isSelected ? "#3C2F00" : "gray.300"}
                      >
                        {need.description}
                      </Text>
                    </Box>
                  </Button>
                );
              })}
            </SimpleGrid>
            {selectedNeedDetails && (
              <Box mt="5">
                <Text as="label" htmlFor="requirement-description" mb="2">
                  {selectedNeedDetails.prompt}
                </Text>
                <Textarea
                  id="requirement-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder={selectedNeedDetails.example}
                  minH="120px"
                  mt="2"
                  bg="#171B26"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  _placeholder={{ color: "#9CA3AF" }}
                  _focusVisible={{
                    borderColor: "#D4AF37",
                    boxShadow: "0 0 0 1px #D4AF37",
                  }}
                />
                <Text role="status" mt="3" color="gray.300" fontSize="sm">
                  Your note stays on this page for now. It isn&apos;t sent or
                  saved.
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              minH="44px"
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.28)"
              color="white"
              _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        as="section"
        aria-labelledby="rentals-title"
        maxW="1280px"
        mx="auto"
        px={["3", "6", "10"]}
        mt={["10", "14"]}
      >
        <Flex
          justifyContent="space-between"
          alignItems={["flex-start", "center"]}
          direction={["column", "row"]}
          gap="3"
          mb="4"
        >
          <Box>
            <Heading id="rentals-title" as="h2" fontSize={["2xl", "3xl"]}>
              Explore homes for rent
            </Heading>
            <Text mt="1" color="gray.600">
              Browse current rental listings.
            </Text>
          </Box>
          <Button
            as={Link}
            href="/search?purpose=for-rent"
            minH="44px"
            colorScheme="blue"
            variant="outline"
          >
            Explore rentals
          </Button>
        </Flex>
        {rentError && (
          <Text color="gray.600" px="10">
            {rentError}
          </Text>
        )}
        <Flex flexWrap="wrap">
          {propertiesForRent.map((property, index) => (
            <Property
              property={property}
              key={property.externalID || property.id || index}
            />
          ))}
        </Flex>
        {!rentError && propertiesForRent.length === 0 && (
          <Text color="gray.600" px="10">
            No rental properties are currently available.
          </Text>
        )}
      </Box>

      <Box
        as="section"
        aria-labelledby="sales-title"
        maxW="1280px"
        mx="auto"
        px={["3", "6", "10"]}
        mt={["10", "14"]}
      >
        <Flex
          justifyContent="space-between"
          alignItems={["flex-start", "center"]}
          direction={["column", "row"]}
          gap="3"
          mb="4"
        >
          <Box>
            <Heading id="sales-title" as="h2" fontSize={["2xl", "3xl"]}>
              Explore homes for sale
            </Heading>
            <Text mt="1" color="gray.600">
              Browse current properties for sale.
            </Text>
          </Box>
          <Button
            as={Link}
            href="/search?purpose=for-sale"
            minH="44px"
            colorScheme="blue"
            variant="outline"
          >
            Explore buying
          </Button>
        </Flex>
        {saleError && (
          <Text color="gray.600" px="10">
            {saleError}
          </Text>
        )}
        <Flex flexWrap="wrap">
          {propertiesForSale.map((property, index) => (
            <Property
              property={property}
              key={property.externalID || property.id || index}
            />
          ))}
        </Flex>
        {!saleError && propertiesForSale.length === 0 && (
          <Text color="gray.600" px="10">
            No sale properties are currently available.
          </Text>
        )}
      </Box>
    </Box>
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
        propertyForSale.ok ? normalizeProperties(propertyForSale.data) : [],
      propertiesForRent:
        propertyForRent.ok ? normalizeProperties(propertyForRent.data) : [],
      saleError: propertyForSale.ok ? null : propertyForSale.error,
      rentError: propertyForRent.ok ? null : propertyForRent.error,
    },
    revalidate: 300,
  };
}
