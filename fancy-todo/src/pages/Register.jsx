import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  goHome(e) {
    e.preventDefault()
    this.props.history.push('/')
  }
  render() { 
    return (
      <div>
        Ini Register page kata tio
        <button onClick={(e) => this.goHome(e) } >rumah</button>
      </div>
      );
  }
}
 
export default Register;