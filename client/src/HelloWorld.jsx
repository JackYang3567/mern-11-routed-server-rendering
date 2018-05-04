import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class HelloWorld extends Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.props);
    }
  
    componentDidMount() {
      setTimeout(() => {
        this.setState({ addressee: 'Universe' });
      }, 100);
    }
  
    render() {
      return (
        <h1>Hello {this.state.addressee}!</h1>
      );
    }
  }
  
  HelloWorld.propTypes = {
    addressee: PropTypes.string,
  };
  
  HelloWorld.defaultProps = {
    addressee: '',
  };
