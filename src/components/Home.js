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
  ListIcon,
  Skeleton
} from "@chakra-ui/core";

import SkeletonFeed from "./Skeleton";
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [tags, setTags] = useState(["ruby", "rails", "react", "formik"]);

  useEffect(() => {
    ahoy.trackAll();
    // setIsDataLoaded(context.fetchBlogs());
    context.fetchBlogsAsync.then(res => {
      setBlogs(res);
      setIsDataLoaded(true);
    });
  }, []);

  const handleImageLoaded = () => {
    setImgLoaded(true);
  };
  return (
    <>
      <Flex
        maxWidth="1300px"
        margin="0 auto"
        p="20px"
        display={{ sm: "block", md: "flex" }}
        justifyContent="center"
      >
        <Box
          width={{ base: 1, sm: "100%", md: "38%" }}
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
              src={authContext.isAuth && `${baseUrl}${authContext.user.image}`}
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
          <Stack spacing={3}>
            {isDataLoaded ? (
              blogs.map(blog => {
                return (
                  <Box
                    key={blog.id}
                    as={Link}
                    to={`/blogs/${blog.id}`}
                    // _hover={{ shadow: "md", textDecoration: "none" }}
                    cursor="pointer"
                    borderWidth="1px"
                    shadow="md"
                    bg="#fbfdff"
                    position="relative"
                    rounded="md"
                    borderRadius="5px"
                    height="10 rem"
                  >
                    {blog.image && (
                      <>
                        <Image
                          src={blog.image && `${baseUrl}${blog.image}`}
                          // fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
                          onLoad={handleImageLoaded}
                          // alt="Blog image"
                          w="100%"
                          objectFit="cover"
                          borderRadius="5px 5px 0 0"
                          style={{
                            height: "35vh",
                            display: imgLoaded ? "block" : "none"
                          }}
                        />
                        <Skeleton
                          height="35vh"
                          borderRadius="5px 5px 0 0"
                          width="100%"
                          style={{
                            display: imgLoaded ? "none" : "block"
                          }}
                        />
                      </>
                    )}
                    <Stack isInline justifyContent="space-between" mt={2} p={5}>
                      <Box width="100%">
                        <Stack isInline align="center" marginBottom="5px">
                          {blog.user && (
                            <Box>
                              <Avatar
                                src={
                                  blog.user && `${baseUrl}${blog.user.image}`
                                }
                                onLoad={handleImageLoaded}
                                style={{
                                  display: imgLoaded ? "block" : "none"
                                }}
                                size="sm"
                              ></Avatar>
                              <Skeleton
                                size="sm"
                                width="2em"
                                height="2em"
                                borderRadius="50%"
                                style={{
                                  display: imgLoaded ? "none" : "block"
                                }}
                              />
                            </Box>
                          )}
                          <Box>
                            <Heading as="h1" size="sm">
                              Ali Umar
                            </Heading>
                            <Text fontSize="xs">9 Oct</Text>
                          </Box>
                        </Stack>
                        <Box pl="2.5em">
                          <Heading
                            fontSize="xl"
                            style={{
                              display: isDataLoaded ? "block" : "none"
                            }}
                          >
                            {blog.title}
                          </Heading>
                          <Skeleton
                            height="17px"
                            width="100%"
                            style={{
                              display: isDataLoaded ? "none" : "block"
                            }}
                          />
                          {isDataLoaded ? (
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
                                    variant="unstyled"
                                    height="auto"
                                    minWidth="auto"
                                  />
                                </Tooltip>
                              </div>
                            </Stack>
                          ) : (
                            <Stack
                              spacing={2}
                              mt={1}
                              isInline
                              alignItems="center"
                            >
                              <Skeleton height="15px" width="80%" />
                            </Stack>
                          )}
                          <Dotdotdot clamp={2}>
                            <Box
                              mt={2}
                              fontWeight="semibold"
                              as="p"
                              lineHeight="tight"
                              color="gray.600"
                              fontSize="sm"
                            >
                              {isDataLoaded ? (
                                blog.content
                              ) : (
                                <>
                                  <Skeleton height="10px" width="100%" my={1} />
                                  <Skeleton height="10px" width="100%" my={1} />
                                  <Skeleton height="10px" width="100%" my={1} />
                                </>
                              )}
                            </Box>
                          </Dotdotdot>
                        </Box>
                      </Box>
                      <Box>
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
              })
            ) : (
              // <Flex>
              //   <Heading as="h1">There is No Blog</Heading>
              // </Flex>
              <SkeletonFeed />
            )}
          </Stack>
        </Box>

        <Box
          width={{ base: 1, sm: 1 / 2, md: "40%" }}
          height="max-content"
          display={{ sm: "none", md: "none", lg: "block" }}
          rounded="md"
          // bg="gray.50"
          bg="#f9fbfd"
          mx={2}
        >
          <Image
            src="bg_ph.jpg"
            // fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
            // alt="Blog image"
            w="100%"
            objectFit="cover"
            borderRadius="5px 5px 0 0"
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
      {/* <div>
          <Skeleton
            rounded="full"
            height="35px"
            size="45px"
            float="left"
            mx="1rem"
          />
          <Skeleton height="15px" my="20px" mx="15%" width="25%" />
          <Skeleton height="20px" my="10px" mx="15%" width="50%" />
          <Skeleton height="15px" my="15px" mx="15%" width="35%" />
        </div>
        <PageLoader /> */}
    </>
  );
};

export default Home;
