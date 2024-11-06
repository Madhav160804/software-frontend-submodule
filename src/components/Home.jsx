import React from 'react';
import { ChakraProvider, Box, Container, SimpleGrid, VStack, Heading, Text, Card, CardHeader, CardBody, Button } from '@chakra-ui/react';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';
import { useAdminContext } from '../context/AdminContext';

// 1. Extend the Chakra theme to set up a dark mode
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
      a: {
        color: 'blue.400',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

// Mock user data
const user = {
  name: "Geetha V",
  status: "Admin",
  branch: "IT Dept",
  year: "2026"  
};

// Separate button links for students and faculty
const facultyButtons = [
  { name: "Student Allotment", url: "/btech-guide-allotment" },
  { name: "Marks Submission", url: "/b/Tw" },
  { name: "Reports", url: "/report" },
];

const studentButtons = [
  { name: "B-Tech Guide Allotment", url: "/btech-guide-allotment" },
  { name: "M-Tech Major Project Guide Allotment", url: "/mtech-major-guide-allotment" },
  { name: "M-Tech Minor Project Guide Allotment", url: "/mtech-minor-guide-allotment" },
  { name: "Reports", url: "/report" },
  { name: "Grades", url: "/b/student" }
];

const reminders = [
  "Submit Project Design by 1st November 2024",
  "Design Pattern - Seminar at 2 pm",
  "Guide Allotments have been completed"
];

function HomePage() {
  const { adminUser } = useAdminContext();

  // Determine button links based on user type
  const buttonLinks = adminUser === "faculty" ? facultyButtons : studentButtons;

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />

      <Box minH="100vh" bgGradient="linear(to-b, blue.100, purple.100)">
        {/* Main Content */}
        <Container maxW="7xl" py={6} bg="transparent">
          <Box textAlign="center" mb={6}>
            <Heading as="h2" size="2xl" mb={2} color="black" >
              Details and Reminders
            </Heading>
            <Box h="2px" bg="teal.400" borderRadius="md" mb={2} width="60px" mx="auto" />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* User Details */}
            <Card bg="white" color="gray.900">
              <CardHeader>
                <Box textAlign="center">
                  <Heading size="lg" color="gray.900" >
                    Profile
                  </Heading>
                  <Box h="1px" bg="teal.400" borderRadius="md" mb={2} width="40px" mx="auto" />
                </Box>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  <Text><strong>Name:</strong> {adminUser}</Text>
                  <Text><strong>Status:</strong> {adminUser}</Text>
                  <Text><strong>Branch:</strong> {user.branch}</Text>
                  <Text><strong>Year:</strong> {user.year}</Text>
                </VStack>
              </CardBody>
            </Card>

            {/* Reminders */}
            <Card bg="white" color="gray.900">
              <CardHeader>
                <Box textAlign="center">
                  <Heading size="lg" color="gray.900">
                    Reminders
                  </Heading>
                  <Box h="1px" bg="teal.400" borderRadius="md" mb={2} width="40px" mx="auto" />
                </Box>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  {reminders.map((reminder, index) => (
                    <Text key={index}>{reminder}</Text>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Buttons Section */}
          <Box mt={8}>
            <Box textAlign="center" mb={4}>
              <Heading as="h2" size="2xl" mb={2} color="black" >
                Links
              </Heading>
              <Box h="2px" bg="teal.400" borderRadius="md" mb={2} width="60px" mx="auto" />
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} justifyItems="center">
              {buttonLinks.map((button, index) => (
                <Button
                  key={index}
                  as="a"
                  href={button.url}
                  colorScheme="teal"
                  size="lg"
                  fontSize="lg"
                  variant="solid"
                  width="100%" // Make buttons full-width within the grid cell
                >
                  {button.name}
                </Button>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
