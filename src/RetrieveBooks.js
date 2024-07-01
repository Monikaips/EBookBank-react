import React, { useState, useRef, useEffect } from 'react';
import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

function RetrieveBooks() {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const booksRef = useRef(null); 

    const fetchBooks = async (e) => {
        e.preventDefault();
        if (!department || !semester) {
            alert('Please select both department and semester');
            return;
        }
        setLoading(true); 
        const q = query(collection(db, "books"), where("department", "==", department), where("semester", "==", semester));
        const querySnapshot = await getDocs(q);
        const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(fetchedBooks);
        setLoading(false);

        if (fetchedBooks.length === 0) {
            alert('No books found.');
        }
    };

    useEffect(() => {
        if (books.length > 0) {
            booksRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [books]);

    return (
        <div id="container">
            <div id="form-ui">
                <form id="form" onSubmit={fetchBooks}>
                    <div id="form-body">
                        <div id="welcome-lines">
                            <div id="welcome-line-1">Get Your Books</div>
                            <div id="welcome-line-2">Welcome to the Book Bank</div>
                        </div>
                        <div id="input-area">
                            <div className="form-inp">
                                <select value={department} onChange={e => setDepartment(e.target.value)} required>
                                    <option value="">Select Department</option>
                                    <option value="computer_science">Computer Science</option>
                                    <option value="electrical_engineering">Electrical Engineering</option>
                                    <option value="electronics_and_communication_engineering">Electronics and Communication Engineering</option>
                                    <option value="civil_engineering">Civil Engineering</option>
                                    <option value="mechanical_engineering">Mechanical Engineering</option>
                                    <option value="metallurgy_engineering">Metallurgical Engineering</option>
                                </select>
                            </div>
                            <div className="form-inp">
                                <select value={semester} onChange={e => setSemester(e.target.value)} required>
                                    <option value="">Select Semester</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                        </div>
                        <div id="submit-button-cvr">
                            <button id="submit-button" type="submit">Submit</button>
                        </div>
                        <div id="bar"></div>
                    </div>
                </form>
            </div>

            <div id="books-container" ref={booksRef} style={{ marginBottom: '40px' }}>
                {loading ? (
                    <p style={{
                        backgroundColor: 'black',
                        padding: '20px',
                        display: 'inline-block',
                        margin: '10px auto',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px'
                    }}>Fetching books...</p>
                ) : books.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        padding: '20px',
                        backgroundColor: 'black'
                    }}>
                        {books.map(book => (
                            <div key={book.id} style={{
                                margin: '10px',
                                padding: '20px',
                                backgroundColor: '#333',
                                borderRadius: '8px',
                                color: 'white',
                                width: 'calc(33% - 20px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
                            }}>
                                <h3>{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Subject:</strong> {book.subject}</p>
                                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default RetrieveBooks;
