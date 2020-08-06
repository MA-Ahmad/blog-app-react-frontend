import React, { useState, useContext, useEffect } from "react";
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
import { Formik, Field } from "formik";

const BlogForm = ({ match }) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    authorName: "",
    content: ""
  });

  const context = useContext(BlogContext);
  const toast = useToast();

  const isAddMode = !match.params.id;
  const selectedBlog = isAddMode
    ? ""
    : context.blogs.filter(
        blog => blog.id === parseInt(match.params.id, 10)
      )[0];

  useEffect(() => {
    if (!isAddMode) {
      setInitialValues(selectedBlog);
    }
  }, []);

  function validateTitle(value) {
    let error;
    if (!value) {
      error = "Title is required";
    } else if (value.length < 5) {
      error = "Must be 5 characters or more";
    }
    return error;
  }

  function validateAuthorName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length < 5) {
      error = "Must be 5 characters or more";
    }
    return error;
  }

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
            <Formik
              enableReinitialize={!isAddMode}
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  context.createBlog(values);

                  if (!isAddMode) {
                    values["id"] = selectedBlog.id;
                    setInitialValues(values);
                  } else {
                    actions.resetForm({});
                  }
                  actions.setSubmitting(false);
                  const text = isAddMode
                    ? "You've successfully created a blog post."
                    : "Blog post updated successfully";
                  toast({
                    position: "bottom",
                    title: "Blog",
                    description: text,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                  });
                }, 1000);
              }}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => {
                console.log(values);
                return (
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Box paddingBottom={3}>
                      <Field
                        name="title"
                        validate={validateTitle}
                        width={"100%"}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                              {...field}
                              id="title"
                              placeholder="Title"
                              value={values.title}
                              onChange={handleChange}
                            />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box paddingBottom={3}>
                      <Field
                        name="authorName"
                        validate={validateAuthorName}
                        width={"100%"}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.authorName && form.touched.authorName
                            }
                          >
                            <FormLabel htmlFor="authorName">Name</FormLabel>
                            <Input
                              {...field}
                              id="authorName"
                              placeholder="Author Name"
                              value={values.authorName}
                              onChange={handleChange}
                            />
                            <FormErrorMessage>
                              {form.errors.authorName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box paddingBottom={5}>
                      <FormLabel htmlFor="content">Content</FormLabel>
                      <Textarea
                        height={"20vh"}
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                      />
                    </Box>
                    <Button
                      mt={4}
                      variantColor="teal"
                      isLoading={isSubmitting}
                      type="submit"
                      float="right"
                    >
                      Submit
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default BlogForm;
