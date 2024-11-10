import { useState } from "react";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";

function App() {
	const [check, setCheck] = useState(true);
  return (
		<div className="App">
			{
				check ? <LoginPage setCheck={setCheck} />:<Signup setCheck={setCheck} />
			}
			if(check){
				
			}
			else{
				
			}
    </div>
  );
}

export default App;
