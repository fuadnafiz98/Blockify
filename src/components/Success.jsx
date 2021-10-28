const Success = ({ hash }) => {
  return (
    <div className="p-4 mt-8 bg-green-100 rounded-lg">
      <h3 className="text-xl font-semibold text-center text-green-800">
        Data saved to Blockchain Successfully!
      </h3>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-lg text-gray-800">Transaction Hash:</h4>
        <p
          className="p-4 font-bold text-center rounded-lg bg-gray-50"
          style={{
            wordBreak: "break-all",
            wordWrap: "break-word",
          }}
        >
          {hash}
        </p>
      </div>
      <h3 className="p-4 text-lg font-normal text-center text-gray-800">
        Copy the hash address to retrive more information about the transaction
      </h3>
    </div>
  );
};

export default Success;
