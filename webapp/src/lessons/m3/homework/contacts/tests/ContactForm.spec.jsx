import { fireEvent, render } from "@testing-library/react";

import contacts from '../src/contacts.json';
import { ContactForm } from '../src/ContactForm';

describe('ContactForm Component', () => {
  it('should display name and details form input fields after a contact is selected', async () => {
    const contact = contacts[1];
    const { findByLabelText } = render(<ContactForm contact={contact} />);

    const nameInput = await findByLabelText('Name', { exact: false, selector: 'input' })
    const detailsInput = await findByLabelText('Details', { exact: false, selector: 'textarea' })
  });

  it('should change value on name input', async () => {
    const contact = { name: '', details: '' };
    const onChange = jest.fn();
    const { findByLabelText } = render(<ContactForm contact={contact} onChange={onChange} />);

    const nameInput = await findByLabelText('Name', { exact: false, selector: 'input' });
    fireEvent.change(nameInput, {target: {value: 'Monika'}})
    
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({
      name: 'Monika',
    }))
  });

  it('should change value on details  input', async () => {
    const contact = { name: '', details: '' };
    const onChange = jest.fn();
    const { findByLabelText } = render(<ContactForm contact={contact} onChange={onChange} />);

    const detailsInput = await findByLabelText('Details', { exact: false, selector: 'textarea'})
    fireEvent.change(detailsInput, {target: {value: 'Monika@email.com'}})

    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({
      details: 'Monika@email.com'
    }))
  });

  it('should call onSubmit with changed contact after the form is submitted', async () => {
    const onSubmit = jest.fn();
    const contact = { name: '', details: '' };
    const { findByText } = render(<ContactForm contact={contact} onSubmit={onSubmit} />);

    const submitButton = await findByText('Save')
    submitButton.click();

    expect(onSubmit).toHaveBeenLastCalledWith(expect.objectContaining(contact))
  });
})
