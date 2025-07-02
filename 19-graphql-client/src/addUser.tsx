import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_USER = gql`
  mutation ($name: String!, $age: Int!) {
    addUser(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export function AddUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ variables: { name, age: parseInt(age) } });
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {data && (
        <p style={{ color: "green" }}>User added: {data.addUser.name}</p>
      )}
    </form>
  );
}
