import axios from 'axios';
import { Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      confirmPassword: "",
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  // Stores input values from form into state variables
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  // Check if entered password and confirm password match
  comparePassword=()=>{
      if(this.state.password!==this.state.confirmPassword){
        alert("Password and confirm password don't match")
        return false;
      }else
        return true;
  }

  async handleSubmit(e){
    e.preventDefault();
    if(this.comparePassword()){
        console.log(this.state);
        const {username,password} = this.state;
        let data = {
            username,
            password,   
        }
        try {
          const res = await axios.post("http://localhost:8080/users/signup/", data);
          console.log(res.data);
          if(res.data.success){
              alert(res.data.message);
              // After registration, redirect to login
              window.location.replace('/');
          }else
              alert(res.data.err);
        }catch(error){
          console.log(error);
        }
    }    
  }
  render() {
    return (
        <div>
          <div className="form-form">
            <Form>
              <h3 className="form-heading">
                Register
              </h3>
              <Form.Group controlId="username">
                <Form.Control type="text" className="item" name="username" placeholder="Username" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control type="password"  className="item" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="confirmpassword">
                <Form.Control type="password"  className="item" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="submitbutton">
                <Button type="submit" onClick={this.handleSubmit} className="create-account">Register</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }
    
}

export default Register;