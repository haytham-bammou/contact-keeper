import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personnal",
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personnal",
      });
    }
  }, [contactContext, current]);

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    e.preventDefault();
  };

  const clearAll = () => {
    clearCurrent();
  };
  const { name, email, phone, type } = contact;
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {!current ? "Add Contact" : "update Contact"}
      </h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personnal"
        checked={type === "personnal"}
        onChange={onChange}
      />{" "}
      Personnal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <input
        type="submit"
        value={!current ? "Add Contact" : "Update Contact"}
        className="btn btn-primary btn-block"
      />
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            CLEAR
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
