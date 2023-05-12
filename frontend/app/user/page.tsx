import { User, getAllUsers } from "../../services/UserService";

export default async function UserRead () {
  const users : User[] = await getAllUsers();
  return (
    <section>
      {users.map(user => (
        <article key={user.username}>
          <h2>{user.username}</h2>
          <p>{user.username}</p>
        </article>
      ))}
      <button className="btn">Hello button</button>
    </section>
  );
}