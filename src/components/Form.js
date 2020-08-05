import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  Text,
  Heading
} from "@chakra-ui/core";

const Form = () => {
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
            <FormControl padding="15px" width={"100%"}>
              <Box paddingBottom={3}>
                <FormLabel htmlFor="email">Title</FormLabel>
                <Input type="text" id="title" />
              </Box>
              <Box paddingBottom={3}>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input type="text" id="author" />
              </Box>
              <Box paddingBottom={5}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Textarea height={"20vh"} />
              </Box>
              <Button variantColor="teal" float="right">
                Create
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Form;
