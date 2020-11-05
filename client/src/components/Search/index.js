import React, { Component } from 'react'
import Navbar from "../Navbar"
import "./Search.css"
import axios from 'axios'
// import { CircularProgressbar } from 'react-circular-progressbar'



export default class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchKey: "",
            loading: false,
            googleBooksURL: "https://www.googleapis.com/books/v1/volumes?q=",
            apiKey: "&key=AIzaSyCRswXUbciTy3YwuoKu1Wz742k8LB7G6tE",
            results: [],
            totalItems: 0

        }

    }

    handleSearch = (event) => {
        event.preventDefault()
        this.setState({
            loading: true,
            results: [],
        })
        console.log(this.state.searchKey)
        axios.get(`${this.state.googleBooksURL}${this.state.searchKey}${this.state.apiKey}&maxResults=40`)
            .then(res => {
                if (res.data.totalItems > 0) {
                    this.setState({
                        loading: false,
                        results: res.data.items,
                        totalItems: res.data.totalItems
                    })
                }
                else {
                    this.setState({
                        loading: false,
                        totalItems: res.data.totalItems,
                        results: []
                        // totalItems: res.data.totalItems
                    })
                }

                console.log(res.data.items)
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleChange = (event) => {
        this.setState({
            searchKey: event.target.value
        })
    }
    handleSave = (book) => {

        axios.post(`http://localhost:5000/api/books`, {
            "title": book.volumeInfo.title,
            "author": book.volumeInfo.authors[0],
            "details": book.volumeInfo.description,
            "thumbnail": book.volumeInfo.imageLinks.thumbnail,
            "previewLink": book.volumeInfo.previewLink
        })
            .then(res => {
                alert(`${book.volumeInfo.title} has been added to favorites!`)
            })
            .catch(err => { console.log(err) })

    }
    render() {
        const { loading, results, totalItems } = this.state

        return (
            <React.Fragment>
                <Navbar />
                <div className='container'>

                    <div className="title_div">
                        <h2>
                            (React) Google Books Search
                    </h2>
                        <p className="title_text">
                            Search for and Save Books of Interest
                    </p>
                    </div>
                </div>
                <div className='container'>

                    <div className="search_div">
                        <p>
                            Book Search
                    </p>
                        <div style={{ padding: "10px" }}>
                            <form
                                onSubmit={this.handleSearch}
                            >
                                <input className="search_input" onChange={this.handleChange} value={this.state.searchKey} />
                                <button type="submit" >Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                {totalItems === 0 ? (
                    <div className='container'>
                        <p> no result found!</p>
                    </div>
                ) : (
                        <div className='container'>
                            <div className='results_div'>
                                <h4>Search Results</h4>
                                {results.map(book => (
                                    <React.Fragment
                                        key={book.id}>
                                        <div className="book_div">
                                            <div className="flex">
                                                <div className="book_title">

                                                    <p style={{ fontSize: "14px" }}>{book.volumeInfo.title}</p>
                                                    <p>Written by {book.volumeInfo.authors}</p>

                                                </div>
                                                <div className="book_buttons">
                                                    <button
                                                        onClick={() => window.open(book.volumeInfo.previewLink)}
                                                    >View</button>
                                                    <button
                                                        onClick={() => this.handleSave(book)}
                                                    >Save</button>
                                                </div>
                                            </div>
                                            <div className="description">
                                                {book.volumeInfo.imageLinks ? (
                                                    <img
                                                        src={book.volumeInfo.imageLinks.thumbnail}
                                                        alt={book.volumeInfo.id}
                                                    />
                                                ) : null}
                                                <p>{book.volumeInfo.description}</p>

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
