import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import studentsData from "./studentsData";
import "./App.css";
import Navbar from "./components/Navbar";

// Pages
import Homepage from "./Homepage";
import Listing from "./Listing";
import SingleStudent from "./SingleStudent";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import Error from "./Error";

const API_URL = "https://251e-213-58-220-126.ngrok-free.app/api";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // with promises
    // fetch(`${API_URL}/students`)
    //   .then((response) => response.json())
    //   .then((data) => setStudents(data));

    // async await
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    fetchData(`${API_URL}/students`).then((data) => setStudents(data));
  }, []);

  const createStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteItem = (id) => {
    setStudents(students.filter((student) => student._id !== id));
  };

  console.log(students);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage students={students} />} />
        <Route
          path="/students"
          element={<Listing students={students} deleteItem={deleteItem} />}
        />
        <Route
          path="/students/new"
          element={<AddStudent createStudent={createStudent} />}
        />
        <Route
          path="/students/:studentId"
          element={<SingleStudent students={students} />}
        />
        <Route
          path="/students/:studentId/edit"
          element={
            <UpdateStudent students={students} setStudents={setStudents} />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
