import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import "./Header.css";
import { eLearningServ } from "../services/eServices";

const Header = () => {
  const userLogin = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    danhMuc: [],
  });
  const fetchData = () => {
    eLearningServ
      .getCategory()
      .then((res) => {
        setState({
          ...state,
          danhMuc: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => fetchData(), []);
  const url = window.location.href;
  return (
    <>
      <div style={{ background: "pink" }} className="header">
        <div className="container mx-auto content">
          <div className="left flex">
            <p
              style={{ color: "black" }}
              className="mr-5"
              onClick={() => navigate("/")}
            >
              CyberLearning
            </p>
          </div>
          <div className="right">
            {userLogin ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {userLogin?.maLoaiNguoiDung === "HV" ? (
                  <p
                    onClick={() => {
                      dispatch({
                        type: "COURSE_LIST_MS",
                      });
                      navigate("/course-list");
                    }}
                    className="mr-2 cursor-pointer"
                  >
                    Danh sách khóa học
                  </p>
                ) : null}
                {userLogin?.maLoaiNguoiDung === "HV" ? (
                  <p
                    style={
                      url.includes("admin") === true
                        ? { fontWeight: "bold", color: "#76B852" }
                        : null
                    }
                    className="cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </p>
                ) : null}

                <p className="text-black mr-2 nameuser">
                  Hello {userLogin.hoTen}
                </p>
                <UserOutlined
                  style={{
                    height: "30px",
                    width: "30px",
                    textAlign: "center",
                    borderRadius: "50%",
                  }}
                  className="text-xl text-white border-solid border-2 border-white mx-2"
                />
                <Button
                  onClick={async () => {
                    await dispatch({
                      type: "LOGOUT",
                    });
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <NavLink className="text-black ml-4" to="/signin">
                  Signin
                </NavLink>
                <NavLink className="text-black ml-4" to="/signup">
                  Signup
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
