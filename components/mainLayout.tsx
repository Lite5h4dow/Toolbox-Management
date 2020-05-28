import { Component } from "react";
import { Sidebar, Menu, Item, Segment, Container } from "semantic-ui-react";
import { followLink } from "../lib/client/validatedRedirect"

interface LayoutState {
 MenuVisable: boolean
}

interface LayoutProps {
 activeItem: string
}

class Layout extends Component<LayoutProps, LayoutState> {
 constructor(props) {
  super(props)
  this.state = { MenuVisable: false }
  this.toggleMenuState = this.toggleMenuState.bind(this)
 }

 toggleMenuState(currentState: boolean) {
  this.setState({ MenuVisable: !currentState })
 }



 render() {
  return (
   <>
    <Sidebar.Pushable as="Segment">
     <Sidebar
      as={Menu}
      inverted
      vertical
      animation="push"
      direction="left"
      width="thin"
      visible={this.state.MenuVisable}
      onHide={() => { this.toggleMenuState(this.state.MenuVisable) }}
     >
      <Menu.Item
       as="a"
       icon="columns"
       active={this.props.activeItem == "bashboard"}
       content="Dashboard"
       onClick={() => {
        followLink(`/[user]`, `/${window.localStorage.getItem("userID")}`)
       }}
      />

     </Sidebar>
     <Sidebar.Pusher dimmed={this.state.MenuVisable}>
      <Segment basic inverted>
       <Container>
        <Menu inverted>
         <Menu.Item color="orange" icon="bars" onClick={() => { this.toggleMenuState(this.state.MenuVisable) }} />
         <Menu.Menu position="right">
          <Menu.Item color="orange" icon="sign-out" />
         </Menu.Menu>
        </Menu>
       </Container>
      </Segment>
      {this.props.children}
     </Sidebar.Pusher>
    </Sidebar.Pushable>
   </>
  )
 }
}

export default Layout