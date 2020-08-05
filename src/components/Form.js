import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  Heading,
  useToast
} from "@chakra-ui/core";
import BlogContext from "../context/blog-context";

const Form = () => {
  const context = useContext(BlogContext);
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(title);
    context.createBlog({ title: title, author: authorName, content: content });
    toast({
      position: "bottom",
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true
    });
    setTitle("");
    setAuthorName("");
    setContent("");
  };

  const handleNameChange = e => {
    setAuthorName(e.target.value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      my="auto"
      paddingTop="20px"
      paddingBottom="20px"
      height={"100%"}
    >
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Heading as="h1" color="teal.500" size="lg" p={5}>
          Create a Blog
        </Heading>

        <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
          <Stack isInline spacing={8} align="center">
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl padding="15px" width={"100%"}>
                <Box paddingBottom={3}>
                  <FormLabel htmlFor="email">Title</FormLabel>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box paddingBottom={3}>
                  <FormLabel htmlFor="author">Author</FormLabel>
                  <Input
                    type="text"
                    id="author"
                    name="author"
                    value={authorName}
                    onChange={handleNameChange}
                  />
                </Box>
                <Box paddingBottom={5}>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <Textarea
                    height={"20vh"}
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                  />
                </Box>
                <Button variantColor="teal" float="right" type="submit">
                  Create
                </Button>
              </FormControl>
            </form>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Form;
