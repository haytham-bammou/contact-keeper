import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import Contact from "./ContactItem";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4> Please Add a Contact</h4>;
  }
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
