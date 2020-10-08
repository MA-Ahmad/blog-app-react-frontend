import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  FormErrorMessage
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { FadeTransform } from "react-animation-components";
import { AuthContext } from "../../context/AuthContext";

const AuthForm = ({ history, formType }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const authContext = useContext(AuthContext);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 6) {
      error = "Must be 6 characters or more";
    }
    return error;
  }

  console.log("formType");
  console.log(formType);

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
            {formType === "login" ? "Sign In" : "Sign Up"}
          </Heading>

          <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
            <Stack isInline spacing={8} align="center">
              <Formik
                enableReinitialize
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, actions) => {
                  formType === "login"
                    ? authContext.loginUser(values, history)
                    : authContext.registerUser(values, history);
                  actions.setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                      <Box paddingBottom={3}>
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
                              <Input
                                {...field}
                                id="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box paddingBottom={3}>
                        <Field
                          name="password"
                          validate={validatePassword}
                          width={"100%"}
                        >
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup size="md">
                                <Input
                                  {...field}
                                  id="password"
                                  pr="4.5rem"
                                  type={show ? "text" : "password"}
                                  placeholder="Enter password"
                                  value={values.password}
                                  onChange={handleChange}
                                />
                                <InputRightElement width="4.5rem">
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                  >
                                    {show ? "Hide" : "Show"}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={isSubmitting}
                        type="submit"
                        float="right"
                      >
                        {formType === "login" ? "Sign In" : "Sign Up"}
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

export default AuthForm;
