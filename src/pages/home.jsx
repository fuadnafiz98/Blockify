import heroImage from "../static/images/hero.jpg";

const Home = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="relative overflow-hidden rounded-xl h-2/3">
        <img
          className="absolute object-cover w-full h-full bg-blue-500"
          src={heroImage}
          alt="heroImage"
        />
        <div className="absolute inset-0 bg-blue-800 opacity-80"></div>
        <div className="absolute flex flex-col items-center justify-center w-full h-full space-y-2">
          <h1 className="text-4xl font-bold text-white">Blockify</h1>
          <p className="text-lg text-center text-blue-200">
            Secure supply chain management with blockchain
          </p>
          <button className="px-8 py-4 font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50">
            Get Started
          </button>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 uppercase">
          Our Features
        </h2>
        <div className="w-full bg-blue-100 rounded-lg h-72"></div>
        <div className="w-full bg-blue-100 rounded-lg h-72"></div>
      </div>
    </div>
  );
};

export default Home;
