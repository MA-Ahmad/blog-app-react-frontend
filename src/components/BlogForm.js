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
  FormErrorMessage,
  PseudoBox,
  Text,
  List
} from "@chakra-ui/core";
import { BlogContext } from "../context/BlogContext";
import { Formik, Field } from "formik";
import { AiOutlineUpload } from "react-icons/ai";
import { baseUrl } from "../utils/Cons/Constants";
import PageLoader from "./PageLoader";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "../assets/stylesheets/editor.scss";
import { grid } from "styled-system";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const EditorConfig = {
  theme: "default",
  view: {
    menu: true,
    md: true,
    html: false
  },
  canView: {
    menu: true,
    md: true,
    html: true,
    both: true,
    fullScreen: true,
    hideMenu: true
  },
  htmlClass: "",
  markdownClass: "",
  syncScrollMode: ["rightFollowLeft", "leftFollowRight"],
  imageUrl: "",
  imageAccept: "",
  linkUrl: "",
  table: {
    maxRow: 4,
    maxCol: 6
  },
  allowPasteImage: true,
  onImageUpload: undefined,
  onCustomImageUpload: undefined,
  shortcuts: true
};

const Profile = ({ match, history, editMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    authorName: "",
    content: "",
    contentText: "",
    contentHtml: ""
  });
  const [upload, setUpload] = useState(false);
  const [contentText, setContentText] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const context = useContext(BlogContext);
  const toast = useToast();

  useEffect(() => {
    if (editMode) {
      const selectedBlog = context.blogs.filter(
        blog => blog.id === Number(match.params.id)
      )[0];
      setInitialValues(selectedBlog);
      setImageUrl(selectedBlog.image);
    } else {
      setInitialValues({
        title: "",
        authorName: "",
        content: "",
        contentText: "",
        contentHtml: ""
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

  // Finish!
  function handleEditorChange({ html, text }) {
    setContentText(text);
    // let initial_values = initialValues;
    // setInitialValues({ ["contentText"]: text, ...initialValues });
    setContentHtml(html);
    console.log("handleEditorChange", html, text);
  }

  return (
    <>
      <Flex
        maxWidth="1150px"
        margin="0 auto"
        pt="10px"
        p="10px"
        mt="5em"
        justifyContent="flex-start"
      >
        <Heading as="h1" size="lg">
          Settings for{" "}
          <Text as="span" color="teal.500">
            {initialValues.username
              ? `@${initialValues.username}`
              : initialValues.email}
          </Text>
        </Heading>
      </Flex>
      <Stack isInline maxWidth="1150px" margin="0 auto" p="10px" spacing={5}>
        <Box
          width={{ base: 1, sm: "100%", md: "25%" }}
          display={{ sm: "none", md: "block", lg: "block" }}
          rounded="md"
        >
          <List>
            <PseudoBox
              as="li"
              fontWeight="semibold"
              py={2}
              px={2}
              rounded="md"
              bg="#fbfdff"
              _active={{ bg: "#fbfdff", rounded: "md" }}
            >
              Profile
            </PseudoBox>
          </List>
        </Box>
        <Box
          width={{ base: 1, sm: "35rem", md: "50rem", lg: "60rem" }}
          mx={2}
          m={{ sm: "0 auto" }}
        >
          <Box>
            <Box p={5} shadow="md" borderWidth="1px" rounded="md" bg="#fbfdff">
              <Stack isInline spacing={8} align="center">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={(values, actions) => {
                    setShowLoader(true);
                    values["contentText"] = contentText;
                    values["contentHtml"] = contentHtml;
                    debugger;

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
                        <Stack spacing={3}>
                          <Box>
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
                                  <PseudoBox
                                    {...field}
                                    as="input"
                                    display="block"
                                    placeholder="Title"
                                    value={values.title}
                                    onChange={handleChange}
                                    type="text"
                                    flex="1"
                                    py={2}
                                    px={4}
                                    width="100%"
                                    rounded="md"
                                    bg="gray.50"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    _focus={{
                                      bg: "white",
                                      borderColor: "gray.300"
                                    }}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.title}
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
                              {imageUrl ? "Change Cover" : "Upload Cover Image"}
                            </Button>
                          </Box>
                          {imageUrl && (
                            <Stack
                              marginTop="5px"
                              width="100%"
                              isInline
                              alignItems="center"
                            >
                              <Box width="50%">
                                <Image
                                  size="8rem"
                                  borderRadius="5px"
                                  width="100%"
                                  objectFit="cover"
                                  src={
                                    upload ? imageUrl : `${baseUrl}${imageUrl}`
                                  }
                                  alt="Cover image"
                                />
                              </Box>
                              <Button
                                variantColor="teal"
                                float="left"
                                onClick={() => hiddenFileInput.current.click()}
                              >
                                Remove
                              </Button>
                            </Stack>
                          )}

                          <Box>
                            <MdEditor
                              style={{ height: "500px" }}
                              plugins={[
                                "header",
                                "font-bold",
                                "font-italic",
                                "font-underline",
                                "font-strikethrough",
                                "block-quote",
                                "block-code-inline",
                                "block-code-block",
                                "block-wrap",
                                "link",
                                "list-unordered",
                                "list-ordered",
                                "image",
                                "logger-undo",
                                "redo",
                                "clear",
                                "mode-toggle",
                                "full-screen"
                              ]}
                              {...EditorConfig}
                              value={contentText}
                              renderHTML={text => mdParser.render(text)}
                              onChange={handleEditorChange}
                            />
                          </Box>
                        </Stack>

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
          </Box>
        </Box>
      </Stack>
      {/* </Flex> */}
    </>
  );
};

export default Profile;
