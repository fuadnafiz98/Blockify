import { Link } from "react-router-dom";

import Nav from "../../components/Nav";
import OrderImg from "../../static/images/order.jpg";
import ScanImg from "../../static/images/scan.jpg";

const BuyerIndex = () => {
  return (
    <div>
      <Nav user="buyer" />
      <h1 className="my-8 text-3xl font-bold text-center text-blue-600">
        Buyer Dashboard
      </h1>
      <div className="m-8 space-y-10">
        <div className="relative overflow-hidden h-96 rounded-xl">
          <img
            className="absolute object-cover w-full h-full bg-blue-500"
            src={OrderImg}
            alt="Order"
          />
          <div className="absolute inset-0 bg-red-800 opacity-80"></div>
          <div className="absolute flex flex-col items-center justify-center w-full h-full space-y-2">
            <h1 className="text-4xl font-bold text-white">Ordered Products</h1>
            <p className="text-lg text-center text-red-200">
              See the Status of the product you have ordered
            </p>
            <Link to="/buyer/orders">
              <button className="px-8 py-4 font-semibold text-red-600 bg-white rounded-lg hover:bg-red-50">
                See Orderd Products
              </button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden h-96 rounded-xl">
          <img
            className="absolute object-cover w-full h-full bg-blue-500"
            src={ScanImg}
            alt="Scan"
          />
          <div className="absolute inset-0 bg-blue-800 opacity-80"></div>
          <div className="absolute flex flex-col items-center justify-center w-full h-full space-y-2">
            <h1 className="text-4xl font-bold text-white">Scan Product</h1>
            <p className="text-lg text-center text-blue-200">
              Scan Product ID to see Supply Chain
            </p>
            <button className="px-8 py-4 font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50">
              Scan Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerIndex;
