import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Grid, Text } from "@chakra-ui/core";
import { FadeTransform } from "react-animation-components";
import PageLoader from "./PageLoader";
import { Img } from "react-image";
import axios from "axios";
import { apiHost, baseUrl } from "../utils/Cons/Constants";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`${apiHost}/blogs/${Number(match.params.id)}`, {
        withCredentials: true
      })
      .then(response => {
        setBlog(response.data);
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
          as="div"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          h="50vh"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box w="100%" h="100%" bg="blue.500">
              <Image
                src={blog.image_url && `${baseUrl}${blog.image_url}`}
                fallbackSrc="https://bit.ly/2Z4KKcF"
                alt="Blog image"
                style={{
                  height: "70vh",
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
      )}
    </FadeTransform>
  );
};

export default Blog;
