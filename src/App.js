import {Provider} from "react-redux"; // Automatically passes the store to all child components
import store from "./redux/store"; // The store and main reducer
import './App.css';
import Home from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
