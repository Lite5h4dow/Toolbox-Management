import Router from "next/router"
import Axios from "axios"

export const followLink = (source: string, as?: string) => {
 console.log("In Validation")
 let session = window.localStorage.getItem("sessionID")

 Axios({
  url: "/api/validateSession",
  method: "post",
  data: { id: session }
 }).then((res) => {
  console.log("returned")
  console.log(res)
  if (res.data.valid) {
   Router.push(source, as)
  } else {
   window.localStorage.removeItem("sessionID")
   window.localStorage.removeItem("userID")
   Router.push("/login")
  }
 });
}
