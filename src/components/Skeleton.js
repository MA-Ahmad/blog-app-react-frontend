import React from "react";
import { Box, Stack, Heading, Text, Skeleton } from "@chakra-ui/core";

import Dotdotdot from "react-dotdotdot";

import PageLoader from "./PageLoader";

const SkeletonFeed = () => {
  return (
    <Stack spacing={3}>
      {[1, 2, 3, 4, 5, 6].map(id => {
        return (
          <Box
            key={id}
            cursor="pointer"
            borderWidth="1px"
            shadow="md"
            bg="#fbfdff"
            position="relative"
            rounded="md"
            borderRadius="5px"
            height="10 rem"
          >
            <Skeleton height="35vh" borderRadius="5px 5px 0 0" width="100%" />
            <Stack isInline justifyContent="space-between" mt={2} p={5}>
              <Box width="100%">
                <Stack isInline align="center" marginBottom="5px">
                  <Box>
                    <Skeleton
                      size="sm"
                      width="2em"
                      height="2em"
                      borderRadius="50%"
                    />
                  </Box>
                  <Skeleton height="14px" width="20%" />
                </Stack>
                <Box pl="2.5em">
                  <Skeleton height="16px" width="100%" />
                  <Stack spacing={2} mt={1} isInline alignItems="center">
                    <Skeleton height="14px" width="80%" />
                  </Stack>
                  <Dotdotdot clamp={2}>
                    <Box
                      mt={2}
                      fontWeight="semibold"
                      as="p"
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      <Skeleton
                        height="8px"
                        width="100%"
                        rounded="full"
                        my={1}
                      />
                      <Skeleton
                        height="8px"
                        width="100%"
                        rounded="full"
                        my={1}
                      />
                      <Skeleton
                        height="8px"
                        width="100%"
                        rounded="full"
                        my={1}
                      />
                    </Box>
                  </Dotdotdot>
                </Box>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default SkeletonFeed;
