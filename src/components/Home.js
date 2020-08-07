import React, { useContext } from "react";
import { Box, Image, Badge, SimpleGrid } from "@chakra-ui/core";
import Dotdotdot from "react-dotdotdot";
import BlogContext from "../context/blog-context";
import { Link } from "react-router-dom";

const Home = () => {
  const context = useContext(BlogContext);

  console.log(context.blogs);
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
            <Link to={`/edit/${blog.id}`} key={blog.id}>
              <Box
                maxW="sm"
                borderWidth="1px"
                shadow="md"
                rounded="lg"
                overflow="hidden"
              >
                <Image src="https://bit.ly/2Z4KKcF" alt="Blog image" />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge rounded="full" px="2" variantColor="teal">
                      New
                    </Badge>
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
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
