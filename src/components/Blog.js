import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Heading, Grid, Text } from "@chakra-ui/core";
import { BlogContext } from "../context/BlogContext";
import { FadeTransform } from "react-animation-components";
import { Img } from "react-image";
import PageLoader from "./PageLoader";
import axios from "axios";

const Blog = ({ match }) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    authorName: "",
    content: "",
    image_url: ""
  });
  const context = useContext(BlogContext);

  useEffect(() => {
    if (context.blogs === []) {
      const selectedBlog = context.blogs.filter(
        blog => blog.id === Number(match.params.id)
      )[0];
      setInitialValues(selectedBlog);
    } else {
      axios
        .get(`http://localhost:3001/api/v1/blogs/${Number(match.params.id)}`, {
          withCredentials: true
        })
        .then(response => {
          setInitialValues(response.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateX(-50%)"
      }}
    >
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
            <Img
              src={
                initialValues && initialValues.image_url
                  ? initialValues.image_url
                  : "https://bit.ly/2Z4KKcF"
              }
              alt="Blog image"
              loader={<PageLoader />}
              style={{
                height: "70vh",
                objectFit: "cover",
                borderRadius: "5px"
              }}
            />
          </Box>
          <Box w="100%" h="100%">
            <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
              Title
            </Heading>
            <Text pl={1}>{initialValues && initialValues.title}</Text>
            <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
              Author
            </Heading>
            <Text pl={1}>{initialValues && initialValues.authorName}</Text>
            <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
              Content
            </Heading>
            <Text pl={1}>{initialValues && initialValues.content}</Text>
          </Box>
        </Grid>
      </Flex>
    </FadeTransform>
  );
};

export default Blog;
