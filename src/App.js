import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import trashSvg from "./assets/trash3-fill.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import logo from "./assets/GTA V Logo.png"


const url = "https://randomuser.me/api/";

function App() {
  const getUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results[0]);
    setUserData(data.results[0]);
  };
  useEffect(() => {
    getUser();
  }, []);

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

  const [userTitle, setUserTitle] = useState("");

  const updateUserTitle = (value) => {
    setUserTitle(value);
  };

  useEffect(() => {
    const userTitleElement = document.querySelector(".user-title");
    if (userTitleElement) {
      userTitleElement.textContent = userTitle;
    }
  }, [userTitle]);
  const handleName = () => {
    const value = `My name is ${userData.name.first} ${userData.name.last}`;
    updateUserTitle(value);
  };

  const handleEmail = () => {
    const value = `My email is ${userData.email}`;
    updateUserTitle(value);
  };

  const handleAge = () => {
    const value = `I am ${userData.dob.age} years old`;
    updateUserTitle(value);
  };

  const handleStreet = () => {
    const value = `I live on ${userData.location.street.name}`;
    updateUserTitle(value);
  };

  const handlePhone = () => {
    const value = `My phone number is ${userData.phone}`;
    updateUserTitle(value);
  };

  const handlePassword = () => {
    const value = `My password is ${userData.login.password}`;
    updateUserTitle(value);
  };

  // const handleShow = (e) => {
  //   const label = e.target.closest(".icon").getAttribute("data-label");
  //   let value = "";

  //   switch (label) {
  //     case "name":
  //       value = `My name is ${userData.name.first} ${userData.name.last}`;
  //       break;
  //     case "email":
  //       value = `My email is ${userData.email}`;
  //       break;
  //     case "age":
  //       const age = userData.dob.age;
  //       value = `I am ${age} years old`;
  //       break;
  //     case "street":
  //       value = `I live on ${userData.location.street.name}`;
  //       break;
  //     case "phone":
  //       value = `My phone number is ${userData.phone}`;
  //       break;
  //     case "password":
  //       value = `My password is ${userData.login.password}`;
  //       break;
  //     default:
  //       value = "";
  //   }

  //   const userTitle = document.querySelector(".user-title");
  //   if (userTitle) {
  //     userTitle.textContent = value;
  //   }
  // };

  function addUser(newUser) {
    const userExists = users.some((user) => user.email === newUser.email);

    if (!userExists) {
      setUsers([...users, newUser]);
    } else {
      alert("This user has already been added.");
    }
  }
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={logo} alt="cw" id="logo" />
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
            <button className="icon" data-label="name" onMouseOver={handleName}>
              {userData.gender === "male" ? (
                <img src={manSvg} alt="man" id="iconImg" />
              ) : (
                <img src={womanSvg} alt="woman" id="iconImg" />
              )}
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleEmail}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleAge}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleStreet}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handlePhone}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handlePassword}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getUser()}>
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
                  <th className="th">Delete</th>
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
                 
                      <img src={trashSvg} alt="delete" id="iconImg-delete" onClick={() => handleDelete(user.id)} />
                  
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
