/* eslint-disable */
import { useEffect, useState } from 'react';

import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';

export const ContactsContainer = (props) => {
  const { service } = props;

  const [ state, setState ] = useState({
    contacts: [],
    selected: null
  })

  useEffect(() => {
    service.getContacts().then((contacts) => {
      setState({
        contacts,
        selected: null,
      });
    });
  }, [])

  const newContact = () => {
    setState({
      contacts: [...state.contacts],
      selected: {
        name: '',
        details: ''
      }
    });
  }

  const onSelect = (contact) => {
    setState({
      contacts: [...state.contacts],
      selected: contact
    });
  }

  const onSubmit = (contact) => {
    service.saveContact(contact).then(()=>{
      service.getContacts().then((contacts) => {
        setState({
          contacts,
        });
      });
    });
  }

  const onCancel = () => {
    setState({
      contacts: [...state.contacts],
      selected: null
    });
  }

  return <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Contacts</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <ContactList
            contacts={state.contacts}
            selected={state.selected}
            onSelect={onSelect}
          />
        </div>
        <div className="col-md-4">
          {state.selected
          ? (
            <ContactForm contact={state.selected}
              onChange={onSelect}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          ) : (
            <div>
              <button id="new-contact" onClick={newContact} className="btn btn-primary">New contact</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </>;
}
