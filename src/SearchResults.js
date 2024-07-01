import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

function SearchResults({ searchInput }) {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            try {
                const booksRef = collection(db, "books");
                const snapshot = await getDocs(booksRef);
                const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFilteredBooks(books.filter(book =>
                    book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
                    book.department.toLowerCase().includes(searchInput.toLowerCase()) ||
                    book.subject.toLowerCase().includes(searchInput.toLowerCase())
                ));
            } catch (error) {
                console.error("Error fetching books:", error);
                alert('Failed to fetch books.');
            }
            setLoading(false);
        }

        fetchBooks();
    }, [searchInput]);

    return (
        <div className="search-results-container">
            <h2>Search Results</h2>
            {loading ? <p>Loading...</p> : (
                <div className="books-grid">
                    {filteredBooks.length > 0 ? filteredBooks.map(book => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Department:</strong> {book.department}</p>
                            <p><strong>Subject:</strong> {book.subject}</p>
                            <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
                        </div>
                    )) : <p>No books found.</p>}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
