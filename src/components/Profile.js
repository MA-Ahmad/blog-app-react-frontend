import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  useToast,
  PseudoBox,
  Text,
  List,
  FormControl,
  FormErrorMessage,
  ListItem
} from "@chakra-ui/core";
import { AuthContext } from "../context/AuthContext";
import { Formik, Field } from "formik";
import { FadeTransform } from "react-animation-components";
import { AiOutlineUpload } from "react-icons/ai";
import { baseUrl } from "../utils/Cons/Constants";
import PageLoader from "./PageLoader";

const Profile = ({ history }) => {
  const authContext = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [initialValues, setInitialValues] = useState({
    email: "",
    name: "",
    image: "",
    username: "",
    summary: "",
    location: "",
    education: "",
    emp_name: "",
    emp_title: "",
    skills: ""
  });
  const [upload, setUpload] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const toast = useToast();

  useEffect(() => {
    setInitialValues(authContext.user);
    setImageUrl(authContext.user.image);
  }, [authContext.user]);

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

  function validateEmail(email) {
    let error;
    if (!email) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = "Invalid email address";
    }
    return error;
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
              // _hover={{
              //   bg: "#e3e8ea",
              //   color: "blue.400",
              //   shadow: "md",
              //   rounded: "md"
              // }}
            >
              Profile
            </PseudoBox>
            {/* <PseudoBox
              as="li"
              fontWeight="semibold"
              py={2}
              px={2}
              rounded="md"
              _active={{ bg: "#fbfdff", rounded: "md" }}
              _hover={{
                bg: "#e3e8ea",
                color: "blue.400",
                shadow: "md",
                rounded: "md"
              }}
            >
              Account
            </PseudoBox>

            <ListItem
              _hover={{
                bg: "#e3e8ea",
                color: "blue.400",
                shadow: "md",
                rounded: "md"
              }}
              padding={2}
              fontWeight="500"
            >
              Terms
            </ListItem>
            <ListItem
              _hover={{
                bg: "#e3e8ea",
                color: "blue.400",
                shadow: "md",
                rounded: "md"
              }}
              padding={2}
              fontWeight="500"
            >
              Privay Policy
            </ListItem> */}
          </List>
        </Box>
        <Box
          width={{ base: 1, sm: "35rem", md: "50rem", lg: "60rem" }}
          mx={2}
          m={{ sm: "0 auto" }}
        >
          <Box>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              rounded="md"
              // width={"40%"}
              bg="#fbfdff"
            >
              <Stack isInline spacing={8} align="center">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={(values, actions) => {
                    values["id"] = Number(authContext.user.id);
                    setShowLoader(true);
                    authContext.updateUser(values, selectedFile, history);
                    actions.setSubmitting(false);
                  }}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting }) => {
                    return (
                      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <Stack spacing={3}>
                          <Box>
                            {/* <FormLabel htmlFor="email">Email</FormLabel>
                            <PseudoBox
                              as="input"
                              display="block"
                              placeholder="Email"
                              value={values.email}
                              onChange={handleChange}
                              type="email"
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
                            /> */}
                            <Field
                              name="email"
                              validate={validateEmail}
                              width={"100%"}
                            >
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.email && form.touched.email
                                  }
                                >
                                  <FormLabel htmlFor="email">Email</FormLabel>
                                  {/* <Input
                                    {...field}
                                    id="title"
                                    placeholder="Title"
                                    value={values.title}
                                    onChange={handleChange}
                                  /> */}
                                  <PseudoBox
                                    {...field}
                                    as="input"
                                    display="block"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    type="email"
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
                                    {form.errors.email}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Name</FormLabel>

                            <PseudoBox
                              as="input"
                              display="block"
                              placeholder="Muhammad Ahmad"
                              id="name"
                              value={values.name}
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
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Username</FormLabel>
                            <PseudoBox
                              id="username"
                              as="input"
                              display="block"
                              placeholder="m_ahmad"
                              value={values.username}
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
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Summary</FormLabel>
                            <PseudoBox
                              id="summary"
                              as="textarea"
                              display="block"
                              placeholder="A short bio..."
                              value={values.summary}
                              onChange={handleChange}
                              type="text"
                              flex="1"
                              py={2}
                              px={4}
                              width="100%"
                              height="5rem"
                              rounded="md"
                              bg="gray.50"
                              borderWidth="1px"
                              borderColor="gray.300"
                              _focus={{
                                bg: "white",
                                borderColor: "gray.300"
                              }}
                            />
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Location</FormLabel>
                            <PseudoBox
                              id="location"
                              as="input"
                              display="block"
                              placeholder="Lahore, Pakistan"
                              value={values.location}
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
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Education</FormLabel>
                            <PseudoBox
                              id="education"
                              as="input"
                              display="block"
                              placeholder="Bachelor's degree CS"
                              value={values.education}
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
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">
                              Skills/Languages
                            </FormLabel>
                            <PseudoBox
                              id="skills"
                              as="textarea"
                              display="block"
                              placeholder="Javascript, Ruby"
                              value={values.skills}
                              onChange={handleChange}
                              type="text"
                              flex="1"
                              py={2}
                              px={4}
                              width="100%"
                              height="7rem"
                              rounded="md"
                              bg="gray.50"
                              borderWidth="1px"
                              borderColor="gray.300"
                              _focus={{
                                bg: "white",
                                borderColor: "gray.300"
                              }}
                            />
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">
                              Employment title
                            </FormLabel>
                            <PseudoBox
                              id="emp_title"
                              as="input"
                              display="block"
                              placeholder="Backend Engineer"
                              value={values.emp_title}
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
                          </Box>
                          <Box>
                            <FormLabel htmlFor="name">Employer name</FormLabel>
                            <PseudoBox
                              id="emp_name"
                              as="input"
                              display="block"
                              placeholder="Inspex Inc."
                              value={values.emp_name}
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
                          </Box>
                        </Stack>

                        <Box paddingBottom={5} height="2.5rem" mt={3}>
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
                            Profile Image
                          </Button>
                        </Box>
                        {imageUrl && (
                          <Stack marginTop="5px">
                            <Image
                              rounded="full"
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
                          Update
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
