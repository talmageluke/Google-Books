import React, { Component } from 'react'
import Navbar from "../Navbar"
import "./Saved.css"
import axios from 'axios'
import { backendURL } from '../../utils'




export default class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchKey: "",
            loading: false,
            books: [],



        }

    }

    componentDidMount() {

        axios.get(`http://localhost:5000/api/books`)
            .then(res => {
                this.setState({

                    books: res.data
                })
                console.log(res.data)
            })
            .catch(err => { console.log(err) })

    }
    handleDelete = (book) => {
        axios.delete(`http://localhost:5000/api/books/${book._id}`)
            .then(res => {
                let books = this.state.books.filter(b => b._id !== book._id)
                this.setState({ books })
            })
            .catch(err => { console.log(err) })


    }


    render() {
        const { books } = this.state

        return (
            <React.Fragment>
                <Navbar />
                <div className='container'>

                    <div className="title_div">
                        <h2>
                            Saved Books
                    </h2>
                        <p className="title_text">
                            Here are your saved books
                    </p>
                    </div>
                </div>

                {books.length === 0 ? (
                    <div className='container'>
                        <p> No saved books!</p>
                    </div>
                ) : (
                        <div className='container'>
                            <div className='results_div'>
                                {books.map(book => (
                                    <React.Fragment
                                        key={book.id}>
                                        <div className="book_div">
                                            <div className="flex">
                                                <div className="book_title">

                                                    <p style={{ fontSize: "14px" }}>{book.title}</p>
                                                    <p>Written by {book.author}</p>

                                                </div>
                                                <div className="book_buttons">
                                                    <button
                                                        onClick={() => window.open(book.previewLink)}
                                                    >View</button>
                                                    <button
                                                        onClick={() => this.handleDelete(book)}
                                                    >Delete</button>
                                                </div>
                                            </div>
                                            <div className="description">
                                                {book.thumbnail ? (
                                                    <img
                                                        src={book.thumbnail}
                                                        alt={book.id}
                                                        style={{ height: "200px", width: "145px" }}
                                                    />
                                                ) : null}
                                                <p>{book.details}</p>

                                            </div>
                                        </div>

                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )
                }



            </React.Fragment>

        )
    }
}
