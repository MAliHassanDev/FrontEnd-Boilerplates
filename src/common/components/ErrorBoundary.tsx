import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  let status = 500;
  let title = "Something went wrong";
  let message = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md text-center">
        <h1 className="text-7xl font-bold text-blue-600 dark:text-blue-400">
          {status}
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
