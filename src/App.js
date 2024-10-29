import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Container from "./components/Container";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useState,createContext,useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Admin from "./components/Admin";
import Previous from "./components/Previous";

const Namecontext=createContext()
function App()
{
  const [sizes,setsizes] = useState([
    {id:1,label: "L", description: "280mm (12 Pads)",price:"239"},
    {id:2,label: "XL", description: "320mm (10 Pads)",price:"239"},
    {id:3,label: "XXL", description: "410mm (5 Pads)",price:"239"},
    {id:4,label: "Panty Liner", description: "180mm (30 Pieces)",price:"239"}
  ]);

  const [selectedSize,setSelectedSize]=useState(null)

  const [userList, setUserList] = useState([{
    _id:"",
    userName: "Pream",
    password: "12345",
    emailId:"",
    confirmPassword:"",
    phoneNumber: "",
  },
]); 

const [goole,setGoogle]=useState([{
  _id:"",
  uid:"",
  userName: "Pream",
  password: "12345",
  emailId:"",
  confirmPassword:"",
  phoneNumber: "",
}])

useEffect(()=>{
  const _id = localStorage.getItem("userId")

  const uid=localStorage.getItem("userId")

  console.log("userID",_id || uid );

  if (_id !== null || uid !==null )
  {
    getUser(_id,uid);
     

  }

},[])

const getUser = async (_id,uid) => {

  if (_id && uid > 0){
    const response = await axios.get(`http://localhost:3001/User/login`);
    setUserList(response.data);

    console.log(response.data);
  }   

}
  return(<div className="bg-[#FFFFE4]">
    <Namecontext.Provider value={{selectedSize,setSelectedSize,sizes,setsizes,userList,setUserList,setGoogle,goole}}>
    <BrowserRouter>
    <Routes>
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/" element={<Login userList={userList} setUserList={setUserList} setGoogle={setGoogle}/>}></Route>
        <Route path="/signup" element={<Signup userList={userList} setUserList={setUserList} setGoogle={setGoogle}/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="" element={<Previous/>}></Route>
       <Route element={<Aboutus/>}></Route>
       <Route element={<Container/>}></Route>
       <Route element={<Categories/>}></Route>
       <Route element={<Footer/>}></Route>
       <Route path="/shop" element={<Shop/>}></Route>
       </Routes>
       </BrowserRouter>
       </Namecontext.Provider>
  </div>)
}

export default App
export {Namecontext}