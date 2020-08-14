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
  useToast,
  FormErrorMessage
} from "@chakra-ui/core";
import BlogContext from "../context/blog-context";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { red } from "color-name";

const BlogForm = () => {
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

  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length < 5) {
      errors.title = "Must be 5 characters or more";
    }

    if (!values.authorName) {
      errors.authorName = "Required";
    } else if (values.authorName.length > 20) {
      errors.authorName = "Must be 20 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: title,
      authorName: authorName
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    onChange: value => {
      console.log(value);
      setTitle(title);
      setAuthorName(authorName);
    }
  });

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
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <Box paddingBottom={3}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {formik.errors.title ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.title}
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </div>
                ) : null}
              </Box>
              <Box paddingBottom={3}>
                <FormLabel htmlFor="authorName">Author</FormLabel>
                <Input
                  type="text"
                  id="authorName"
                  name="authorName"
                  value={formik.values.authorName}
                  onChange={formik.handleChange}
                />
                {formik.errors.authorName ? (
                  <div>{formik.errors.authorName}</div>
                ) : null}
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
            </form>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default BlogForm;
