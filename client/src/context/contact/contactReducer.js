import {
    GET_CONTACTS,
    ADD_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    DELETE_CONTACT,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact._id !== action.payload
                ),
                loading: false
            };
        case SET_CURRENT:
            return { ...state, current: action.payload };
        case CLEAR_CURRENT:
            return { ...state, current: null };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact._id === action.payload._id
                        ? action.payload
                        : contact
                ),
                filtered: state.filtered
                    ? state.filtered.map((contact) =>
                          contact._id === action.payload._id
                              ? action.payload
                              : contact
                      )
                    : null,
                loading: false
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regEx = new RegExp(`${action.payload}`, "gi");
                    return (
                        contact.name.match(regEx) || contact.email.match(regEx)
                    );
                }),
                loading: false
            };
        case CLEAR_FILTER:
            return { ...state, filtered: null };
        case CONTACT_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            };
        default:
            return state;
    }
};
