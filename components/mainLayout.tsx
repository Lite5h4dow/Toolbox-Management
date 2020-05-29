import React, { useState } from "react";
import { Sidebar, Menu, Item, Segment, Container } from "semantic-ui-react";
import { followLink } from "../lib/client/validatedRedirect"
import hasPermission from "../lib/client/hasPermission"
import router from "next/router"
import Axios from "axios";

const Layout = (props) => {

 const [MenuVisable, setMenuVisable] = useState(false)

 const toggleMenuState = () => {
  setMenuVisable(!MenuVisable)
 }

 const handleLogOut = () => {
  Axios({
   url: "/api/logOut",
   method: "post",
   data: {
    userID: window.localStorage.getItem("userID"),
    sessionID: window.localStorage.getItem("sessionID")
   }
  }).then(res => {
   if (res.data.success) {
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("sessionID")
    window.localStorage.removeItem("userType")
    router.push("/")
   }
  })
 }



 return (
  <>
   <Sidebar.Pushable>
    <Sidebar
     as={Menu}
     inverted
     vertical
     animation="push"
     direction="left"
     width="thin"
     visible={MenuVisable}
     onHide={() => { toggleMenuState() }}
    >
     <Menu.Item
      as="a"
      icon="columns"
      active={props.activeItem == "dashboard"}
      content="Dashboard"
      color="orange"
      onClick={() => {
       followLink(`/[user]`, `/${window.localStorage.getItem("userID")}`)
      }}
     />

     <Menu.Item
      as="a"
      icon="building outline"
      active={props.activeItem == "properties"}
      content="Properties"
      color="orange"
      onClick={() => {
       followLink(`/[user]/properties`, `/${window.localStorage.getItem("userID")}/properties`)
      }}
     />

    </Sidebar>
    <Sidebar.Pusher dimmed={MenuVisable}>
     <Segment basic inverted>
      <Container>
       <Menu secondary inverted>
        <Menu.Item color="orange" icon="bars" onClick={() => { toggleMenuState() }} />
        <Menu.Menu position="right">
         <Menu.Item color="orange" icon="sign-out" onClick={() => { handleLogOut() }} />
        </Menu.Menu>
       </Menu>
      </Container>
     </Segment>
     {props.children}
    </Sidebar.Pusher>
   </Sidebar.Pushable>
  </>
 )
}


export default Layout