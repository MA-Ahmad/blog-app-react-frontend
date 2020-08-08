import React from "react";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <NavLink to="/home" className="btn btn-secondary" role="button">
            Blog
          </NavLink>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Box>
          <Heading fontSize="20px" color="gray.600">
            <NavLink to="/new">New</NavLink>
          </Heading>
        </Box>
        <Box ml={3}>
          <Heading fontSize="20px" color="gray.600">
            <NavLink to="/home">List</NavLink>
          </Heading>
        </Box>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Link
          href="https://chakra-ui.com"
          isExternal
          style={{ textDecoration: "none" }}
        >
          <Button leftIcon={FaGithub} bg="transparent" border="1px">
            View Source
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
