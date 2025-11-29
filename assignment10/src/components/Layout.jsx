// src/components/Layout.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "#222",
          color: "#fff",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              color: "#fff",
              marginRight: "15px",
              textDecoration: "none",
            }}
          >
            Job Portal
          </Link>

          {user?.type === "admin" && (
            <>
              <Link
                to="/admin/employees"
                style={{
                  color: "#fff",
                  marginRight: "15px",
                  textDecoration: "none",
                }}
              >
                Employees
              </Link>
              <Link
                to="/admin/add-job"
                style={{
                  color: "#fff",
                  marginRight: "15px",
                  textDecoration: "none",
                }}
              >
                Add Job
              </Link>
            </>
          )}

          {user?.type === "employee" && (
            <Link
              to="/jobs"
              style={{
                color: "#fff",
                marginRight: "15px",
                textDecoration: "none",
              }}
            >
              Jobs
            </Link>
          )}
        </div>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>
                {user.name} ({user.type})
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
      </nav>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
