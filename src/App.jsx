import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ethers } from "ethers";
import Apparel from "./artifacts/contracts/Apparel.sol/Apparel.json";

import Home from "./pages/home";
import { Loading } from "./components/Loading";
import FiberIndex from "./pages/fiber";
import FiberUpload from "./pages/fiber/upload";
import FiberOrders from "./pages/fiber/orders";
import BuyerData from "./pages/buyer/data";
import BuyerIndex from "./pages/buyer";
import BuyerOrders from "./pages/buyer/orders";
import BuyerOrder from "./pages/buyer/order";
import ApparelOrders from "./pages/apparel/orders";
import ApparelUpload from "./pages/apparel/upload";
import Login from "./pages/auth/login";
import ApparelIndex from "./pages/apparel";

// test
// const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ADDRESS = "0x4F2188e5DDa3df6BBe380A62b7B2e174fB9d777c";
// new
const ADDRESS = "0x2c96A274c9B08626CcE52485f6291C02E05997f0";
// const ADDRESS = "0x619faef98C72688061B724573276E681Be2e7Ea0";

function App() {
  const [contract, setContract] = useState(undefined);
  const [provider, setProvider] = useState(undefined);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  useEffect(() => {
    async function initWeb3() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(ADDRESS, Apparel.abi, provider);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
        requestAccount();
      }
    }
    initWeb3();
  }, []);

  return (
    <div className="w-full h-full font-medium bg-gray-50 scrollbar scrollbar-none">
      <Suspense fallback={<Loading />}>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/apparel">
            <ApparelIndex />
          </Route>
          <Route exact path="/apparel/orders">
            <ApparelOrders contract={contract} provider={provider} />
          </Route>
          <Route exact path="/apparel/upload/:product_id">
            <ApparelUpload contract={contract} provider={provider} />
          </Route>
          <Route exact path="/buyer">
            <BuyerIndex />
          </Route>
          <Route exact path="/buyer/order">
            <BuyerOrder contract={contract} provider={provider} />
          </Route>
          <Route exact path="/buyer/order/:product_id/:status">
            <BuyerData contract={contract} provider={provider} />
          </Route>
          <Route exact path="/buyer/orders">
            <BuyerOrders contract={contract} provider={provider} />
          </Route>
          <Route exact path="/fiber/orders">
            <FiberOrders contract={contract} provider={provider} />
          </Route>
          <Route exact path="/fiber/upload/:product_id">
            <FiberUpload contract={contract} provider={provider} />
          </Route>
          <Route exact path="/fiber">
            <FiberIndex />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
