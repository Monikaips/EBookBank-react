import React, { useState, useRef } from 'react';
import './App.css';
import BookForm from './BookForm';
import RetrieveBooks from './RetrieveBooks';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import logo from './images/logo.jpg';

function App() {
    const [view, setView] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            setView('search');
        } else {
            setView('home');
        }
    };

    const mainContentRef = useRef(null);

    const handleButtonClick = () => {
        if (mainContentRef.current) {
            const offsetTop = mainContentRef.current.offsetTop;
            const windowHeight = window.innerHeight;
            const scrollPosition = offsetTop - (windowHeight / 2);

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="App">
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '100px' }} />
                </div>
                <h1>Welcome to GCE Book Bank</h1>
                <SearchBar onSearch={handleSearch} />
            </header>
            <div className="sub-nav">
                <ul>
                    <li><button onClick={() => setView('home')}>Home</button></li>
                    <li><button onClick={() => { setView('upload'); handleButtonClick(); }}>Donate Books</button></li>
                    <li><button onClick={() => { setView('retrieve'); handleButtonClick(); }}>Get Books</button></li>
                </ul>
            </div>
            <main ref={mainContentRef}>
                {view === 'upload' && <BookForm />}
                {view === 'retrieve' && <RetrieveBooks />}
                {view === 'home' && (
                    <div className="welcome-message">
                        <p>Welcome to the home page. Select an option above.</p>
                        <p>Explore our vast collection of books and contribute to knowledge sharing!</p>
                        <p>Don't just read, let's share knowledge!</p>
                    </div>
                )}
                {view === 'search' && <SearchResults searchInput={searchQuery} />}
            </main>
            <footer className="footer">
            <p>@<a href="https://www.linkedin.com/in/monika-p-30b32a22a/" target="_blank" rel="noopener noreferrer">Developed by Monika</a></p>
            </footer>
        </div>
    );
}

export default App;
