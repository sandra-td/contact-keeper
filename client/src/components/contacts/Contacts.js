import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";
const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //es-lint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>;
    }
    return (
        <React.Fragment>
            {contacts && !loading ? (
                <TransitionGroup>
                    {filtered
                        ? filtered.map((contact) => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))
                        : contacts.map((contact) => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={400}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </React.Fragment>
    );
};

export default Contacts;
