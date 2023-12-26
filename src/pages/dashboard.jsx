import "../App.css";
import Mainbar from "../component/Mainbar";
import MessageContext from "../context/MessageContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Dashboard() {
  let navigateLogin = useNavigate();
  useEffect(() => {
    try {
      // Handle the retrieved user data
      if (!localStorage.getItem("userName")) {
        alert("login first");
        return navigateLogin("/login");
      }
    } catch (error) {
      // Handle any error that occurs during the request
      navigateLogin("/login");
      console.error(error);
    }
  }, []);

  // Call the fetchUserData function to initiate the request

  return (
    <div className="parent">
      <MessageContext>
        <div className="Appd">
          <Mainbar />
        </div>
      </MessageContext>
    </div>
  );
}

export default Dashboard;
