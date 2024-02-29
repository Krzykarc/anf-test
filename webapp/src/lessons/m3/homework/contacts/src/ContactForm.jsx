/* eslint-disable */
import React from 'react';

export const ContactForm = (props) => {
 const defaultContact = {
    name: '',
    details: ''
  }

  const { contact = defaultContact } = props;

  const onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    props.onChange({
      ...contact,
      [name]: value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.contact);
  }

  return <>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="d-block w-100">
          Name:
          <input
            className="form-control"
            name="name"
            value={props.contact.name}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="d-block w-100">
          Contact details:
          <textarea
            className="form-control"
            name="details"
            value={props.contact.details}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group">
        <input
          type="button"
          id="cancel-contact"
          className="btn btn-default"
          value="Cancel"
          onClick={props.onCancel}
        />
        <input
          type="submit"
          id="save-contact"
          className="btn btn-primary ml-2"
          value="Save"
        />
      </div>
    </form>
  </>;
}
