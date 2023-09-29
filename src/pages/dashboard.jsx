import "../App.css";
import Mainbar from "../component/Mainbar";
import MessageContext from "../context/MessageContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
function Dashboard() {
  // let { setUserId, accessToken } = useContext(AuthContext);
  // let navigateLogin = useNavigate();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     console.log("access", accessToken);
  //     try {
  //       const response = await axios.get("http://localhost:5001/users/userid", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       const userData = response.data;
  //       // Handle the retrieved user data
  //       setUserId(userData);
  //       console.log(userData);
  //     } catch (error) {
  //       // Handle any error that occurs during the request
  //       navigateLogin("/login");
  //       console.error(error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

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
