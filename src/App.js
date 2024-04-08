import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [userData, setUserData] = useState({
    gender: "",

    name: "",
    email: "",
    dob: "",
    picture: "",
    city: "",
    phone: "",
    password: "",
    street: "",
  });
  const [users, setUsers] = useState([]);

  const handleShow = (e) => {
    const label = e.target.closest(".icon").getAttribute("data-label");
    let value = "";
    switch (label) {
      case "name":
        value = `My name is ${userData.name.first} ${userData.name.last}`;
        break;
      case "email":
        value = `My email is ${userData.email}`;
        break;
      case "age":
        const age = userData.dob.age;
        value = `I am ${age} years old`;
        break;
      case "street":
        value = `I live on ${userData.location.street.name}`;
        break;
      case "phone":
        value = `My phone number is ${userData.phone}`;
        break;
      case "password":
        value = `My password is ${userData.login.password}`;
        break;
      default:
        value = "";
    }
    const userTitle = document.querySelector(".user-title");
    if (userTitle) {
      userTitle.textContent = value;
    }
  };
  const getUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results[0]);
    setUserData(data.results[0]);
    
  };

  useEffect(() => {
    getUser();

  }, []);

  function addUser(newUser) {
    // users is your current list of users
    // newUser is the user object you want to add

    // Check if the newUser already exists based on a unique identifier, e.g., email
    const userExists = users.some((user) => user.email === newUser.email);

    if (!userExists) {
      // If the user doesn't exist, add them to the users array
      setUsers([...users, newUser]);
    } else {
      // If the user exists, alert the user or handle it as you see fit
      alert("This user has already been added.");
    }
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userData.picture.large} alt="user" className="user-img" />
          <p className="user-title">
            My name is{" "}
            {userData.name && userData.name.first
              ? userData.name.first + " " + userData.name.last
              : ""}
          </p>
          <p className="user-value"></p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleShow}>
              {userData.gender === "male" ? (
                <img src={manSvg} alt="man" id="iconImg" />
              ) : (
                <img src={womanSvg} alt="woman" id="iconImg" />
              )}
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleShow}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleShow}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleShow}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleShow}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleShow}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>

            <button className="btn" onClick={() => addUser(userData)}>
              Add User
            </button>
          </div>
          {users.length > 0 && (
            <table className="table">
              <thead>
                <tr className="head-tr">
                  <th className="th">Firstname</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Age</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="body-tr">
                    <td className="th">
                      {user.name.first} {user.name.last}
                    </td>
                    <td className="th">{user.email}</td>
                    <td className="th">{user.phone}</td>
                    <td className="th">{user.dob.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </main>
  );
}

export default App;
