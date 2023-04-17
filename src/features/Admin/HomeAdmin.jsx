import React, { useEffect } from "react";
import Header from "../../components/Header";
import "./HomeAdmin.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourseList } from "./thunk";

const HomeAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(fetchCourseList(searchParam.get("page")));
  }, [searchParam.get("page")]);
  const url = window.location.href;
  return (
    <div>
      <Header></Header>
      <div className="content_homeadmin">
        <input type="checkbox" name="MenuToggle" id="MenuToggle" />
        <aside className="sidebar">
          <nav>
            <div className="nav_items">
              <a
                className="cursor-pointer"
                style={
                  url.includes("admin/course") === false
                    ? { backgroundColor: "#76B852" }
                    : null
                }
                onClick={() => navigate("/admin/user")}
              >
                Quản lí người dùng
              </a>
              <a
                className="cursor-pointer"
                style={
                  url.includes("admin/course") === true
                    ? { backgroundColor: "#76B852" }
                    : null
                }
                onClick={() => navigate("/admin/course")}
              >
                Quản lí khóa học
              </a>
            </div>
          </nav>
        </aside>
        <main className="right">
          <div className="content">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

export default HomeAdmin;
