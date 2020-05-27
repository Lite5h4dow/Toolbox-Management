import React, { Component } from "react";
import Layout from "../components/frontLayout"
import { Container, Form, Segment, Header } from "semantic-ui-react";
import { types } from "../classes/user";
import axios from "axios"

interface RegisterState {
  options: Array<{ key: number, text: string, value: number }>
  accType: any
  emailError: any
  unameError: any
}

class Register extends Component<{}, RegisterState>{
  constructor(props) {
    super(props)
    this.state = { options: [], accType: null, emailError: null, unameError: null }
    this.userRegister = this.userRegister.bind(this)
  }

  userRegister(e: React.FormEvent<HTMLFormElement>) {
    var user = new FormData(e.currentTarget)

    axios.post("/api/register", {
      fname: user.get("fname"),
      sname: user.get("sname"),
      email: user.get("email"),
      uname: user.get("uname"),
      pword: user.get("pword"),
      acctype: this.state.accType
    }).then(r => {
      if (r.status == 201) {

      } else if (r.status == 208) {
        r.data.messages.map(i => {
          if (i.type == "email") {
            this.setState({ emailError: i.message })
          }

          if (i.type == "username") {
            this.setState({ unameError: i.message })
          }
        })
      }
    })
  }


  render() {
    if (this.state.options.length == 0) {
      for (let v in types) {
        if (typeof types[v] === 'number') {
          if (parseInt(types[v]) > 0) {
            this.state.options.push({ key: parseInt(types[v]), text: v, value: parseInt(types[v]) })
          }
        }
      }
    }

    return (
      <Layout activeItem="register">
        <Container>
          <Header content="Register" />
          <Segment>
            <Form onSubmit={this.userRegister}>
              <Form.Group widths="equal">
                <Form.Input name="fname" required label="Forename" placeholder="John" />
                <Form.Input name="sname" required label="Surname" placeholder="Smith" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input name="email" required label="Email Address" placeholder="JohnSmith123@gmail.com" type="email" error={this.state.emailError} onChange={() => { this.setState({ emailError: null }) }} />
                <Form.Input name="uname" required label="Username" placeholder="JohnSmith123" error={this.state.unameError} onChange={() => { this.setState({ unameError: null }) }} />
                <Form.Input name="pword" required type="password" label="Password" />
              </Form.Group>
              <Form.Dropdown name="acctype" label="Role" required selection placeholder="I am a..." fluid options={this.state.options} onChange={(i, { value }) => { this.setState({ accType: value }) }} />
              <Form.Button content="Submit" />
            </Form>
          </Segment>
        </Container>
      </Layout>
    )
  }
}


export default Register