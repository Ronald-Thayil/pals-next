import Link from "next/link";

export default function HeaderAdmin() {
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/admindashboard"
          className="text-2xl font-bold text-primary"
        >
          4Pals
        </Link>
        <div>
          <Link
            href="/login"
            className="px-3.5 py-2 text-sm bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            {" "}
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
