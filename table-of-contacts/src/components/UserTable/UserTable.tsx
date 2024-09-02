import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/users/operation";
import { RootState, AppDispatch } from "../../redux/stor";
import "./UserTable.css";

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  const [search, setSearch] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.name.toLowerCase()) &&
      user.username.toLowerCase().includes(search.username.toLowerCase()) &&
      user.email.toLowerCase().includes(search.email.toLowerCase()) &&
      user.phone.includes(search.phone)
  );

  return (
    <div className="table-container">
      <h1>Contacts tabel</h1>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <div className="search-inputs">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={search.name}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Search by username"
          value={search.username}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Search by email"
          value={search.email}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Search by phone"
          value={search.phone}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Emaill</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
