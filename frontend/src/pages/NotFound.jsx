import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <p className="text-xl text-gray-600 mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        Go Home
      </Link>

    </div>
  );
}

export default NotFound;