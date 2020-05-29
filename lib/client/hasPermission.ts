import router from "next/router"
import Axios from "axios"
const hasPermission = () => {
 const { user } = router.query
 const currentSession = window.localStorage.getItem("sessionID")
 Axios({
  method: "post",
  url: "/api/validateSession",
  data: { id: currentSession }
 }).then(res => {
  if (res.data.valid) {
   if (user != res.data.userID) {
    router.push(`/[user]`, `/${res.data.userID}`)
   }
  } else {
   window.localStorage.removeItem("sessionID")
   window.localStorage.removeItem("userID")
   window.localStorage.removeItem("userType")
   router.push('/login')
  }
 })
}
export default hasPermission