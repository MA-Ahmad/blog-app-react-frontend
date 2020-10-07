import React, { useContext } from "react";
import { Box, Badge, SimpleGrid, useToast, Flex } from "@chakra-ui/core";
import Dotdotdot from "react-dotdotdot";
import BlogContext from "../context/blog-context";
import { Link } from "react-router-dom";
import PageLoader from "./PageLoader";
import { Img } from "react-image";

const Home = () => {
  const context = useContext(BlogContext);
  const toast = useToast();

  const handleDelete = id => {
    context.deleteBlog(id);

    toast({
      position: "bottom",
      title: "Notification",
      description: "Blog deleted successfully",
      status: "success",
      duration: 2000,
      isClosable: true
    });
  };

  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      my="auto"
      paddingTop="20px"
      paddingBottom="20px"
    >
      <SimpleGrid columns={3} spacing="15px">
        {context.blogs.map(blog => {
          return (
            <Box position="relative" key={blog.id}>
              {/* {context.isAuth && context.user.id === blog.user_id ? (
                <Box
                  as="span"
                  fontSize="sm"
                  position="absolute"
                  right="5px"
                  margin="5px"
                  zIndex="1"
                >
                  <Badge
                    rounded="full"
                    p="2px 8px"
                    variantColor="red"
                    as="button"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Badge>
                </Box>
              ) : (
                ""
              )} */}
              {/* <Link to={`/edit/${blog.id}`}> */}
              <Box
                maxW="sm"
                borderWidth="1px"
                shadow="md"
                rounded="lg"
                overflow="hidden"
                position="relative"
              >
                <Link to={`/blogs/${blog.id}`}>
                  <Img
                    src={"https://bit.ly/2Z4KKcF"}
                    alt="Blog image"
                    loader={<PageLoader />}
                  />
                </Link>
                <Box p="5">
                  <Box d="flex" alignItems="baseline">
                    <Box
                      fontWeight="semibold"
                      as="h2"
                      letterSpacing="wide"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {blog.title}
                    </Box>
                  </Box>
                  <Box m="2px 0px">
                    {/* <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                      > */}
                    <Flex
                      as="div"
                      align="center"
                      justify="space-between"
                      wrap="wrap"
                      color="white"
                    >
                      <Badge rounded="full" px="2" py="1" variantColor="teal">
                        {blog.authorName}
                      </Badge>
                      {context.isAuth && context.user.id === blog.user_id ? (
                        <Box>
                          <Link to={`/edit/${blog.id}`}>
                            <Badge
                              rounded="full"
                              px="2"
                              py="1"
                              mr="2"
                              variantColor="gray"
                            >
                              Edit
                            </Badge>
                          </Link>
                          <Badge
                            rounded="full"
                            px="2"
                            py="1"
                            variantColor="red"
                            as="button"
                            onClick={() => handleDelete(blog.id)}
                          >
                            Delete
                          </Badge>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Flex>
                    {/* </Box> */}
                  </Box>
                  <Dotdotdot clamp={3}>
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="p"
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {blog.content}
                    </Box>
                  </Dotdotdot>
                </Box>
              </Box>
              {/* </Link> */}
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
