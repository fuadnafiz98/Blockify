import { useEffect, useRef, useState } from "react";
import * as IPFS from "ipfs-core";

import Nav from "../../components/Nav";
import { useParams } from "react-router";
import Success from "../../components/Success";

const ApparelUpload = ({ contract, provider }) => {
  const { product_id } = useParams();

  const [hash, setHash] = useState("0x");
  const [ok, setOk] = useState(false);
  const [data, setData] = useState({
    userId: 1001,
    productId: product_id,
    thread_diameter: "",
    thread_friction: "",
    uniformity: "",
    tensile_strength: "",
    thread_count: "",
    img1: "",
    img2: "",
  });
  const [loading, setLoading] = useState(false);
  const [ipfs, setIpfs] = useState(undefined);
  const [tensileLoading, setTensileLoading] = useState(false);
  const [threadLoaing, setThreadLoading] = useState(false);

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
    e.preventDefault();
    setLoading(true);
    console.log(data);
    try {
      const file1 = img1Ref.current.files[0];
      const file2 = img2Ref.current.files[0];
      const result1 = await ipfs.add(file1);
      const result2 = await ipfs.add(file2);
      console.log(result1);
      console.log(result2);
      // const result1 = { path: "" };
      // const result2 = { path: "" };
      const signer = contract.connect(provider.getSigner());
      const transaction = await signer.addApparelInfo(
        data.productId,
        data.userId,
        data.thread_diameter,
        data.thread_friction,
        data.uniformity,
        data.tensile_strength,
        data.thread_count,
        result1.path,
        result2.path
      );
      await transaction.wait();
      setHash(transaction.hash);
      console.log("[HASH]", transaction.hash);
      setOk(true);
      const transaction2 = await signer.addApparelHash(
        data.productId,
        transaction.hash
      );
      await transaction2.wait();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchThreadCount = (e) => {
    e.preventDefault();
    setThreadLoading(true);
    setTimeout(() => {
      setData({
        ...data,
        thread_count: Math.floor(Math.random() * 6000) + 1 + "",
      });
      setThreadLoading(false);
    }, 1000);
  };

  const fetchTensile = (e) => {
    e.preventDefault();
    setTensileLoading(true);
    setTimeout(() => {
      setData({
        ...data,
        tensile_strength: Math.floor(Math.random() * 100) + 1 + "",
      });
      setTensileLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Nav user="Apparel" />
      <div className="p-4">
        <h1 className="my-8 text-3xl font-bold text-center text-blue-600">
          Apparel Content Upload
        </h1>
        <form className="space-y-2">
          <label htmlFor="employeeName" className="block text-lg text-gray-700">
            Thread Diameter
          </label>
          <input
            type="text"
            value={data.thread_diameter}
            onChange={(e) =>
              setData({ ...data, thread_diameter: e.target.value })
            }
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="employeeName"
            id="employeeName"
          />

          <label htmlFor="productQuan" className="block text-lg text-gray-700">
            Thread Friction:
          </label>
          <input
            type="text"
            value={data.thread_friction}
            onChange={(e) =>
              setData({ ...data, thread_friction: e.target.value })
            }
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="productQuan"
            id="productQuan"
          />

          <label htmlFor="microTest" className="block text-lg text-gray-700">
            Uniformity:
          </label>
          <input
            type="text"
            value={data.uniformity}
            onChange={(e) => setData({ ...data, uniformity: e.target.value })}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="microTest"
            id="microTest"
          />

          <div className="flex justify-between">
            <label
              htmlFor="tensileTest"
              className="block text-lg text-gray-700"
            >
              Tensile Strength:
            </label>
            <button
              onClick={fetchTensile}
              className="text-base font-semibold text-green-600 hover:underline hover:text-green-700"
            >
              {tensileLoading ? "Fetching data ...." : "Fetch Data"}
            </button>
          </div>
          <input
            disabled={true}
            type="text"
            value={data.tensile_strength}
            className="block w-full h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            name="tensileTest"
            id="tensileTest"
          />
          <div className="flex justify-between">
            <label htmlFor="bsti" className="block text-lg text-gray-700">
              Thread Count:
            </label>
            <button
              onClick={fetchThreadCount}
              className="text-base font-semibold text-green-600 hover:underline hover:text-green-700"
            >
              {threadLoaing ? "Fetching data ...." : "Fetch Data"}
            </button>
          </div>
          <input
            disabled={true}
            value={data.thread_count}
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
              <p>Thread Color Palette</p>
            </div>
          </label>
          <input ref={img1Ref} type="file" name="img1" id="img1" />

          <label htmlFor="img2" className="block text-lg text-gray-700">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <p>Apparel Bill of Materials(BoM)</p>
            </div>
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

export default ApparelUpload;
