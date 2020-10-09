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
import { baseUrl } from "../utils/Cons/Constants";

const BlogForm = ({ match, history, editMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    authorName: "",
    content: ""
  });
  const [upload, setUpload] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const context = useContext(BlogContext);
  const toast = useToast();

  console.log(context.blogs);
  useEffect(() => {
    if (editMode) {
      const selectedBlog = context.blogs.filter(
        blog => blog.id === Number(match.params.id)
      )[0];
      setInitialValues(selectedBlog);
      setImageUrl(selectedBlog.image.url);
    } else {
      setInitialValues({
        title: "",
        authorName: "",
        content: ""
      });
    }
  }, [editMode]);

  const fileChangedHandler = event => {
    const file = event.target.files[0];
    const fileType = file["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (validImageTypes.includes(fileType)) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
      setUpload(true);
    } else {
      toast({
        position: "bottom",
        email: "Notification",
        description: "Invalid type",
        status: "error",
        duration: 2000,
        isClosable: true
      });
    }
  };

  function validateField(value) {
    let error;
    if (!value) {
      error = "Required";
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
                  } else {
                    context.createBlog(values, selectedFile, history);
                  }
                  actions.setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                      <Box paddingBottom={3}>
                        <Field
                          name="title"
                          validate={validateField}
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
                          name="content"
                          validate={validateField}
                          width={"100%"}
                        >
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.content && form.touched.content
                              }
                            >
                              <FormLabel htmlFor="content">Content</FormLabel>
                              <Textarea
                                {...field}
                                height={"20vh"}
                                id="content"
                                value={values.content}
                                onChange={handleChange}
                              />
                              <FormErrorMessage>
                                {form.errors.content}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box paddingBottom={5} height="2.5rem">
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="fileItem"
                          onChange={fileChangedHandler}
                          ref={hiddenFileInput}
                          accept="image/*"
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
                            src={upload ? imageUrl : `${baseUrl}${imageUrl}`}
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
