import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const UserData = ({ users }) => {
  return (
    <>
      {users.map((curUser, index) => {
        const {
          name="",
        } = curUser;

        return (
          <tr key={index}>
            <td>{name}</td>
          </tr>
        );
      })}
    </>
  );
};

const API = "https://api-cookoff-prod.codechefvit.com/ques/getOne";

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (url) => {
    try {
      const response = await axios.get(url); // Use Axios to make the GET request
      const data = response.data;

      if (data && data.questions && data.questions.length > 0) {
        setUsers(data.questions);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  return (
    <>
      <table className="text-white">
        <thead>
          <tr className="text-white">
            <th>Name</th>
          </tr>
        </thead>
        <tbody className="text-white">
          <UserData users={users} />
        </tbody>
      </table>
    </>
  );
};

export default App;
