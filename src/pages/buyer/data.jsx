import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Nav from "../../components/Nav";
import { Loading } from "../../components/Loading";

const BuyerData = ({ contract }) => {
  const { product_id, status } = useParams();
  const [productInfo, setProductInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [fiberInfo, setFiberInfo] = useState(undefined);
  const [apparelInfo, setApparelInfo] = useState(undefined);
  const [fiberToggle, setFiberToggle] = useState(false);
  const [apparelToggle, setApparelToggle] = useState(false);

  useEffect(() => {
    const fetchProductInfo = async () => {
      const data = await contract.getProductInfo(product_id);
      console.log(data);
      setProductInfo(data);
    };
    const fetchProductData = async () => {
      if (status === "PENDING") {
      } else if (status === "IN APPAREL") {
        const data = await contract.getFiberInfo(product_id);
        console.log(data);
        setFiberInfo(data);
      } else if (status === "COMPLETE PRODUCTION") {
        const data = await contract.getFiberInfo(product_id);
        console.log(data);
        setFiberInfo(data);
        const data2 = await contract.getApparelInfo(product_id);
        console.log(data2);
        setApparelInfo(data2);
      }
    };
    const fetchData = async () => {
      setLoading(true);
      if (contract !== undefined) {
        fetchProductInfo();
        fetchProductData();
        setLoading(false);
      }
    };
    fetchData();
  }, [contract, product_id, status]);

  return (
    <div>
      <Nav user="Buyer" />
      <div className="p-4">
        <h1 className="px-4 text-4xl font-bold text-gray-800">Product Info</h1>
        {loading && <Loading />}
        {productInfo && (
          <div className="h-32 p-6 m-4 space-y-1 text-2xl font-semibold text-gray-100 bg-gradient-to-tr from-purple-600 to-pink-400 rounded-xl">
            <h2>
              Ordered Product:
              <strong className="text-3xl">{productInfo.product_name}</strong>
            </h2>
            <h4>
              Order ID:
              <strong className="text-3xl">
                {productInfo.product_id.toString()}
              </strong>
            </h4>
          </div>
        )}
        <div className="p-4 space-y-6">
          {/* fiber */}
          <div className="p-6 space-y-1 shadow-md bg-gray-50 rounded-xl">
            <div className="flex justify-between">
              <h4 className="text-gray-800">Fiber Manufacturing Data</h4>
              {fiberInfo ? (
                <>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="#10B981"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Available</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="#F59E0B"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-800">Not Available</p>
                </div>
              )}
            </div>
            {fiberInfo && (
              <div>
                <div>
                  {!fiberToggle ? (
                    <button
                      onClick={() => setFiberToggle(!fiberToggle)}
                      className="font-semibold text-blue-500 underline hover:text-blue-600"
                    >
                      Click to See more
                    </button>
                  ) : (
                    <button
                      onClick={() => setFiberToggle(!fiberToggle)}
                      className="font-semibold text-blue-500 underline hover:text-blue-600"
                    >
                      Click to minimise
                    </button>
                  )}
                </div>
                {fiberToggle && (
                  <div className="mt-5 rounded-xl">
                    <h3 className="my-2 text-xl font-bold text-blue-600">
                      Informations:
                    </h3>
                    <dl>
                      <Dark
                        store={`Employee Name`}
                        value={fiberInfo.employee_name}
                      />
                      <White
                        store="Product Quantity"
                        value={fiberInfo.product_quantity}
                      />
                      <Dark
                        store={`Microscopic Test Result`}
                        value={fiberInfo.microscopic_test_result}
                      />
                      <White
                        store="Tensile Test Result"
                        value={fiberInfo.tensile_test_result}
                      />
                      <Dark store="Fiber Type" value={fiberInfo.fiber_type} />
                      <White
                        store="BSTI Standards Accoradance"
                        value={fiberInfo.BSTI_standards_accoradance}
                      />
                    </dl>
                    <h3 className="my-2 text-xl font-bold text-blue-600">
                      Attachments:
                    </h3>
                    <Attachment
                      title="Fiber Color Pallete"
                      hash={fiberInfo.fiber_color_palette_img}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Apparel */}
          <div className="p-6 space-y-1 shadow-md bg-gray-50 rounded-xl">
            <div className="flex justify-between">
              <h4 className="text-gray-800">Apparel Manufacturing Data</h4>
              {apparelInfo ? (
                <>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="#10B981"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Available</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="#F59E0B"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-800">Not Available</p>
                </div>
              )}
            </div>
            {apparelInfo && (
              <div>
                <div>
                  {!apparelToggle ? (
                    <button
                      onClick={() => setApparelToggle(!apparelToggle)}
                      className="font-semibold text-blue-500 underline hover:text-blue-600"
                    >
                      Click to See more
                    </button>
                  ) : (
                    <button
                      onClick={() => setApparelToggle(!apparelToggle)}
                      className="font-semibold text-blue-500 underline hover:text-blue-600"
                    >
                      Click to minimise
                    </button>
                  )}
                </div>
                {apparelToggle && (
                  <div className="mt-5 rounded-xl">
                    <h3 className="my-2 text-xl font-bold text-blue-600">
                      Informations:
                    </h3>
                    <dl>
                      <Dark
                        store={`Thread Diameter`}
                        value={apparelInfo.thread_diameter}
                      />
                      <White
                        store="Thread Friction"
                        value={apparelInfo.thread_friction}
                      />
                      <Dark
                        store={`Uniformity`}
                        value={apparelInfo.uniformity}
                      />
                      <White
                        store="Tensile Strength"
                        value={apparelInfo.tensile_strength}
                      />
                      <Dark
                        store="Thread Count"
                        value={apparelInfo.thread_count}
                      />
                    </dl>
                    <h3 className="my-2 text-xl font-bold text-blue-600">
                      Attachments:
                    </h3>
                    <Attachment
                      title="Apparel Color Pallete"
                      hash={apparelInfo.apparel_color_palette_img}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Apparel end */}
        </div>
      </div>
    </div>
  );
};

export default BuyerData;

const Attachment = ({ title, hash }) => {
  return (
    <div className="flex justify-between px-4 py-5 bg-gray-100">
      <h3 className="text-base font-medium text-gray-500">{title}</h3>
      <a
        className="flex items-center space-x-2 text-blue-600 hover:underline hover:text-blue-700"
        href={`https://ipfs.io/ipfs/${hash}`}
      >
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <p className="text-lg">Download</p>
      </a>
    </div>
  );
};

const Dark = ({ store, value }) => {
  return (
    <div className="flex items-center justify-between px-4 py-5 bg-gray-100">
      <dt className="text-base font-medium text-gray-500">{store}</dt>
      <dd className="mt-1 text-base text-gray-900">{value}</dd>
    </div>
  );
};

const White = ({ store, value }) => {
  return (
    <div className="flex items-center justify-between px-4 py-5 bg-white">
      <dt className="text-base font-medium text-gray-500">{store}</dt>
      <dd className="mt-1 text-base text-gray-900">{value}</dd>
    </div>
  );
};

/*

          <div className="h-24 p-6 space-y-1 shadow-lg bg-gray-50 rounded-xl">
            <div className="flex justify-between">
              <h4 className="text-gray-800">Apparel Manufacturing Data</h4>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="#10B981"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Available</p>
              </div>
            </div>
            <div>
              <button className="mb-3 font-semibold text-blue-500 underline hover:text-blue-600 ">
                Click to See more
              </button>
            </div>
          </div>
*/
