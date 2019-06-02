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
  text: initialText,
  onSubmit
}) => {
  const [mailTo, setMailTo] = useState(initialMailTo);
  const [subject, setSubject] = useState(initialSubject);
  const [text, setText] = useState(sanitize(initialText));

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ mailTo, subject, text: sanitize(text) });
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
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
      <button type="submit" className="EmailComposer__submit">
        Poslat
      </button>
      <div className="EmailComposer__html" dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
    </form>
  );
};

EmailComposer.propTypes = {
  mailTo: PropTypes.string,
  subject: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

EmailComposer.defaultProps = {
  mailTo: '',
  subject: '',
  text: ''
};

export default EmailComposer;
