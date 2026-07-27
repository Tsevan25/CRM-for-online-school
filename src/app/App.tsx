import { Provider } from "react-redux";
import { store } from "./store/index";
import "./styles/global.css"



function App() {
  return (
    <Provider store={store}>
        <p>CRM</p>
    </Provider>
  )
  
  
}

export default App;
