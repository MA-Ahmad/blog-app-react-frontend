import React from "react";
import { Box, Image, Badge, Flex, SimpleGrid } from "@chakra-ui/core";
import Dotdotdot from "react-dotdotdot";

const Home = () => {
  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      my="auto"
      paddingTop="20px"
      paddingBottom="20px"
    >
      <SimpleGrid columns={3} spacing="15px">
        <Box
          maxW="sm"
          borderWidth="1px"
          shadow="md"
          rounded="lg"
          overflow="hidden"
        >
          <Image src="https://bit.ly/2Z4KKcF" alt="Blog image" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" variantColor="teal">
                New
              </Badge>
              <Box
                fontWeight="semibold"
                as="h2"
                letterSpacing="wide"
                textTransform="uppercase"
                ml="2"
              >
                Hi I'm title of this blog
              </Box>
            </Box>

            <Dotdotdot clamp={3}>
              <Box
                mt="1"
                fontWeight="semibold"
                as="p"
                lineHeight="tight"
                color="gray.600"
                fontSize="sm"
              >
                Modern home in city center in the heart of historic Los Angeles
                sfsfsdf sdfsdf sdfsdfsf Modern home in city center in the heart
                of historic Los Angeles sfsfsdf sdfsdf sdfsdfsf
              </Box>
            </Dotdotdot>
          </Box>
        </Box>

        <Box
          maxW="sm"
          shadow="md"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Image src="https://bit.ly/2Z4KKcF" alt="Blog image" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" variantColor="teal">
                New
              </Badge>
              <Box
                fontWeight="semibold"
                as="h2"
                letterSpacing="wide"
                textTransform="uppercase"
                ml="2"
              >
                Hi I'm title of this blog
              </Box>
            </Box>

            <Dotdotdot clamp={3}>
              <Box
                mt="1"
                fontWeight="semibold"
                as="p"
                lineHeight="tight"
                color="gray.600"
                fontSize="sm"
              >
                Modern home in city center in the heart of historic Los Angeles
                sfsfsdf sdfsdf sdfsdfsf Modern home in city center in the heart
                of historic Los Angeles sfsfsdf sdfsdf sdfsdfsf
              </Box>
            </Dotdotdot>
          </Box>
        </Box>

        <Box
          maxW="sm"
          shadow="md"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Image src="https://bit.ly/2Z4KKcF" alt="Blog image" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" variantColor="teal">
                New
              </Badge>
              <Box
                fontWeight="semibold"
                as="h2"
                letterSpacing="wide"
                textTransform="uppercase"
                ml="2"
              >
                Hi I'm title of this blog
              </Box>
            </Box>

            <Dotdotdot clamp={3}>
              <Box
                mt="1"
                fontWeight="semibold"
                as="p"
                lineHeight="tight"
                color="gray.600"
                fontSize="sm"
              >
                Modern home in city center in the heart of historic Los Angeles
                sfsfsdf sdfsdf sdfsdfsf Modern home in city center in the heart
                of historic Los Angeles sfsfsdf sdfsdf sdfsdfsf
              </Box>
            </Dotdotdot>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
