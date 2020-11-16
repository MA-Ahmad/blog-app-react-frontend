import React, { useEffect, useContext, useState } from "react";
import {
  Box,
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
  Skeleton,
  Link as ChakraLink,
  SimpleGrid
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
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useAnimation
} from "framer-motion";

ahoy.configure({
  urlPrefix: "",
  visitsUrl: `${baseUrl}/ahoy/visits`,
  eventsUrl: `${baseUrl}/ahoy/events`,
  withCredentials: true
});

const Home = ({ location }) => {
  const context = useContext(BlogContext);
  const authContext = useContext(AuthContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isBlogsUpdated, setIsBlogsUpdated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tags, setTags] = useState(["ruby", "rails", "react", "formik"]);
  const [activeLink, setActiveLink] = useState("");

  const { scrollYProgress } = useViewportScroll();
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 0,
      x: 100,
      transition: { delay: i * 0.3, opacity: 1 }
    }));
    ahoy.trackAll();
    console.log("use efect");
    context.fetchBlogsAsync.then(res => {
      console.log("ressss", res);
      setBlogs(res);
      setIsDataLoaded(true);
    });
    window.scrollTo(0, 0);
  }, [location.key]);

  const handleImageLoaded = () => {
    setImgLoaded(true);
  };

  const handleLike = (e, blogId) => {
    context.likeContent(blogId).then(res => {
      setBlogs(res);
    });
    e.preventDefault();
  };

  const handleBookmark = (e, blogId) => {
    context.bookmarkContent(blogId).then(res => {
      let temp_blogs = blogs;
      let index = temp_blogs.map(t_b => t_b.id).indexOf(res.id);
      temp_blogs.splice(index, 1, res);
      setIsBookmarked(!isBookmarked);
      setBlogs(temp_blogs);
    });
    e.preventDefault();
  };

  const myPosts = () => {
    setActiveLink("my-posts");
    setBlogs(blogs.filter(blog => blog.user_id === authContext.user.id));
  };

  return (
    <>
      {/* <Flex
        maxWidth="1300px"
        margin="0 auto"
        p="20px"
        display={{ sm: "block", md: "flex" }}
        justifyContent="center"
      > */}
      {/* <Header /> */}
      <SimpleGrid
        flexDirection="column-reverse"
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        // mt="70px"
        // mb="100px"
        // max: 1300px;
        maxW="1300px"
        margin="0 auto"
        pt="20px"
        // p="20px"
        p={["20px", "30px", "30px", "20px"]}
        mt="5em"
        gridGap="1rem"
      >
        <Box
          // width={{ base: 1, sm: "100%", md: "38%" }}
          width={["5em", "auto", "auto", "100%"]}
          display={["none", "block", "block", "block"]}
          // m={{ base: "0 auto" }}
          height="max-content"
          // display={{ sm: "none", md: "block", lg: "block" }}
          rounded="md"
          // p={"12px"}
          // mx={2}
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
            {authContext.isAuth && (
              <ListItem
                _hover={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                // _active={{ bg: "gray.50", shadow: "md", rounded: "md" }}
                bg={activeLink === "my-posts" && "gray.50"}
                shadow={activeLink === "my-posts" && "md"}
                rounded={activeLink === "my-posts" && "md"}
                padding={2}
                fontWeight="500"
                cursor="pointer"
                onClick={myPosts}
              >
                <ListIcon icon={BsFilePost} color="rgb(33, 150, 243)" />
                My Posts
              </ListItem>
            )}
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
          // width={{ base: 1, sm: "35rem", md: "50rem", lg: "60rem" }}
          // width={["25em", "25em", "40em", "100%"]}
          // mx={2}
          m={{ sm: "0 auto" }}
        >
          {/* <motion.div custom={5} animate={controls}> */}
          <Stack spacing={3} width={["100%", "40em", "45em", "40em"]}>
            {isDataLoaded ? (
              blogs.map((blog, index) => {
                return (
                  <Box
                    key={blog.id}
                    as={Link}
                    to={`/blogs/${blog.id}`}
                    // _hover={{ shadow: "md", textDecoration: "none" }}
                    // cursor="pointer"
                    // borderWidth="1px"
                    // shadow="md"
                    // bg="#fbfdff"
                    // position="relative"
                    // rounded="md"
                    // borderRadius="5px"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1.05 }}
                    >
                      <Box
                        cursor="pointer"
                        borderWidth="1px"
                        shadow="md"
                        bg="#fbfdff"
                        position="relative"
                        rounded="md"
                        borderRadius="5px"
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

                        <Stack isInline justifyContent="space-between" p={4}>
                          <Box width="100%">
                            <Stack isInline align="center" marginBottom="5px">
                              {blog.user && (
                                <Box>
                                  <Avatar
                                    src={
                                      blog.user &&
                                      `${baseUrl}${blog.user.image}`
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
                                    <Tooltip
                                      label="Source Code"
                                      placement="right"
                                    >
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
                                      <Skeleton
                                        height="10px"
                                        width="100%"
                                        my={1}
                                      />
                                      <Skeleton
                                        height="10px"
                                        width="100%"
                                        my={1}
                                      />
                                      <Skeleton
                                        height="10px"
                                        width="100%"
                                        my={1}
                                      />
                                    </>
                                  )}
                                </Box>
                              </Dotdotdot>
                            </Box>
                          </Box>
                          <Box>
                            <Stack spacing={3} align="center">
                              <Box
                                textAlign="center"
                                _hover={{
                                  background: "rgb(243 217 217)",
                                  color: "#e53e3e"
                                }}
                              >
                                <IconButton
                                  aria-label="like icon"
                                  size="sm"
                                  isRound={true}
                                  icon={() => <RiHeart2Line />}
                                  variantColor={
                                    blog.likes.length ? "red" : "gray"
                                  }
                                  color={blog.likes.length ? "#e53e3e" : "gray"}
                                  background={
                                    blog.likes.length
                                      ? "rgb(243 217 217)"
                                      : "#efecec"
                                  }
                                  border={
                                    blog.likes.length
                                      ? "1px solid #e53e3e"
                                      : "none"
                                  }
                                  _hover={{
                                    background: "rgb(243 217 217)",
                                    color: "#e53e3e"
                                  }}
                                  // style={{
                                  //   color: blog.likes.length ? "#e53e3e" : "gray",
                                  //   background: blog.likes.length
                                  //     ? "rgb(243 217 217)"
                                  //     : "#efecec",
                                  //   border: blog.likes.length
                                  //     ? "1px solid #e53e3e"
                                  //     : "none"
                                  // }}
                                  _focus={{ outline: "none" }}
                                  isRound={true}
                                  onClick={e => handleLike(e, blog.id, index)}
                                />
                                <Text
                                  style={{
                                    color: blog.likes.length ? "red" : "gray"
                                  }}
                                >
                                  {blog.likes.length}
                                </Text>
                              </Box>
                              <Box textAlign="center">
                                <Tooltip
                                  hasArrow
                                  label="Bookmark"
                                  placement="top"
                                >
                                  <IconButton
                                    aria-label="bookmark icon"
                                    size="sm"
                                    isRound={true}
                                    _focus={{ outline: "none" }}
                                    icon={() => <BsBookmarkPlus />}
                                    // variantColor="red"
                                    // variantColor={
                                    //   blog.likes.length ? "green.200" : "gray"
                                    // }
                                    // style={{
                                    //   color: blog.bookmarks.length
                                    //     ? "#68D391"
                                    //     : "gray",
                                    //   background: blog.bookmarks.length
                                    //     ? "rgb(223 241 230)"
                                    //     : "#efecec",
                                    //   border: blog.bookmarks.length
                                    //     ? "1px solid #68D391"
                                    //     : "none"
                                    // }}
                                    color={
                                      blog.bookmarks.length ? "#68D391" : "gray"
                                    }
                                    background={
                                      blog.bookmarks.length
                                        ? "rgb(223 241 230)"
                                        : "#efecec"
                                    }
                                    border={
                                      blog.bookmarks.length
                                        ? "1px solid #68D391"
                                        : "none"
                                    }
                                    _hover={{
                                      background: "rgb(223 241 230)",
                                      color: "#68D391"
                                    }}
                                    // variant="outline"
                                    isRound={true}
                                    onClick={e => handleBookmark(e, blog.id)}
                                  />
                                </Tooltip>
                                <Text
                                  style={{
                                    color: blog.bookmarks.length
                                      ? "#68D391"
                                      : "gray"
                                  }}
                                >
                                  {blog.bookmarks.length}
                                </Text>
                              </Box>
                            </Stack>
                          </Box>
                        </Stack>
                      </Box>
                    </motion.div>
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
          {/* </motion.div> */}
        </Box>

        <Box
          // width={{ base: 1, sm: 1 / 2, md: "40%" }}
          width={["15em", "15em", "15em", "100%"]}
          display={["none", "none", "none", "block"]}
          height="max-content"
          // display={{ sm: "none", md: "none", lg: "block" }}
          rounded="md"
          // bg="gray.50"
          bg="#f9fbfd"
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
      </SimpleGrid>
      {/* </Flex> */}
    </>
  );
};

export default Home;
