import "./Users.css";
import enableIcon  from "../../assets/enable.webp";
import disableIcon from "../../assets/disable.webp";

import { UserCard }   from "../../components/UserCard/UserCard";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";

import axiosInstance  from "../../config/axios";
import { useEffect, useState } from "react";

type User = {
  _id: string;             
  username: string;
  email: string;
  isActive: boolean;
};

export const Users = () => {
  const [users, setUsers]               = useState<User[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<Error | null>(null);
  const [loadingToggleId, setToggleId]  = useState<string | null>(null);

  /* ───── cargar usuarios ───── */
  const loadUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  /* ───── activar / desactivar ───── */
  const toggleStatus = async (id: string, enable: boolean) => {
    setError(null);
    setToggleId(id);

    // → must match backend: /users/:id/activate  |  /users/:id/desactivate
    const url = enable
      ? `/users/${id}/activate`
      : `/users/${id}/desactivate`;   // con “s”, como en tu router

    try {
      await axiosInstance.patch(url);
      setUsers(prev =>
        prev.map(u => (u._id === id ? { ...u, isActive: enable } : u))
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Update failed"));
    } finally {
      setToggleId(null);
    }
  };

  
  return (
    <section className="usuarios-main">
      <TitleHeader title="User Directory" subtitle="Manage all registered users" />

      <div className="usuarios-listado">
        {loading && <p>Loading…</p>}
        {error   && <p style={{ color: "red" }}>{error.message}</p>}

        {users.map(({ _id, username, email, isActive }) => {
          const isDisabled  = !isActive;
          const isToggling  = loadingToggleId === _id;

          return (
            <div key={_id} className="usuarios-item-contenedor">
              <UserCard username={username} email={email} isActive={isActive} />

              <div className="usuarios-info">
                {/* Enable */}
                <button
                  type="button"
                  onClick={() => toggleStatus(_id, true)}
                  disabled={!isDisabled || isToggling}
                  className={!isDisabled || isToggling ? "usuario-inactivo" : ""}
                  aria-label="Enable user"
                >
                  <img src={enableIcon} alt="" draggable="false" />
                </button>

                {/* Disable */}
                <button
                  type="button"
                  onClick={() => toggleStatus(_id, false)}
                  disabled={isDisabled || isToggling}
                  className={isDisabled || isToggling ? "usuario-inactivo" : ""}
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
