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
  useToast
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
    name: "",
    email: "",
    image: ""
  });
  const [upload, setUpload] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const toast = useToast();

  useEffect(() => {
    setInitialValues(authContext.user);
    setImageUrl(authContext.user.image.url);
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

  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateX(-50%)"
      }}
    >
      {showLoader && <PageLoader />}
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
            User Profile
          </Heading>

          <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
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
                      <Box paddingBottom={5}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          id="name"
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box paddingBottom={3}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          isDisabled={true}
                          id="email"
                          placeholder="Email"
                          value={values.email}
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
                        Update
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

export default Profile;
