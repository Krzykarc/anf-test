/* eslint-disable */
import React from 'react';

export const ContactList = (props) => {
  const { contacts = [] } = props;

  return <>
    <div className="list-group">
      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={(e) => props.onSelect(contact)}
          className={`list-group-item ${props.selected && (props.selected.id === contact.id) ? 'active' : ''}`}
        >
          {contact.name}
        </button>
      ))}
    </div>
  </>
}
