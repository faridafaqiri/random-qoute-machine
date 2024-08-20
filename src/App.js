import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#282c34');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const { quote, author } = data.quotes[randomIndex];
      setQuote(quote);
      setAuthor(author);

      const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#C75B7A', '#0C1844', '#803D3B'];
      setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
    } catch (error) {
      setError('Failed to fetch quote. Please try again later.');
      console.error('Fetch error:', error); // eslint-disable-line no-console
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App" style={{ backgroundColor }}>
      <div id="quote-box" className="quote-box">
        {error ? (
          <div id="error-message" className="error-message">
            {error}
          </div>
        ) : (
          <>
            <div id="text" className="text">
              <p>{quote}</p>
            </div>
            <div id="author" className="author">
              <p>- {author}</p>
            </div>
            <button
              id="new-quote"
              className="new-quote"
              onClick={fetchQuote}
              style={{ backgroundColor }}
              type="button" // Added type attribute
            >
              New Quote
            </button>
            <div id="tweet-quote" className="tweet-quote">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="twitter-link"
                style={{ backgroundColor }}
              >
                <FontAwesomeIcon icon={faTwitter} className="twitter-icon" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
