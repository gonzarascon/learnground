import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';

const ActionButton = ({ icon, onClick, colorScheme }) => {
  return (
    <IconButton
      icon={icon}
      variant="solid"
      colorScheme={colorScheme}
      fontSize="3xl"
      alignSelf="flex-start"
      position="fixed"
      right="25px"
      bottom="25px"
      isRound
      w="50px"
      h="50px"
      p={10}
      onClick={onClick}
    />
  );
};

ActionButton.propTypes = {
  colorScheme: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

ActionButton.defaultProps = {
  colorScheme: '',
  onClick: () => console.log('action'),
};

export default ActionButton;
