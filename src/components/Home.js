import React, { useContext, useState, useEffect } from "react";
import { Box, Image, Badge, SimpleGrid } from "@chakra-ui/core";
import Dotdotdot from "react-dotdotdot";
import BlogContext from "../context/blog-context";
import { Link } from "react-router-dom";

const Home = () => {
  const context = useContext(BlogContext);
  const [blogId, setBlogId] = useState("");

  useEffect(() => {
    context.deleteBlog(blogId);
  }, [blogId]);

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
                  onClick={() => setBlogId(blog.id)}
                >
                  Delete
                </Badge>
              </Box>
              <Link to={`/edit/${blog.id}`}>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  shadow="md"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                >
                  <Image src="https://bit.ly/2Z4KKcF" alt="Blog image" />
                  <Box p="6">
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
                    <Box>
                      <Box as="span" color="gray.600" fontSize="sm">
                        <Badge rounded="full" px="2" variantColor="teal">
                          {blog.authorName}
                        </Badge>
                      </Box>
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
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
