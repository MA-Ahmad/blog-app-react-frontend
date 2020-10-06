import React, { useContext } from "react";
import { Box, Heading, Flex, Button, Link } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "../App.css";
import BlogContext from "../context/blog-context";

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const context = useContext(BlogContext);

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
          <NavLink exact to="/" activeClassName="active">
            Blogs
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
        {context.isAuth ? (
          <Box>
            <Heading fontSize="20px">
              <NavLink to="/new" activeClassName="active">
                New
              </NavLink>
            </Heading>
          </Box>
        ) : (
          ""
        )}

        {/* <Box ml={{ sm: "0", md: "3" }}>
          <Heading fontSize="20px">
            <NavLink exact to="/" activeClassName="active">
              List
            </NavLink>
          </Heading>
        </Box> */}
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        alignItems="center"
        mt={{ base: 4, md: 0 }}
      >
        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mr={5}
        >
          {context.isAuth ? (
            <Box ml={{ sm: "0", md: "3" }}>
              <Heading
                fontSize="20px"
                onClick={() => context.logout()}
                cursor="pointer"
              >
                Sign Out
              </Heading>
            </Box>
          ) : (
            <>
              <Box ml={{ sm: "0", md: "3" }}>
                <Heading fontSize="20px">
                  <NavLink exact to="/login" activeClassName="active">
                    Sign In
                  </NavLink>
                </Heading>
              </Box>
              <Box ml={{ sm: "0", md: "3" }}>
                <Heading fontSize="20px">
                  <NavLink exact to="/register" activeClassName="active">
                    Sign Up
                  </NavLink>
                </Heading>
              </Box>
            </>
          )}
        </Box>
        <Link
          href="https://github.com/MA-Ahmad/blog-app-react-frontend"
          isExternal
          style={{ textDecoration: "none" }}
          _hover={{ color: "black" }}
        >
          <Button
            leftIcon={FaGithub}
            bg="transparent"
            border="1px"
            mt={{ sm: "2", md: "0" }}
          >
            View Source
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
