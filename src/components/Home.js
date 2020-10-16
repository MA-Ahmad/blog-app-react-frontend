import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Flex,
  Tag,
  Avatar,
  Image,
  Stack,
  Heading,
  Text,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/core";

import { FiBookmark, FiGithub } from "react-icons/fi";
import Dotdotdot from "react-dotdotdot";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PageLoader from "./PageLoader";
import { baseUrl } from "../utils/Cons/Constants";
import { RiHeart2Line } from "react-icons/ri";
import { BsBookmarkPlus, BsFilePost } from "react-icons/bs";
import { FcAbout, FcRules, FcPrivacy } from "react-icons/fc";
import { FaTags } from "react-icons/fa";
import ahoy from "ahoy.js";

ahoy.configure({
  urlPrefix: "",
  visitsUrl: `${baseUrl}/ahoy/visits`,
  eventsUrl: `${baseUrl}/ahoy/events`,
  withCredentials: true
});

const Home = () => {
  const context = useContext(BlogContext);
  const authContext = useContext(AuthContext);
  const [tags, setTags] = useState(["ruby", "rails", "react", "formik"]);

  useEffect(() => {
    ahoy.trackAll();
    context.fetchBlogs();
  }, []);

  return (
    <>
      {context.blogs ? (
        <Flex
          maxWidth="1200px"
          margin="0 auto"
          p="20px"
          display={{ sm: "block", md: "flex" }}
          justifyContent="center"
        >
          <Box
            width={{ base: 1, sm: "100%", md: "30%" }}
            m={{ base: "0 auto" }}
            height="max-content"
            display={{ sm: "none", md: "block", lg: "block" }}
            rounded="md"
            p={"12px"}
            mx={2}
          >
            <Stack isInline spacing={3} align="center">
              <Avatar
                size="lg"
                src={
                  authContext.isAuth && `${baseUrl}${authContext.user.image}`
                }
              ></Avatar>
              <Box>
                <Heading as="h1" size="md">
                  {authContext.isAuth && authContext.user.name}
                </Heading>
                <Text fontSize="xs">@m_ahmad</Text>
              </Box>
            </Stack>
            <List mt={2}>
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                padding={2}
                fontWeight="500"
              >
                <ListIcon icon={BsFilePost} color="rgb(33, 150, 243)" />
                My Posts
              </ListItem>
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                padding={2}
                fontWeight="500"
              >
                <ListIcon icon={FaTags} color="rgb(33, 150, 243)" />
                My Tags
              </ListItem>
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                padding={2}
                fontWeight="500"
              >
                <ListIcon icon={FcAbout} />
                About
              </ListItem>
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                padding={2}
                fontWeight="500"
              >
                <ListIcon icon={FcRules} />
                Terms
              </ListItem>
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                padding={2}
                fontWeight="500"
              >
                <ListIcon icon={FcPrivacy} />
                Privay Policy
              </ListItem>
            </List>
          </Box>

          <Box
            width={{ base: 1, sm: "35rem", md: "50rem", lg: "60rem" }}
            mx={2}
            m={{ sm: "0 auto" }}
          >
            <Stack spacing={2}>
              {context.blogs.map(blog => {
                return (
                  <Box
                    p={5}
                    isExternal
                    as={Link}
                    to={`/blogs/${blog.id}`}
                    _hover={{ shadow: "md", textDecoration: "none" }}
                    cursor="pointer"
                    borderWidth="1px"
                    bg="gray.50"
                    position="relative"
                    rounded="md"
                  >
                    {blog.image && (
                      <Image
                        src={blog.image && `${baseUrl}${blog.image}`}
                        fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
                        alt="Blog image"
                        w="100%"
                        objectFit="cover"
                        borderRadius="5px 5px 0 0"
                        style={{
                          height: "30vh"
                        }}
                      />
                    )}
                    <Stack isInline justifyContent="space-between" mt={2}>
                      <Box width="100%">
                        <Stack isInline align="center" marginBottom="0">
                          <Avatar
                            src={blog.user && `${baseUrl}${blog.user.image}`}
                            size="sm"
                          ></Avatar>
                          <Box>
                            <Heading as="h1" size="sm">
                              {/* {blog.user.name} */}
                              Ali Umar
                            </Heading>
                            <Text fontSize="xs">9 Oct</Text>
                          </Box>
                        </Stack>
                        <Box pl="2.5em">
                          <Heading fontSize="xl">{blog.title}</Heading>
                          <Stack
                            spacing={2}
                            mt={1}
                            isInline
                            alignItems="center"
                          >
                            {tags.map(tag => (
                              <Tag
                                size="sm"
                                padding="0 3px"
                                key={tag}
                                color="#4299E1"
                                // bgColor={`mode.${colorMode}.tagBG`}
                              >
                                {tag}
                              </Tag>
                            ))}
                            <div
                              style={{
                                marginLeft: "5px",
                                paddingBottom: "3px"
                              }}
                            >
                              <Tooltip label="Source Code" placement="right">
                                <IconButton
                                  aria-label="Github Link"
                                  size="lg"
                                  icon={() => <FiGithub />}
                                  // color={`mode.${colorMode}.text`}
                                  variant="unstyled"
                                  height="auto"
                                  minWidth="auto"
                                  // onClick={e => openUrl(e, github_url)}
                                />
                              </Tooltip>
                            </div>
                          </Stack>
                          <Dotdotdot clamp={2}>
                            <Box
                              mt={2}
                              fontWeight="semibold"
                              as="p"
                              lineHeight="tight"
                              color="gray.600"
                              fontSize="sm"
                            >
                              {blog.content}
                            </Box>
                          </Dotdotdot>
                        </Box>
                      </Box>
                      <Box>
                        {/* <Box
                            as={FiBookmark}
                            size="25px"
                            width="1.5rem"
                            height="1.5rem"
                            // position="absolute"
                            color="#cbd5e0"
                            // fill={`mode.${colorMode}.background`}
                            right="0.5rem"
                            top="2px"
                            marginBottom="1rem"
                          /> */}
                        <Stack spacing={5} align="center">
                          <IconButton
                            aria-label="like icon"
                            size="sm"
                            isRound={true}
                            icon={() => <RiHeart2Line />}
                            variantColor="red"
                            variant="outline"
                            isRound={true}
                          />
                          <IconButton
                            aria-label="like icon"
                            // fontSize="20px"
                            size="sm"
                            isRound={true}
                            icon={() => <BsBookmarkPlus />}
                            variantColor="red"
                            variant="outline"
                            isRound={true}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Box>
          <Box
            width={{ base: 1, sm: 1 / 2, md: "40%" }}
            height="max-content"
            display={{ sm: "none", md: "none", lg: "block" }}
            // shadow="md"
            // borderWidth="1px"
            // flex="1"
            rounded="md"
            // p={"12px"}
            bg="gray.50"
            mx={2}
          >
            <Image
              src="bg_ph.jpg"
              fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
              alt="Blog image"
              w="100%"
              objectFit="cover"
              borderRadius="5px 5px 0 0"
              // style={{
              //   height: "30vh"
              // }}
            />
            <Box shadow="md" p={"12px"}>
              <Stack isInline spacing={3} align="center">
                <Text fontWeight="450">
                  The future can be even brighter but a goal without a plan is
                  just a wish.
                </Text>
              </Stack>
            </Box>
            {/* <Stack isInline spacing={3} align="center">
              <Avatar
                size="lg"
                src={
                  authContext.isAuth && `${baseUrl}${authContext.user.image}`
                }
              ></Avatar>
              <Box>
                <Heading as="h1" size="md">
                  {authContext.isAuth && authContext.user.name}
                </Heading>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Text mt={4} fontWeight="450">
                The future can be even brighter but a goal without a plan is
                just a wish
              </Text>
              <Box>
                <Box color="gray.400" fontWeight="450">
                  Work
                </Box>
                <Stack isInline align="center">
                  <Box fontWeight="450">Software Engineer at self-employed</Box>
                </Stack>
              </Box>
              <Box>
                <Box color="gray.400" fontWeight="450">
                  Location
                </Box>
                <Box>
                  <Text fontWeight="450">Pakistan</Text>
                </Box>
              </Box>
              <Box>
                <Box color="gray.400" fontWeight="450">
                  Joined
                </Box>
                <Box>
                  <Text fontWeight="450">20 Apr 2020</Text>
                </Box>
              </Box>
            </Stack>
           */}
          </Box>
        </Flex>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default Home;
