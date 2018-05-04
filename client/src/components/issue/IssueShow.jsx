import React,{Component} from 'react';
import {NavLink } from 'react-router-dom';
import { PageTemplate} from '../layouts/main.jsx';

export default class IssueShow extends Component {
    constructor() {
        super();
       
    }
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <PageTemplate>
                <p>This is a placeholder for editing issue {this.props.match.params.id}.</p>
                <NavLink to="/issues">Back to issue list</NavLink>
            </PageTemplate>
        );
    }
}

