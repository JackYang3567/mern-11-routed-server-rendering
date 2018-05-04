import React,{Component} from 'react';

import { Link} from 'react-router-dom';

export default class IssueFilter extends Component { 
    render() {
        const Separator = () => <span> | </span>;
        return (
            <div>
                <Link to="/issues">All Issues</Link>
                <Separator />
                <Link  to={{
                    pathname: '/issues',
                    search:'?status=Open',
                    hash: '#hash'
                }}>Open Issues</Link>
                <Separator />
                <Link to="/issues?status=Assigned">Assigned Issues</Link>
            </div>
        );
    }
}
