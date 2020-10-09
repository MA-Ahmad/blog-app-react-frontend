import React, { useEffect, useContext } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  Tag,
  Avatar,
  TagLabel,
  Image
} from "@chakra-ui/core";
import Dotdotdot from "react-dotdotdot";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PageLoader from "./PageLoader";
import { Img } from "react-image";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { baseUrl } from "../utils/Cons/Constants";

const Home = () => {
  const context = useContext(BlogContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    context.fetchBlogs();
  }, []);

  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      my="auto"
      paddingTop="20px"
      paddingBottom="20px"
    >
      {context.blogs ? (
        <SimpleGrid columns={3} spacing="15px">
          {context.blogs.map(blog => {
            return (
              <Box position="relative" key={blog.id}>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  shadow="md"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                >
                  <Link to={`/blogs/${blog.id}`}>
                    <Image
                      style={{
                        height: "30vh",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      src={blog.image_url && `${baseUrl}${blog.image_url}`}
                      fallbackSrc="https://bit.ly/2Z4KKcF"
                      alt="Blog image"
                      // loader={<PageLoader />}
                    />
                  </Link>
                  <Box p="5">
                    <Box d="flex" alignItems="baseline">
                      <Box
                        fontWeight="semibold"
                        as="h2"
                        letterSpacing="wide"
                        textTransform="uppercase"
                      >
                        {blog.title}
                      </Box>
                    </Box>
                    <Box m="2px 0px">
                      <Flex
                        as="div"
                        align="center"
                        justify="space-between"
                        wrap="wrap"
                        color="white"
                      >
                        {blog.user &&
                          (blog.user.name ? (
                            <Tag variantColor="teal" rounded="full">
                              <Avatar
                                src={
                                  blog.user.image_url
                                    ? `${baseUrl}${blog.user.image_url}`
                                    : ""
                                }
                                size="xs"
                                name={blog.user.name}
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel>{blog.user.name}</TagLabel>
                            </Tag>
                          ) : (
                            <Avatar
                              src={
                                blog.user.image_url
                                  ? `${baseUrl}${blog.user.image_url}`
                                  : ""
                              }
                              size="xs"
                              name={"profile pic"}
                            />
                          ))}

                        {authContext.isAuth &&
                        authContext.user.id === blog.user_id ? (
                          <Box>
                            <Link to={`/edit/${blog.id}`}>
                              <Tag size={"sm"} variantColor="cyan">
                                <AiOutlineEdit />
                              </Tag>
                            </Link>

                            <Tag
                              as="button"
                              onClick={() => context.deleteBlog(blog.id)}
                              size={"sm"}
                              variantColor="red"
                              ml={1}
                            >
                              <AiOutlineDelete />
                            </Tag>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Flex>
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
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        <PageLoader />
      )}
    </Box>
  );
};

export default Home;
