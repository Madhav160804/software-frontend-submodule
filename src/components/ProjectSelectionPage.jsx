import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Container, Heading, Button, Flex } from '@chakra-ui/react';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900', // Set global body background color
        color: 'gray.100',
      },
    },
  },
});

function ProjectSelectionPage() {
  const navigate = useNavigate();
  const facultyName = localStorage.getItem('facultyName');

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />

      <Box minH="100vh" bgGradient="linear(to-b, blue.100, purple.100)"> {/* Background gradient for the page */}
        <Container maxW="7xl" py={6}>
          <Flex direction="column" justifyContent="center" alignItems="center" height="80vh">
            <Box bg="white" borderRadius="md" boxShadow="lg" p={6} width="100%" maxW="500px" textAlign="center">
              <Heading as="h2" size="2xl" mb={4} color="black">
                Select Minor or Major Project
              </Heading>
              <Box h="2px" bg="teal.400" borderRadius="md" mb={4} width="60px" mx="auto" />
              <Flex justifyContent="center">
                <Button
                  onClick={() => navigate('/preference-viewing-minor')}
                  colorScheme="blue"
                  size="lg"
                  variant="solid"
                  width="200px"
                  height="60px"
                  mx={4}
                >
                  Minor Project
                </Button>
                <Button
                  onClick={() => navigate('/preference-viewing-major')}
                  colorScheme="green"
                  size="lg"
                  variant="solid"
                  width="200px"
                  height="60px"
                  mx={4}
                >
                  Major Project
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default ProjectSelectionPage;
