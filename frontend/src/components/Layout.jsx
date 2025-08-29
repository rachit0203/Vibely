import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children, showSidebar = false, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
