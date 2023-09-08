import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle';

const localStorageContactsKey = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState('');
  const [filter, setFilter] = useState('');

  //Get data from local storage
  useEffect(() => {
    const savedContacts = localStorage.getItem(localStorageContactsKey);
    setContacts(JSON.parse(savedContacts) ?? []);
  }, []);

  //Set data to local storage
  useEffect(() => {
    if (!contacts) {
      return;
    }
    localStorage.setItem(localStorageContactsKey, JSON.stringify(contacts));
  }, [contacts]);

  const getСontactByFilter = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const isExist = (arr, newItem) =>
    arr.find(item => item.name.toLowerCase() === newItem.name.toLowerCase());

  const handleAdd = newContact => {
    if (isExist(contacts, newContact)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    return setContacts(prevSate => [...prevSate, newContact]);
  };

  const handleDelete = contactId =>
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );

  const handleChangeFilter = newName => setFilter(newName);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        margin: 40,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={handleAdd} />
        {contacts.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter value={filter} onChangeFilter={handleChangeFilter} />
            <ContactList
              contacts={getСontactByFilter()}
              onDelete={handleDelete}
            />
          </>
        )}
        <GlobalStyle />
      </div>
    </div>
  );
};
