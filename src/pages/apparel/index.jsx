import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import dataEntryImg from "../../static/images/data-entry.jpg";
import ScanImg from "../../static/images/scan.jpg";

const ApparelIndex = () => {
  return (
    <div>
      <Nav user="Apparel" />
      <h1 className="my-8 text-3xl font-bold text-center text-purple-600">
        Apparel Dashboard
      </h1>
      <div className="m-8 space-y-10">
        <div className="relative overflow-hidden h-96 rounded-xl">
          <img
            className="absolute object-cover w-full h-full bg-blue-500"
            src={dataEntryImg}
            alt="Order"
          />
          <div className="absolute inset-0 bg-indigo-800 opacity-80"></div>
          <div className="absolute flex flex-col items-center justify-center w-full h-full space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Entry Apparel Infos
            </h1>
            <p className="text-lg text-center text-indigo-200">
              Entry Apparel informations of your orders.
            </p>
            <Link to="/apparel/orders">
              <button className="px-8 py-4 font-semibold text-indigo-600 bg-white rounded-lg hover:bg-indigo-50">
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

export default ApparelIndex;
