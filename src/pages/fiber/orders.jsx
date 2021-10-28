import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";

import Nav from "../../components/Nav";
import Order from "../../components/Order";

const FiberOrders = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setOrders([]);
      if (contract !== undefined) {
        const data = await contract.getUserProducts(1001);
        // console.log(data);
        data.forEach(async (id) => {
          // console.log(id.toString());
          const eachProduct = await contract.getProductInfo(
            Number(id.toString())
          );
          // console.log(eachProduct);
          setOrders((order) => {
            return [...order, eachProduct];
          });
        });
        setLoading(false);
      }
    };
    fetchData();
  }, [contract]);

  return (
    <div>
      <Nav user="buyer" />
      <div className="m-8">
        <h1 className="text-2xl font-bold text-gray-800">Order List:</h1>
        <div>
          {loading && <Loading />}
          <div>
            {orders.map((order, i) => (
              <Link to={`/fiber/upload/${order.product_id}`} key={i}>
                <Order order={order} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOrders;
