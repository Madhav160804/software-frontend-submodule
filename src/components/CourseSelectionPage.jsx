import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Container, Heading, Button, Flex } from '@chakra-ui/react';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';
import { useAdminContext } from '../context/AdminContext';

// Extend the Chakra theme if you want to maintain consistency
const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100',
      },
    },
  },
});

function CourseSelectionPage() {
  const navigate = useNavigate();
  const { adminUser } = useAdminContext(); // Get admin user context
  const facultyName = localStorage.getItem('facultyName');

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />

      <Box minH="100vh" bgGradient="linear(to-b, blue.100, purple.100)">
        <Container maxW="7xl" py={6}>
          {/* Center the content using Flex */}
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="80vh" // Adjust height to center the box
          >
            {/* Box for Course Selection with white background */}
            <Box
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              p={6} // Padding inside the box
              width="100%"
              maxW="500px" // Maximum width of the box
              textAlign="center"
            >
              {/* Course Selection Heading */}
              <Heading as="h2" size="2xl" mb={4} color="black">
                Select Course
              </Heading>
              <Box h="2px" bg="teal.400" borderRadius="md" mb={4} width="60px" mx="auto" />

              {/* Buttons */}
              <Flex justifyContent="center">
                <Button
                  onClick={() => navigate('/preference-viewing')} // Navigate to ProjectSelectionPage
                  colorScheme="blue"
                  size="lg"
                  variant="solid"
                  width="200px" // Decreased width of the button
                  height="60px" // Increased height of the button
                  mx={4} // Margin on the x-axis for spacing between buttons
                >
                  BTech
                </Button>
                <Button
                  onClick={() => navigate('/project-selection')} // Navigate to ProjectSelectionPage
                  colorScheme="blue"
                  size="lg"
                  variant="solid"
                  width="200px" // Decreased width of the button
                  height="60px" // Increased height of the button
                  mx={4} // Margin on the x-axis for spacing between buttons
                >
                  MTech
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default CourseSelectionPage;
