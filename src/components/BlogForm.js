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
  Image,
  FormErrorMessage
} from "@chakra-ui/core";
import { BlogContext } from "../context/BlogContext";
import { Formik, Field } from "formik";
import { FadeTransform } from "react-animation-components";
import { AiOutlineUpload } from "react-icons/ai";

const BlogForm = ({ match, history, editMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    authorName: "",
    content: ""
  });
  const hiddenFileInput = React.useRef(null);
  const context = useContext(BlogContext);

  console.log(context.blogs);
  useEffect(() => {
    if (editMode) {
      const selectedBlog = context.blogs.filter(
        blog => blog.id === Number(match.params.id)
      )[0];
      setInitialValues(selectedBlog);
      setImageUrl(selectedBlog.image_url);
    } else {
      setInitialValues({
        title: "",
        authorName: "",
        content: ""
      });
    }
  }, [editMode]);

  const fileChangedHandler = event => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));

    // const temp_initialValues = {
    //   image_url: URL.createObjectURL(event.target.files[0]),
    //   ...initialValues
    // };
    // setInitialValues(temp_initialValues);
  };

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
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateX(-50%)"
      }}
    >
      <Box
        maxWidth="1200px"
        mx="auto"
        my="auto"
        paddingTop="20px"
        paddingBottom="20px"
        height={"100%"}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading as="h1" color="teal.500" size="lg" p={5}>
            {editMode ? "Update" : "Create"} a Blog
          </Heading>

          <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
            <Stack isInline spacing={8} align="center">
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  if (editMode) {
                    values["id"] = Number(match.params.id);
                    context.editBlog(values, selectedFile, history);
                    // setInitialValues(values);
                  } else {
                    context.createBlog(values, selectedFile, history);
                  }
                  // history.push("/");
                  actions.setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => {
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
                              isInvalid={
                                form.errors.title && form.touched.title
                              }
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
                                form.errors.authorName &&
                                form.touched.authorName
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
                      <Box paddingBottom={5} height="2.5rem">
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="fileItem"
                          onChange={fileChangedHandler}
                          ref={hiddenFileInput}
                        />
                        <Button
                          leftIcon={AiOutlineUpload}
                          variantColor="teal"
                          float="left"
                          onClick={() => hiddenFileInput.current.click()}
                        >
                          Upload Image
                        </Button>
                      </Box>
                      {imageUrl && (
                        <Stack marginTop="5px">
                          <Image
                            size="100px"
                            objectFit="cover"
                            src={imageUrl}
                            alt="Profile image"
                          />
                        </Stack>
                      )}
                      <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={isSubmitting}
                        type="submit"
                        float="right"
                      >
                        {editMode ? "Update" : "Create"}
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </FadeTransform>
  );
};

export default BlogForm;
