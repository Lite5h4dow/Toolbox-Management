import React, { useState, useEffect } from "react";
import hasPermission from "../../lib/client/hasPermission";
import Layout from "../../components/mainLayout";
import { Container, Segment, Grid, Header, Button, Label, Card } from "semantic-ui-react";
import Axios from "axios";


const properties = (props) => {
 useEffect(() => {
  hasPermission()

  Axios({
   method: "post",
   url: "/api/getProperties",
   data: {
    session: window.localStorage.getItem("sessionID"),
   }
  })
 })

 return (
  <Layout activeItem="properties">
   <Container>
    <Segment>
     <Label size="large" attached="top left" content="Properties" />
     <Label size="large" as="a" attached="top right" icon="plus" />
     <Card.Group>

     </Card.Group>
    </Segment>
   </Container>
  </Layout>
 )
}


export default properties