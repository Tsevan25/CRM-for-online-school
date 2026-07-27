import { Provider } from "react-redux";
import { store } from "./store/index";
import "./styles/global.css"

import Input from "../shared/ui/Input";


function App() {
  return (
    <Provider store={store}>
        <p>CRM</p>
        <Input label='Username' error='fail'></Input>
   
    </Provider>
  )
  
  
}

export default App;
