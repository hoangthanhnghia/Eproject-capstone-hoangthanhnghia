import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import CourseList from "./components/CourseList";
import { fetchCourseList } from "./thunk";
import Footer from "../../components/Footer";

const HomeBooking = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(fetchCourseList(searchParam.get("page")));
  }, [dispatch, searchParam.get("page")]);
  return (
    <div>
      <Header></Header>
      <CourseList></CourseList>
    </div>
  );
};

export default HomeBooking;
