import { Component, SyntheticEvent } from "react";
import FrontLayout from "../components/frontLayout";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import axios from "axios"
import router from "next/router"

const Login = (props) => {

  const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
    var form = new FormData(e.currentTarget)

    axios.post("/api/login", {
      uname: form.get("uname"),
      pword: form.get("pword")
    }).then((response) => {
      window.localStorage.setItem("sessionID", response.data.sessionID)
      window.localStorage.setItem("userID", response.data.userID)
      window.localStorage.setItem("userType", response.data.userType)
      // if (form.get("remember")) {
      //   window.localStorage.setItem("uname", form.get("uname").toString())
      // }
      router.push("/[user]", `/${response.data.userID}`)
    })
  }


  return (
    <FrontLayout activeItem="login">
      <Header content="Login" />
      <Segment>
        <Form onSubmit={userLogin}>
          <Form.Field name="uname" control="input" required label="Username" />
          <Form.Field
            name="pword"
            control="input"
            required
            type="password"
            label="Password"
            Password
          />
          <Form.Group>
            {/*<Form.Checkbox name="remember" label="Remember Me" />*/}
            <Form.Button color="blue" content="Login" />
          </Form.Group>
        </Form>
      </Segment>
    </FrontLayout>
  );
}


export default Login;
