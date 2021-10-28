const Order = ({ order }) => {
  return (
    <div className="flex flex-col">
      <div className="h-32 p-8 my-2 space-y-4 border-2 rounded-lg shadow-md bg-gray-50 hover:bg-gray-200 border-gray-50">
        <h2 className="text-xl">
          <span className="text-gray-600">Product Name: </span>
          {order.product_name}
        </h2>
        <h3 className="text-xl">
          <span className="text-gray-600">Product Status: </span>
          {order.status}
        </h3>
      </div>
    </div>
  );
};

export default Order;
