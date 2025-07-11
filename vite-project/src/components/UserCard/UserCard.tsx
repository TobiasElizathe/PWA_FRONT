import "./UserCard.css";

type UserProps = {
  username: string;
  email: string;
};

export const UserCard = (props: UserProps) => {
  return (
    <div className="user-card">
      <p>Username: {props.username}</p>
      <p>Email: {props.email}</p>
    </div>
  );
};
