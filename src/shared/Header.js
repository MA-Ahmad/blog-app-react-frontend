import React, { useContext, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Link,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Text
} from "@chakra-ui/core";
import { NavLink, Link as ReachLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AiOutlineGithub, AiOutlineLogout } from "react-icons/ai";
import { RiAccountBoxLine } from "react-icons/ri";
import "../App.css";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../utils/Cons/Constants";

const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const authContext = useContext(AuthContext);

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
        {authContext.isAuth ? (
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
          {authContext.isAuth ? (
            <Box ml={{ sm: "0", md: "3" }}>
              <Menu>
                <MenuButton outline="none">
                  <Avatar src={`${baseUrl}${authContext.user.image_url}`}>
                    <AvatarBadge size="1.25em" bg="green.500" />
                  </Avatar>
                </MenuButton>
                <MenuList color="#000">
                  <MenuGroup
                    title={
                      authContext.user.name ? authContext.user.name : "Profile"
                    }
                  >
                    <Link
                      as={ReachLink}
                      to="/profile"
                      _hover={{ textDecoration: "none" }}
                    >
                      <MenuItem>
                        <RiAccountBoxLine />
                        <Text as="span" pl={2}>
                          My Account
                        </Text>
                      </MenuItem>
                    </Link>

                    <Link
                      href="https://github.com/MA-Ahmad/blog-app-react-frontend"
                      isExternal
                      style={{ textDecoration: "none" }}
                      _hover={{ color: "black" }}
                    >
                      <MenuItem>
                        <AiOutlineGithub />
                        <Text as="span" pl={2}>
                          View Source
                        </Text>
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={() => authContext.logout(props.history)}>
                    <AiOutlineLogout />
                    <Text as="span" pl={2}>
                      Signout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <>
              <Box ml={{ sm: "0", md: "3" }}>
                <Heading fontSize="20px">
                  <NavLink exact to="/login" activeClassName="active">
                    Login
                  </NavLink>
                </Heading>
              </Box>
              <Box ml={{ sm: "0", md: "3" }}>
                <Heading fontSize="20px">
                  <NavLink exact to="/register" activeClassName="active">
                    Signup
                  </NavLink>
                </Heading>
              </Box>
            </>
          )}
        </Box>
        {!authContext.isAuth ? (
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
        ) : (
          ""
        )}
      </Box>
    </Flex>
  );
};

export default Header;
