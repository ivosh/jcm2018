import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import './EmailComposer.css';

const sanitizerOptions = {
  allowedTags: ['b', 'br', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    a: ['href']
  }
};
const sanitize = html => sanitizeHtml(html, sanitizerOptions);

// eslint-disable react/no-danger
const EmailComposer = ({
  mailTo: initialMailTo,
  subject: initialSubject,
  body: initialBody,
  onSubmit
}) => {
  const [mailTo, setMailTo] = useState(initialMailTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(sanitize(initialBody));
  const [sending, setSending] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setSending(true);
    await onSubmit({ mailTo, subject, body: sanitize(body) });
    setSending(false);
  };

  return (
    <form className="EmailComposer" onSubmit={handleSubmit}>
      <label htmlFor="komu">Komu:</label>
      <input
        type="text"
        id="komu"
        name="komu"
        value={mailTo}
        onChange={({ target: { value } }) => setMailTo(value)}
      />
      <label htmlFor="predmet">Předmět:</label>
      <input
        type="text"
        id="predmet"
        name="predmet"
        value={subject}
        onChange={({ target: { value } }) => setSubject(value)}
      />
      <textarea
        className="EmailComposer__text"
        rows={10}
        value={body}
        onChange={({ target: { value } }) => setBody(value)}
      />
      <button type="submit" className="EmailComposer__submit" disabled={sending}>
        Poslat
      </button>
      <div className="EmailComposer__html" dangerouslySetInnerHTML={{ __html: sanitize(body) }} />
    </form>
  );
};

EmailComposer.propTypes = {
  mailTo: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

EmailComposer.defaultProps = {
  mailTo: '',
  subject: '',
  body: ''
};

export default EmailComposer;
