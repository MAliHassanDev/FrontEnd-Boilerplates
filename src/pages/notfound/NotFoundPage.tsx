import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="rounded-box border-light-content flex max-w-md flex-col gap-4 border p-6 shadow md:min-w-sm">
        <h1 className="self-center text-3xl font-bold">404</h1>

        <span className="self-center">Page not found</span>

        <Link to={"/"} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </main>
  );
};
