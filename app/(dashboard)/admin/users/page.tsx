"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password?: string;
};

type UserWithDetails = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

const DashboardUsers = () => {
  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // No external dependencies.

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">All users</h1>
        <div className="flex justify-end mb-5">
          <Link href="/admin/users/new">
            <CustomButton
              buttonType="button"
              customWidth="110px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add new user"
            />
          </Link>
        </div>
        <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto h-[80vh]">
          {users.length === 0 ? (
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>No users found</span>
            </div>
          ) : (
            <table className="table table-md table-pin-cols">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <th>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;