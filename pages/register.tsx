import React, { useState } from "react";
import Layout from "../components/frontLayout"
import { Container, Form, Segment, Header } from "semantic-ui-react";
import { types } from "../classes/user";
import axios from "axios"
import router from "next/router";

const Register = (props) => {
  const [options, setOptions] = useState([])
  const [accType, setAccType] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [unameError, setUnameError] = useState(null)


  const userRegister = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("userRegister")
    var user = new FormData(e.currentTarget)

    axios.post("/api/register", {
      fname: user.get("fname"),
      sname: user.get("sname"),
      email: user.get("email"),
      uname: user.get("uname"),
      pword: user.get("pword"),
      acctype: accType
    }).then(r => {
      if (r.status == 201) {
        window.localStorage.setItem("userID", r.data.userID)
        window.localStorage.setItem("sessionID", r.data.sessionID)
        window.localStorage.setItem("userType", r.data.userType)
        router.push("/[user]", `/${r.data.userID}`)
      } else if (r.status == 208) {
        r.data.messages.map(i => {
          if (i.type == "email") {
            setEmailError(i.message)
          }

          if (i.type == "username") {
            setUnameError(i.message)
          }
        })
      }
    })
  }



  if (options.length == 0) {
    for (let v in types) {
      if (typeof types[v] === 'number') {
        if (parseInt(types[v]) > 0) {
          options.push({ key: parseInt(types[v]), text: v, value: parseInt(types[v]) })
        }
      }
    }
  }

  return (
    <Layout activeItem="register">
      <Container>
        <Header content="Register" />
        <Segment>
          <Form onSubmit={userRegister}>
            <Form.Group widths="equal">
              <Form.Input name="fname" required label="Forename" placeholder="John" />
              <Form.Input name="sname" required label="Surname" placeholder="Smith" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input name="email" required label="Email Address" placeholder="JohnSmith123@gmail.com" type="email" error={emailError} onChange={() => { setEmailError(null) }} />
              <Form.Input name="uname" required label="Username" placeholder="JohnSmith123" error={unameError} onChange={() => { setUnameError(null) }} />
              <Form.Input name="pword" required type="password" label="Password" />
            </Form.Group>
            <Form.Dropdown name="acctype" label="Role" required selection placeholder="I am a..." fluid options={options} onChange={(i, { value }) => { setAccType(value) }} />
            <Form.Button content="Submit" />
          </Form>
        </Segment>
      </Container>
    </Layout>
  )
}



export default Register