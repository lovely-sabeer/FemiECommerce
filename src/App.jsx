import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/home" element={<Home />} />
					<Route path="/shop" element={<Purchase/>} />
					<Route path="/orders" element={<Orders/>} />
					<Route path="/admin" element={<Admin/>} />
				</Routes>
			</BrowserRouter>
    </div>
	)
}

export default App










	// 	<div className="bg-[#FFFFE4]">
  //   <Namecontext.Provider value={{selectedSize,setSelectedSize,sizes,setsizes,userList,setUserList,setGoogle,goole}}>
  //   <BrowserRouter>
  //   <Routes>
  //      <Route path="/home" element={<Home/>}></Route>
  //      <Route path="/" element={<Login userList={userList} setUserList={setUserList} setGoogle={setGoogle}/>}></Route>
  //       <Route path="/signup" element={<Signup userList={userList} setUserList={setUserList} setGoogle={setGoogle}/>}></Route>
  //       <Route path="/admin" element={<Admin/>}></Route>
  //       <Route path="" element={<Previous/>}></Route>
  //      <Route element={<Aboutus/>}></Route>
  //      <Route element={<Container/>}></Route>
  //      <Route element={<Categories/>}></Route>
  //      <Route element={<Footer/>}></Route>
  //      <Route path="/shop" element={<Shop/>}></Route>
  //      </Routes>
  //      </BrowserRouter>
  //      </Namecontext.Provider>
		// </div>