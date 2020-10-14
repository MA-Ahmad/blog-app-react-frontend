import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Grid,
  Text,
  Image,
  Stack,
  SimpleGrid
} from "@chakra-ui/core";
import { FadeTransform } from "react-animation-components";
import PageLoader from "./PageLoader";
import { Img } from "react-image";
import axios from "axios";
import { apiHost, baseUrl } from "../utils/Cons/Constants";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${apiHost}/blogs/${Number(match.params.id)}`, {
        withCredentials: true
      })
      .then(response => {
        setBlog(response.data);
        setUser(response.data.user);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateX(-50%)"
      }}
    >
      {blog ? (
        <Flex
          maxWidth="1200px"
          margin="0 auto"
          p="20px"
          display={{ sm: "block", md: "flex" }}
          justifyContent="center"
        >
          <Box
            // width={{ base: 1, sm: "100%", md: "10rem" }}
            width={{ base: 1, sm: "100%", md: "10rem" }}
            // px={2}
            border="1px solid red"
            m={{ base: "0 auto" }}
            mx={2}
            display={{ sm: "none", md: "block", lg: "block" }}
          >
            one
          </Box>
          <Box
            width={{ base: 1, sm: "35rem", md: "75rem" }}
            // px={2}
            mx={2}
            border="1px solid red"
            m={{ sm: "0 auto" }}
          >
            <>
              <Image
                src={blog.image && `${baseUrl}${blog.image}`}
                fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
                alt="Blog image"
                w="100%"
                style={{
                  height: blog.image ? "60vh" : "53vh",
                  objectFit: "cover",
                  borderRadius: "5px"
                }}
              />
              <Box w="100%" h="100%">
                <Stack spacing={3}>
                  <Heading as="h1" size="2xl">
                    {blog.title}
                  </Heading>
                  <Heading as="h2" size="xl">
                    {user.name}
                  </Heading>
                </Stack>
                <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                  {blog.content}
                </Heading>
              </Box>
            </>
          </Box>
          <Box
            width={{ base: 1, sm: 1 / 2, md: 2 / 4 }}
            display={{ sm: "none", md: "none", lg: "block" }}
            // px={2}
            mx={2}
            border="1px solid red"
          >
            three
          </Box>
        </Flex>
      ) : (
        <PageLoader />
      )}
      {/* {blog ? (
        <Flex
          as="div"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          h="50vh"
        >
          <Grid templateColumns="repeat(1, 1fr)" gap={2} m={"0 auto"}>
            <Box w="100%" h="100%" bg="blue.500">
              <Image
                src={blog.image && `${baseUrl}${blog.image}`}
                fallbackSrc="https://via.placeholder.com/500/DCDFDF/ffffff/?text=BlogImage"
                alt="Blog image"
                style={{
                  height: blog.image ? "60vh" : "53vh",
                  objectFit: "cover",
                  borderRadius: "5px"
                }}
                // loader={<PageLoader />}
              />
            </Box>
            <Box w="100%" h="100%">
              <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                Title
              </Heading>
              <Text pl={1}>{blog.title}</Text>
              {blog.user && blog.user.name && (
                <>
                  <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                    Author
                  </Heading>
                  <Text pl={1}>{blog.user.name}</Text>
                </>
              )}
              <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                Content
              </Heading>
              <Text pl={1}>{blog.content}</Text>
            </Box>
          </Grid>
        </Flex>
      ) : (
        <PageLoader />
      )} */}
    </FadeTransform>
  );
};

export default Blog;
