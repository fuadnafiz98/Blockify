import { useEffect, useRef, useState } from "react";

import Nav from "../../components/Nav";
import Success from "../../components/Success";

const BuyerOrder = ({ contract, provider }) => {
  const [data, setData] = useState({
    userId: 1001,
    productId: 2001,
    productName: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [hash, setHash] = useState("0x");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const signer = contract.connect(provider.getSigner());
      const transaction = await signer.orderProduct(
        data.userId,
        data.productId,
        data.productName
      );
      await transaction.wait();
      console.log(transaction);
      setHash(transaction.hash);
      setLoading(false);
      setOk(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Nav user="Buyer" />
      <div className="p-4">
        <h1 className="my-8 text-3xl font-bold text-center text-blue-600">
          Order Product
        </h1>
        <form className="space-y-2">
          <label htmlFor="employeeName" className="block text-lg text-gray-700">
            User Id:
          </label>
          <input
            type="text"
            value={data.userId}
            onChange={(e) => setData({ ...data, userId: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="employeeName"
            id="employeeName"
          />

          <label htmlFor="productQuan" className="block text-lg text-gray-700">
            Product Id:
          </label>
          <input
            type="text"
            value={data.productId}
            onChange={(e) => setData({ ...data, productId: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="productQuan"
            id="productQuan"
          />

          <label htmlFor="microTest" className="block text-lg text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="microTest"
            id="microTest"
          />

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-full h-16 text-xl text-gray-100 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            {loading && (
              <svg
                className="mr-3 -ml-1 text-white animate-spin h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <p>Save data to blockchain</p>
          </button>
        </form>
        {ok && <Success hash={hash} />}
      </div>
    </div>
  );
};

export default BuyerOrder;
