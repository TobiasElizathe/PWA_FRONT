import './Users.css';
import enableIcon   from '../../assets/enable.png';
import disableIcon  from '../../assets/disable.png';
import { UserCard } from '../../components/UserCard/UserCard';
import { TitleHeader } from '../../components/TitleHeader/TitleHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';

type Usuario = {
  _id?: string;
  username: string;
  email: string;
  isActive: boolean;
};

export const Users = () => {
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [fetchError,    setFetchError]    = useState<Error | null>(null);

  const cargarUsuarios = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/users');
      setListaUsuarios(data.data);
    } catch (err) {
      setFetchError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const cambiarEstado = async (id: string, activar: boolean) => {
    const url = activar
      ? `http://localhost:3000/api/users/enable/${id}`
      : `http://localhost:3000/api/users/disable/${id}`;

    try {
      await axios.patch(url);
      setListaUsuarios(prev =>
        prev.map(u => (u._id === id ? { ...u, isActive: activar } : u))
      );
    } catch (err) {
      setFetchError(err instanceof Error ? err : new Error('Update failed'));
    }
  };

  return (
    <section className="users">
      <TitleHeader />

      <div className="users-list">
        {isLoading  && <p>Cargando…</p>}
        {fetchError && <p>Error: {fetchError.message}</p>}

        {listaUsuarios.map(u => {
          const id           = u._id ?? u.email;
          const inhabilitado = !u.isActive;

          return (
            <div key={id} className="user-card-container">
              <UserCard
                username={u.username}
                email={u.email}
                isActive={u.isActive}
              />

              <div className="user-card-actions">
                <button
                  onClick={() => cambiarEstado(id, true)}
                  disabled={!inhabilitado}
                  className={!inhabilitado ? 'user-disabled' : ''}
                >
                  <img src={enableIcon} alt="Habilitar" draggable="false" />
                </button>

                <button
                  onClick={() => cambiarEstado(id, false)}
                  disabled={inhabilitado}
                  className={inhabilitado ? 'user-disabled' : ''}
                >
                  <img src={disableIcon} alt="Deshabilitar" draggable="false" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
