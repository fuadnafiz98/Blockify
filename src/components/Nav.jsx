import { Link } from "react-router-dom";

const Nav = ({ user }) => {
  return (
    <div className="flex items-center justify-between w-full h-16 p-4 bg-gray-100 shadow-md">
      <Link
        to="/"
        className="flex items-center space-x-2 text-xl font-semibold text-white"
      >
        <div className="grid w-10 h-10 bg-blue-500 rounded-full place-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        <p className="text-gray-900">Home</p>
      </Link>
      <div className="flex items-center space-x-4">
        <p className="text-lg text-gray-700">Current User:</p>
        <strong className="text-xl text-gray-900">{user}</strong>
      </div>
    </div>
  );
};

export default Nav;
