import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductsDetail from "./pages/ProductsDetail";
import Purchases from "./pages/Purchases";
import MyNavBar from "./components/MyNavBar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import { useEffect } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cart from "./components/Cart";
import Purchase from "./pages/Purchase";
import Register from "./pages/Register";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productsList = useSelector((state) => state.products);
  const getProductImg = (productID) => {
    const product = productsList.find((product) => product.id === productID);
    return product?.productImgs?.[0];
  };


  return (
      <HashRouter>
        <MyNavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/purchases"
              element={<Purchases getProductImg={getProductImg} />}
            />
            <Route
              path="/purchase"
              element={<Purchase getProductImg={getProductImg} />}
            />
          </Route>
        </Routes>
        <Cart getProductImg={getProductImg}> </Cart>
      </HashRouter>
  );
}

export default App;
