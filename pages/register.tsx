import React, { useState, SyntheticEvent } from "react";
import Layout from "../components/frontLayout"
import { Container, Form, Segment, Header, Grid, GridColumn } from "semantic-ui-react";
import { Roles, AccessLevels, GroupTypes } from "../classes/user";
import axios from "axios"
import router from "next/router";

const Register = (props) => {
  const [options, setOptions] = useState([])
  const [accType, setAccType] = useState(null)
  const [newEmailError, setNewEmailError] = useState(null)
  const [newUnameError, setNewUnameError] = useState(null)
  const [newCurrentPass, setNewCurrentPass] = useState(null)
  const [newPassConfirmError, setNewPassConfirmError] = useState(null)
  const [companyNameError, setCompnayNameError] = useState(null)
  const [joinEmailError, setJoinEmailError] = useState(null)
  const [joinUnameError, setJoinUnameError] = useState(null)
  const [joinCurrentPass, setJoinCurrentPass] = useState(null)
  const [joinPassConfirmError, setJoinPassConfirmError] = useState(null)
  const [createGroup, setCreateGroup] = useState(false)
  const [newCompanyNameError, setNewCompanyNameError] = useState(null)

  const companyNameRegex = new RegExp('^([a-z]{5,50})#([0-9]{4})$', 'gi')


  const joinGroup = (e: React.FormEvent<HTMLFormElement>) => {
    if (companyNameError == null && joinPassConfirmError == null) {
      console.log(e)
    }
  }


  const userRegister = (e: React.FormEvent<HTMLFormElement>) => {
    if (newPassConfirmError == null && joinPassConfirmError == null && newCompanyNameError == null) {
      var user = new FormData(e.currentTarget)

      axios.post("/api/register", {
        fname: user.get("fname").toString().toLowerCase().trim(),
        sname: user.get("sname").toString().toLowerCase().trim(),
        email: user.get("email").toString().toLowerCase().trim(),
        uname: user.get("uname").toString().trim(),
        pword: user.get("pword").toString().trim(),
        access: accType == Roles.Cleaning_Group || accType == Roles.Property_Group ? AccessLevels.Admin : AccessLevels.Worker,
        createGroup: createGroup,
        groupType: accType == null ? null : accType < Roles.Cleaning_Group ? null : accType - 2,
        groupName: user.get("groupName").toString().trim()

      }).then(r => {
        if (r.status == 201) {
          window.localStorage.setItem("userID", r.data.userID)
          window.localStorage.setItem("sessionID", r.data.sessionID)
          window.localStorage.setItem("userType", r.data.userType)
          router.push("/[user]", `/${r.data.userID}`)
        } else if (r.status == 208) {
          r.data.messages.map(i => {
            if (i.type == "email") {
              setNewEmailError(i.message)
            }

            if (i.type == "username") {
              setNewUnameError(i.message)
            }
          })
        }
      })
    }

  }



  if (options.length == 0) {
    for (let v in Roles) {
      if (typeof Roles[v] === 'number') {
        if (parseInt(Roles[v]) > 0) {
          const name = v.replace("_", " ")
          options.push({ key: parseInt(Roles[v]), text: name, value: parseInt(Roles[v]) })
        }
      }
    }
  }

  return (
    <Layout activeItem="register">
      <Container>
        <Header content="Register" />
        <Segment>
          <Grid divided columns="2" stackable>
            <Grid.Column>
              <Header content="New User" />
              <Form onSubmit={userRegister}>
                <Form.Group widths="equal">
                  <Form.Input name="fname" required label="Forename" placeholder="John" />
                  <Form.Input name="sname" required label="Surname" placeholder="Smith" />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input name="email" required label="Email Address" placeholder="JohnSmith123@gmail.com" type="email" error={newEmailError} onChange={() => {
                    setNewEmailError(null)
                  }} />
                  <Form.Input name="uname" required label="Username" placeholder="JohnSmith123" error={newUnameError} onChange={() => {
                    setNewUnameError(null)
                  }} />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input name="pword" required type="password" label="Password" onChange={(i, { value }) => { setNewCurrentPass(value) }} />
                  <Form.Input name="pwordcon" required type="password" label="Confirm Password" error={newPassConfirmError} onChange={(i, { value }) => {
                    setNewPassConfirmError(value == newCurrentPass ? null : "Password Confirmation doesn't Match Password")
                  }} />
                </Form.Group>
                <Form.Dropdown name="acctype" label="Role" required selection placeholder="I am a..." fluid options={options} onChange={(i, { value }) => {
                  setAccType(value)
                  setCreateGroup(value == Roles.Cleaning_Group || value == Roles.Property_Group)
                }} />
                <Form.Input name="groupName" width="14" required={createGroup} disabled={!createGroup} label="Group Name" error={newCompanyNameError} onChange={(i, { value }) => {
                  setNewCompanyNameError(new RegExp('^[a-z]{5,50}$', 'gi').test(value) || value == "" ? null : "Company name must be between 5-50 charachters in length")
                }} />
                <Form.Button content="Submit" color="green" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Header content="Join a Group" />
              <Form onSubmit={joinGroup}>
                <Form.Input name="groupID" required label="Group ID" placeholder="SpickNSpan#1234" error={companyNameError} onChange={(i, { value }) => {
                  setCompnayNameError(companyNameRegex.test(value) ? null : "Company ID must be between 5-50 characters long and followed by # and 4 numbers")
                }} />
                <Form.Group widths="equal">
                  <Form.Input name="fname" required label="Forename" type="" placeholder="John" />
                  <Form.Input name="sname" required label="Surname" placeholder="Smith" />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input name="email" required label="Email Address" placeholder="JohnSmith123@gmail.com" type="email" error={joinEmailError} onChange={() => {
                    setJoinEmailError(null)
                  }} />
                  <Form.Input name="uname" required label="Username" placeholder="JohnSmith123" error={joinUnameError} onChange={() => {
                    setJoinUnameError(null)
                  }} />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input name="pword" required type="password" label="Password" onChange={(i, { value }) => {
                    setJoinCurrentPass(value); console.log(joinCurrentPass)
                  }} />
                  <Form.Input name="pwordcon" required type="password" label="Confirm Password" error={joinPassConfirmError} onChange={(i, { value }) => {
                    setJoinPassConfirmError(value == joinCurrentPass ? null : "Password Confirmation doesn't Match Password")
                  }} />
                </Form.Group>

                <Form.Button content="Join" color="blue" />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </Layout>
  )
}



export default Register