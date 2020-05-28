import { Component } from "react";
import Layout from "../../components/mainLayout"
import { Segment } from "semantic-ui-react";

class dashboard extends Component {
 constructor(props) {
  super(props)
 }

 componentWillMount() {

 }

 render() {
  return (
   <Layout activeItem="dashboard">
    <Segment placeholder />
   </Layout>
  )
 }
}
export default dashboard