import { fireEvent, render } from "@testing-library/react";

import flushPromises from 'flush-promises';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';

import { ContactsContainer } from '../src/ContactsContainer';
import { ContactsService } from '../src/contacts.service';

describe('ContactsContainer Component', () => {
  it('a', () => {

  })
  function createMockService() {
    const data = [{
      id: '4567', name: 'candidate name', details: 'candidate details'
    }];

    const svc = new ContactsService(data);
    jest.spyOn(svc, 'getContacts');
    jest.spyOn(svc, 'saveContact');
    return svc;
  }

  it('should show candidates list when rendered', async () => {
    const mockService = createMockService();
    let findByText = null;
    await act(async () => {
      const wrapper = render(<ContactsContainer service={mockService} />);
      findByText = wrapper.findByText;
      await flushPromises();
    })

    expect(mockService.getContacts).toHaveBeenCalled();

    await flushPromises();

    await findByText('candidate name', {exact: false})
  });

  it('should call contactsService.saveContact() when form is submitted', async () => {
    const mockService = createMockService();
    let findByText = null;
    let findByLabelText = null;
    await act(async () => {
      const wrapper = render(<ContactsContainer service={mockService} />);
      findByText = wrapper.findByText;
      findByLabelText = wrapper.findByLabelText;
      await flushPromises();
    })

    expect(mockService.getContacts).toHaveBeenCalled();

    const contactItem = await findByText(mockService.contacts[0].name, {exact: false});
    fireEvent.click(contactItem);

    await act(async () => {
      const nameInput = await findByLabelText('Name', {exact: false, selector: 'input'});
      fireEvent.change(nameInput, {target: {value: 'Monika'}});
      await flushPromises();

      const detailsInput = await findByLabelText('Details', {exact: false, selector: 'textarea'});
      fireEvent.change(detailsInput, {target: {value: 'monia@gmail.com'}});
      await flushPromises();
  
      const saveButton = await findByText('Save');
      fireEvent.click(saveButton);
      await flushPromises();
    })

    expect(mockService.saveContact).toHaveBeenCalled();
  });

  it('should update contacts list when form is submitted', async () => {
    const mockService = createMockService();
    let findByText = null;
    let findByLabelText = null;

    await act(async () => {
      const wrapper = render(<ContactsContainer service={mockService} />);
      findByText = wrapper.findByText;
      findByLabelText = wrapper.findByLabelText;
      await flushPromises();
    })

    const newContactButton = await findByText('New contact', {exact: false});
    fireEvent.click(newContactButton);

    await act(async () => {
      const nameInput = await findByLabelText('Name', {exact: false, selector: 'input'});
      fireEvent.change(nameInput, {target: {value: 'Monika'}});
      await flushPromises();

      const detailsInput = await findByLabelText('Details', {exact: false, selector: 'textarea'});
      fireEvent.change(detailsInput, {target: {value: 'monia@gmail.com'}});
      await flushPromises();
  
      const saveButton = await findByText('Save');
      fireEvent.click(saveButton);
      await flushPromises();
    })

    await findByText('Monika', {exact: false});
  });
});
