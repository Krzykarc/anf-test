import { render } from "@testing-library/react";

import contacts from '../src/contacts.json';
import { ContactList } from '../src/ContactList';

describe('ContactList Component', () => {
  it('should show contact lists', () => {
    const {
      getAllByText,
    } = render(
      <ContactList contacts={contacts} />
    );
    contacts.forEach((contact) => {
      getAllByText(contact.name)
    })
  });

  it('should call function on click', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ContactList contacts={contacts} onSelect={onSelect} />);
    const contactItem = getByText(contacts[1].name)
    contactItem.click();

    expect(onSelect).toBeCalledTimes(1);
  });
});
