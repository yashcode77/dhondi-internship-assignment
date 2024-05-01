import Sidebar from "./sidebar/Index";

// eslint-disable-next-line react/prop-types
function RootLayout({ children }) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="w-full flex-1 mx-1 py-4 md:mx-8">{children}</main>
    </div>
  );
}

export default RootLayout;
