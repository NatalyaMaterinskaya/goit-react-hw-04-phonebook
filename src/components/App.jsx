import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle';

const localStorageContactsKey = "contacts";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(localStorageContactsKey);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(_, prevState) { 
    const { contacts: prevContacts } = prevState;
    const { contacts: nextContacts } = this.state;

    if (prevContacts.length !== nextContacts.length) {
      localStorage.setItem(
        localStorageContactsKey,
        JSON.stringify(nextContacts)
      );
    }
 } 

  handleChangeFilter = newName => {
    this.setState({ filter: newName });
  };

  getСontactByFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  handleAdd = newContact => {
    const { contacts } = this.state;
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevSate => {
      return {
        contacts: [...prevSate.contacts, newContact],
      };
    });
  };

  render() {
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
          <ContactForm onAdd={this.handleAdd} />
          {this.state.contacts.length > 0 && (
            <>
              <h2>Contacts</h2>
              <Filter
                value={this.state.filter}
                onChangeFilter={this.handleChangeFilter}
              />
              <ContactList
                contacts={this.getСontactByFilter()}
                onDelete={this.handleDelete}
              />
            </>
          )}
          <GlobalStyle />
        </div>
      </div>
    );
  }
}
