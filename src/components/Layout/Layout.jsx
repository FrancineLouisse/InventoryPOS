import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-root">
      <Sidebar />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;