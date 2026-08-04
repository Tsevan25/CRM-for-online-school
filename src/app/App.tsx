import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store, useAppDispatch } from "./store";
import { checkSession } from "@/features/auth";
import { router } from "./router";
import "./styles/global.css";


function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}


function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

export default App;
