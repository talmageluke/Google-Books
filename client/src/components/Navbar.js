import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import "../App.css"
import { RouteStrings } from "../App"

export default class Navbar extends Component {
    render() {
        return (
            <div className="header">
                <h3>Google Books</h3>
                <NavLink
                    to={RouteStrings.search}
                >
                    <p>Search</p>
                </NavLink>
                <NavLink
                    to={RouteStrings.saved}
                >
                    <p>Saved</p>
                </NavLink>
            </div>
        )
    }
}
