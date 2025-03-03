"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });

  const addNewUser = () => {
    if (
      userInput.firstname.length > 0 &&
      userInput.lastname.length > 0 &&
      userInput.email.length > 3 &&
      userInput.role.length > 0 &&
      userInput.password.length > 0
    ) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("You entered invalid email address format");
        return;
      }
      if (userInput.password.length > 7) {
        const requestOptions: any = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        };
        fetch(`http://localhost:3001/api/users`, requestOptions)
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else {
              throw Error("Error while creating user");
            }
          })
          .then((data) => {
            toast.success("User added successfully");
            setUserInput({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              role: "user",
            });
          })
          .catch((error) => {
            toast.error("Error while creating user");
          });
      } else {
        toast.error("Password must be longer than 7 characters");
      }
    } else {
      toast.error("You must enter all input values to add a user");
    }
  };

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new user</h1>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={userInput.firstname}
              onChange={(e) =>
                setUserInput({ ...userInput, firstname: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={userInput.lastname}
              onChange={(e) =>
                setUserInput({ ...userInput, lastname: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Role:</span>
            </div>
            <select
              className="select select-bordered"
              value={userInput.role}
              onChange={(e) =>
                setUserInput({ ...userInput, role: e.target.value })
              }
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </label>
        </div>
        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;
