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
