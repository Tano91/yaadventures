import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="h-screen bg-emerald-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <p className="text-2xl font-medium text-white mt-2">
          Oops! Page not found.
        </p>
        <p className="text-lg text-white mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <p className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 active:scale-90 transition ease-in-out">
            Go back home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
