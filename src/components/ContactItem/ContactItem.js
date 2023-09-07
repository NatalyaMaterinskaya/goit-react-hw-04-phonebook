import PropTypes from 'prop-types';
import { Text, Btn } from './ContactItem.styled';

export const ContactItem = ({ contact: { id, name, number }, onDelete }) => {
  return (
    <>
      <Text>{name}</Text>
      <Text>{number}</Text>
      <Btn type="button" onClick={() => onDelete(id)}>
        Delete
      </Btn>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.objectOf(PropTypes.string).isRequired,
};
