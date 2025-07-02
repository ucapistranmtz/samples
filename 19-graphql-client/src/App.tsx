import { AddUser } from "./AddUser";
import { UserList } from "./UserList";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>GraphQL + Apollo Demo</h1>
      <AddUser />
      <hr />
      <UserList />
    </div>
  );
}
