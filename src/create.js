import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./create.css";

const Create = () => {
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  const createStudent = async () => {
    try {
      const { data } = await axios.post("http://localhost:5002/create", {
        name,
        course: course,
        email: email,
        mobile: mobile,
      });
      console.log(data);
    } catch (error) {
      console.log("errorcatch", error);
    }
  };

  return (
    <div className="Main">
      <div className="formmain">
        <div className="home-button">
          <Link to={"/"}>
            <button> HOME </button>
          </Link>
        </div>
        <h1>Enter the Details</h1>
        <form className="form">
          <label>Student Name </label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label> Course </label>
          <input
            type="text"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
          <label> Email </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Mobile </label>
          <input
            min="10"
            type="number"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <input id="submit-button" type="submit" onClick={createStudent} />
        </form>
      </div>
    </div>
  );
};

export default Create;