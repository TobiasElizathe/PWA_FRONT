// src/pages/Users.tsx
import "./Users.css";
import enableIcon  from "../../assets/enable.png";
import disableIcon from "../../assets/disable.png";

import { UserCard }  from "../../components/UserCard/UserCard";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";

import axiosInstance from "../../config/axios";      // ← URL base centralizada
import { useEffect, useState } from "react";

type User = {
  _id?: string;
  username: string;
  email: string;
  isActive: boolean;
};

export const Users = () => {
  /* -------- state -------- */
  const [users,  setUsers]  = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<Error | null>(null);

  /* -------- fetch -------- */
  const loadUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data.data);                       // back devuelve { data: [...] }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  /* -------- enable / disable -------- */
  const toggleStatus = async (id: string, enable: boolean) => {
    const url = enable ? `/users/enable/${id}` : `/users/disable/${id}`;

    try {
      await axiosInstance.patch(url);
      setUsers(prev =>
        prev.map(u => (u._id === id ? { ...u, isActive: enable } : u))
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Update failed"));
    }
  };

  /* -------- render -------- */
  return (
    <section className="users">
      {/* Encabezado descriptivo */}
      <TitleHeader title="User Directory" subtitle="Manage all registered users" />

      <div className="users-list">
        {loading && <p>Loading…</p>}
        {error   && <p>Error: {error.message}</p>}

        {users.map(u => {
          const id         = u._id ?? u.email;
          const isDisabled = !u.isActive;

          return (
            <div key={id} className="user-card-container">
              <UserCard username={u.username} email={u.email} isActive={u.isActive} />

              <div className="user-card-actions">
                <button
                  onClick={() => toggleStatus(id, true)}
                  disabled={!isDisabled}
                  className={!isDisabled ? "user-disabled" : ""}
                  aria-label="Enable user"
                >
                  <img src={enableIcon} alt="" draggable="false" />
                </button>

                <button
                  onClick={() => toggleStatus(id, false)}
                  disabled={isDisabled}
                  className={isDisabled ? "user-disabled" : ""}
                  aria-label="Disable user"
                >
                  <img src={disableIcon} alt="" draggable="false" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
