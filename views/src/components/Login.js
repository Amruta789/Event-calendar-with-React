import axios from 'axios';
import { Component} from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e){
    e.preventDefault();
    console.log(this.state);
    const {username,password} = this.state;
    let data={
        username,
        password,   
    }

    try {
      const res = await axios.post("http://localhost:8080/users/signin/", data);
      console.log(res.data);
      if(res.data.success){
        alert(res.data.message);
        if(res.data.result.username==='Admin')
            window.location.replace('/admincalendar');
        else
            window.location.replace('/calendar');
      }else
        alert(res.data.err);
    }catch(error){
      console.log(error);
    }
  }
  render() {
    return (
        <div>
          <div className="form-form">
            <Form>
              <h3 className="form-heading">
                Login
              </h3>
              <Form.Group controlId="username">
                <Form.Control type="text" className="item" name="username" placeholder="Username" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control type="password"  className="item" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Link to="/register">Don't have an acccount? Click here to Register.</Link>
              <Form.Group controlId="submitbutton">
                <Button type="submit" onClick={this.handleSubmit} className="create-account">Next</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }
    
}

export default Login;