
import React,{Component} from 'react';
import {Route,NavLink,withRouter,Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, 
    MenuItem, Glyphicon,Button,
    ButtonToolbar,ButtonGroup,Table, Panel  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'whatwg-fetch';

import IssueFilter from './IssueFilter.jsx';
import { PageTemplate} from '../layouts/main.jsx';
import Toast from '../ui/Toast.jsx';



const  IssueRow =(props,{ match }) =>{
    
    function onDeleteClick() {
        props.deleteIssue(props.issue._id);
    }
    

    return(
        <tr>
            <td>
                
                <NavLink to={`/issue-edit/${props.issue._id}`} >
                    {props.issue._id.substr(-4)}</NavLink></td>
            <td>{props.issue.status}</td>
            <td>{props.issue.owner}</td>
            <td>{props.issue.created.toDateString()}</td>
            <td>{props.issue.effort}</td>
            <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
            <td><NavLink to={`/issue-show/${props.issue._id}`}>{props.issue.title}</NavLink></td>
            <td><NavLink to={`/issue-edit/${props.issue._id}`} >Edit</NavLink>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </td>
        </tr>
    )
}   
IssueRow.propTypes = {
    deleteIssue: PropTypes.func,
}

function IssueTable(props) {
    
    
    const issueRows = props.issues.map(issue =>
        <IssueRow key={issue._id} issue={issue} 
            deleteIssue={props.deleteIssue} />);
    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </Table>
    )
}

IssueTable.propTypes = {
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired,
}
  
  
  
class IssueList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            issues: [] ,
            toastVisible: false, toastMessage: '', toastType: 'success',
        };  
       
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this); 
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
   
    //组件加载完成执行
    componentDidMount() {
       
        this.loadData();
        //console.log("List====",this.props);
    }

    //组件的任何一个属性发生变化时执行
    componentDidUpdate(prevProps) {
        const oldQuery = prevProps.location.search;
        const newQuery = this.props.location.search;
        if (oldQuery === newQuery) {
            return;
        }
        
        this.loadData();
    }
   
    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }
    
    dismissToast() {
        this.setState({ toastVisible: false });
    }

    setFilter(query) {
        
        let itemCount = 0;
        let queryStr = '';
        var arr = Object.keys(query);
        //if(arr.length == 0) query.status ='';
        for (var key in query){
            if(itemCount>0) queryStr +='&';
            queryStr += `${key}=${query[key]}`;
            itemCount ++;
        }
         
        this.props.history.push(`${this.props.location.pathname}?${queryStr}`);
        if(queryStr.length>0) {
            this.props.history.push(`${this.props.location.pathname}?${queryStr}`,query);
        }
        //let _pathname =  this.props.history.push(`${this.props.location.pathname}${query}`,newFilter);
       
        console.log('this.props.history==',this.props.history);
    }
   

    loadData() {
        fetch(`/api/issues${this.props.location.search}`).then(response =>
            response.json()
        ).then(data => {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if (issue.completionDate)
                    issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records });
        }).catch(err => {
            console.log(err);
        });
    }

   

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
            if (!response.ok) this.showError('Failed to delete issue');
            else this.loadData();
        });
    }

    render() {
        
        return (
            <PageTemplate>
                <Panel >
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><IssueFilter setFilter={this.setFilter}
                        initFilter={this.props.location} 
                    /></Panel.Body>
                </Panel>
               
                
                <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
                <hr />
               
                <Toast
                    showing={this.state.toastVisible} message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
            </PageTemplate>
        );
    }
}

IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withRouter(IssueList);
