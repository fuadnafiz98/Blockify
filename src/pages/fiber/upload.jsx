import { useEffect, useRef, useState } from "react";
import * as IPFS from "ipfs-core";

import Nav from "../../components/Nav";
import { useParams } from "react-router";
import Success from "../../components/Success";

const FiberUpload = ({ contract, provider }) => {
  const { product_id } = useParams();

  const [hash, setHash] = useState("0x");
  const [ok, setOk] = useState(false);
  const [data, setData] = useState({
    userId: 1001,
    productId: product_id,
    employeeName: "",
    productQuantitiy: "",
    microTest: "",
    tensileTest: "",
    fiberTyping: "",
    bsti: "",
    img1: "",
    img2: "",
  });
  const [loading, setLoading] = useState(false);
  const [ipfs, setIpfs] = useState(undefined);

  const img1Ref = useRef();
  const img2Ref = useRef();

  useEffect(() => {
    const loadIPFS = async () => {
      let nIpfs = await IPFS.create();
      console.log(nIpfs);
      setIpfs(nIpfs);
    };
    loadIPFS();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // const file1 = img1Ref.current.files[0];
      // const file2 = img2Ref.current.files[0];
      // const result1 = await ipfs.add(file1);
      // const result2 = await ipfs.add(file2);
      // console.log(result1);
      // console.log(result2);
      const result1 = { path: "" };
      const result2 = { path: "" };
      const signer = contract.connect(provider.getSigner());
      const transaction = await signer.addFiberInfo(
        data.userId,
        data.productId,
        data.employeeName,
        data.productQuantitiy,
        data.microTest,
        data.tensileTest,
        data.fiberTyping,
        data.bsti,
        result1.path,
        result2.path
      );
      await transaction.wait();
      setHash(transaction.hash);
      setOk(true);
      const transaction2 = await signer.addFiberHash(data.productId, hash);
      await transaction2.wait();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Nav user="Fiber" />
      <div className="p-4">
        <h1 className="my-8 text-3xl font-bold text-center text-blue-600">
          Fiber Content Upload
        </h1>
        <form className="space-y-2">
          <label htmlFor="employeeName" className="block text-lg text-gray-700">
            Employee Name:
          </label>
          <input
            type="text"
            value={data.employeeName}
            onChange={(e) => setData({ ...data, employeeName: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="employeeName"
            id="employeeName"
          />

          <label htmlFor="productQuan" className="block text-lg text-gray-700">
            Product Quantitiy:
          </label>
          <input
            type="text"
            value={data.productQuantitiy}
            onChange={(e) =>
              setData({ ...data, productQuantitiy: e.target.value })
            }
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="productQuan"
            id="productQuan"
          />

          <label htmlFor="microTest" className="block text-lg text-gray-700">
            Microscopic Test Result:
          </label>
          <input
            type="text"
            value={data.microTest}
            onChange={(e) => setData({ ...data, microTest: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="microTest"
            id="microTest"
          />

          <label htmlFor="tensileTest" className="block text-lg text-gray-700">
            Tensile Test Result:
          </label>
          <input
            type="text"
            value={data.tensileTest}
            onChange={(e) => setData({ ...data, tensileTest: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="tensileTest"
            id="tensileTest"
          />

          {/* <label htmlFor="yieldTest" className="block text-lg text-gray-700">
            Yield Test Result:
          </label>
          <input
            type="text"
            value={data.yeildTest}
            onChange={(e) => setData({ ...data, yeildTest: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="yieldTest"
            id="yieldTest"
          /> */}

          <label htmlFor="fiberTyping" className="block text-lg text-gray-700">
            Identification of Fiber:
          </label>
          <select
            onChange={(e) => setData({ ...data, fiberTyping: e.target.value })}
            className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="fiberTyping"
            id="fiberTyping"
          >
            <option value="Animal Fiber">Animal Fiber</option>
            <option value="Mineral Fiber">Mineral Fiber</option>
            <option value="Inorganic Fiber">Inorganic Fiber</option>
            <option value="Semi-Synthetic Fiber">Semi-Synthetic Fiber</option>
          </select>

          <label htmlFor="bsti" className="block text-lg text-gray-700">
            BSTI STANDARDS Accoradance:
          </label>
          <input
            value={data.bsti}
            onChange={(e) => setData({ ...data, bsti: e.target.value })}
            type="text"
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="bsti"
            id="bsti"
          />

          <h2 className="text-xl font-semibold text-blue-600">Attachments</h2>

          <label htmlFor="img1" className="block text-lg text-gray-700">
            <div className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <p>Fiber Color Palette</p>
            </div>
          </label>
          <input ref={img1Ref} type="file" name="img1" id="img1" />

          <label htmlFor="img2" className="block text-lg text-gray-700">
            Img 2
          </label>
          <input ref={img2Ref} type="file" name="img2" id="img2" />

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

export default FiberUpload;
