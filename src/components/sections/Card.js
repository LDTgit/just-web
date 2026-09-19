import { Heading, Image, Text, VStack, Icon, Box } from "@chakra-ui/react";

import React from "react";

const Card = ({ id, icon, title, description, imageSrc}) => {
  return (
    <VStack backgroundColor="white" borderRadius="10px">
        {icon && (
          <Box my={2} display="flex" justifyContent="center">
            {typeof icon === 'string' && (icon.startsWith("data:") || icon.startsWith("/"))? (
              <Image src={icon} alt={'{title} icon'} boxSize="6rem" objectFit="contain" />
            ) : (
            <Icon as={icon} boxSize='1.5rem' color="#c5a059" />
            )}
          </Box>
        )}
        {/* Titlu si descriere */}
        <Box mt={2} px={4} py={2} textAlign="center">
          <Heading as="h3" size="m" color="black" style={{ marginBottom: '0.8rem'}}>{title}</Heading>
          <Text color="grey" fontSize='m' style={{ marginBottom: '0.8rem', textAlign: "justify"}}>{description}</Text>
        </Box>
    </VStack>
  );
};

export default Card;
