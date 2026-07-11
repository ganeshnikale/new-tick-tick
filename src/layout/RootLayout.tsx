import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/addProject/">Add Project</Link>
        {/* <Link to="/taskDetails/">Task Details</Link> */}
      </nav>
      <Outlet/>
    </div>
  );
}