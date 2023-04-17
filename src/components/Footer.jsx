import React, { useEffect, useState } from "react";
import "./Footer.css";
import { eLearningServ } from "../services/eServices";
import { useNavigate } from "react-router-dom";

const Footer = () => {
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
  return (
    <footer>
      <div className="itemFooter">
        
      </div>
      <div className="itemFooter">
        <h3>Category</h3>
        {state?.danhMuc?.map((item, index) => {
          return (
            <p
              key={item.maDanhMuc}
              onClick={() => {
                navigate("/danhmuckhoahoc/" + item.maDanhMuc);
              }}
            >
              {item.tenDanhMuc}
            </p>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
