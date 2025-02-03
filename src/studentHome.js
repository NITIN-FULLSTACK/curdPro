import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./studentHome.css";

const StudentHome = () => {
  const [student, setStudent] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [uname, setUname] = useState();
  const [ucourse, setUcourse] = useState();
  const [uemail, setUemail] = useState();
  const [umobile, setUmobile] = useState();
  const [id, setId] = useState();

  const getStudentdata = async () => {
    try {
      const { data } = await axios.get("http://localhost:5002/students");
      console.log("student", data);
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentdata();
  }, []);

  const deletestudentdata = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:5002/students/delete/" + id
      );
      setStudent(data);
    } catch (error) {}
  };

  const editstudentdata = async (id) => {
    try {
      setIsEdit(true);
      const { data } = await axios.put("http://localhost:5002/students/edit/", {
        sid: id,
        name: uname,
        course: ucourse,
        email: uemail,
        mobile: umobile,
      });
      setUname(undefined);
      setUcourse(undefined);
      setUemail(undefined);
      setUmobile(undefined);
      setStudent(data);
      setId(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Main">
      <div className="sub-main">
        <div className="create-button">
          <Link to={"/create"}>
            <button>Create+</button>
          </Link>
        </div>

        <h1>Student Data</h1>
        <div>
          <table className="table-style" border={3}>
            <tbody>
              <tr>
                <th>S.NO</th>
                <th>Student Name</th>
                <th>course</th>
                <th>email</th>
                <th>mobile</th>
                <th colSpan={2}>Modify</th>
              </tr>

              {student.map((s, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{s?.name}</td>
                  <td>{s?.course}</td>
                  <td>{s?.email}</td>
                  <td>{s?.mobile}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => {
                        editstudentdata(s?._id);
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => {
                        deletestudentdata(s?._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEdit && (
          <form className="edit-form">
            <h1> Update </h1>
            <label>Student Name </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setUname(e.target.value);
              }}
            />
            <label> Course </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setUcourse(e.target.value);
              }}
            />
            <label> Email </label>
            <input
              type="email"
              onChange={(e) => {
                setUemail(e.target.value);
              }}
            />
            <label>Mobile </label>
            <input
              type="number"
              onChange={(e) => {
                setUmobile(e.target.value);
              }}
            />
            <input
              className="update-button"
              value={"update"}
              type="submit"
              onClick={() => {
                editstudentdata(id);
              }}
            />
            <input
              className="update-button close-button"
              value={"close"}
              type="submit"
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentHome;