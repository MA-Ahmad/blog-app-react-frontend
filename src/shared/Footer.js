import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  Input,
  Button,
  Flex
} from "@chakra-ui/core";

const Footer = () => {
  return (
    <Box mt="70px" borderTopColor="gray.900" borderTopWidth={2} p="5em 2em 5em">
      <SimpleGrid
        flexDirection="column-reverse"
        gridTemplateColumns={["1fr", "1fr", "repeat(4, 1fr)", "repeat(4, 1fr)"]}
        justifyItems={["left", "left", "center", "center"]}
        maxW="1300px"
        margin="0 auto"
      >
        <Box d={["block", "block", "none", "none"]} mb="30px">
          {/* <FooterSignup /> */}
          <>
            <Heading
              fontSize="24px"
              mb="15px"
              className="yellow-gradient-color"
            >
              Be the first to know
            </Heading>
            <Text color="gray.400" mb="15px">
              Get notified about the upcoming sessions, news, articles, jobs,
              and opensource projects.
            </Text>

            <form
              method="post"
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSchU6KKhFoSWk_cAgjyRXUh4oNKQQbvO5ZjmDBqrJisA76qIg/formResponse"
            >
              <Box position="relative">
                <Input
                  type="email"
                  isRequired
                  name="entry.1808449400"
                  px="25px"
                  bg="gray.900"
                  height="50px"
                  rounded="50px"
                  _placeholder={{ color: "gray.600" }}
                  placeholder="Enter your email"
                  _focus={{ outline: 0 }}
                  color="gray.100"
                  borderWidth={0}
                />
                <Button
                  type="submit"
                  height="50px"
                  color="gray.100"
                  _hover={{ bg: "yellow.400", color: "gray.900" }}
                  position="absolute"
                  top="0"
                  right="0"
                  bg="gray.700"
                  rounded="50px"
                  px="25px"
                >
                  Subscribe
                </Button>
              </Box>
            </form>
          </>
        </Box>
        <Stack mb={["10px", "10px", 0, 0]}>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Home
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Write a Post
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Tags
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Reading List
            </ChakraLink>
          </Text>
        </Stack>
        <Stack>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Code of Conduct
            </ChakraLink>
          </Text>
          <Text as="span">
            <a>
              <ChakraLink
                _focus={{ outline: "none", boxShadow: "none" }}
                as="span"
                fontWeight={500}
                color="gray.500"
                _hover={{ color: "gray.100", textDecoration: "none" }}
              >
                Join Community
              </ChakraLink>
            </a>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Sponser us
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              FAQs
            </ChakraLink>
          </Text>
        </Stack>
        <Stack mb={["10px", "10px", 0, 0]}>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Home
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Write a Post
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Tags
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Reading List
            </ChakraLink>
          </Text>
        </Stack>
        <Stack>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Code of Conduct
            </ChakraLink>
          </Text>
          <Text as="span">
            <a>
              <ChakraLink
                _focus={{ outline: "none", boxShadow: "none" }}
                as="span"
                fontWeight={500}
                color="gray.500"
                _hover={{ color: "gray.100", textDecoration: "none" }}
              >
                Join Community
              </ChakraLink>
            </a>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              Sponser us
            </ChakraLink>
          </Text>
          <Text as="span">
            <ChakraLink
              _focus={{ outline: "none", boxShadow: "none" }}
              href={""}
              // target={isExternal ? "_blank" : "_self"}
              target={"_blank"}
              fontWeight={500}
              color="gray.500"
              _hover={{ color: "gray.100", textDecoration: "none" }}
            >
              FAQs
            </ChakraLink>
          </Text>
        </Stack>
      </SimpleGrid>
      <Flex justifyContent="center">
        <Text mt="20px" color="gray.500">
          Made with 🧡 by{" "}
          <ChakraLink
            _focus={{ boxShadow: "none", outline: "none" }}
            target="_blank"
            href={""}
            fontWeight={600}
            color={"gray.400"}
            _hover={{ textDecoration: "none", color: "yellow.400" }}
          >
            Muhammad Ahmad
          </ChakraLink>{" "}
          in Lahore, Pakistan
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
