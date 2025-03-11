import { useEffect, useState } from "react";
import { socket } from "@/config/socket";

const UserList = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("userList", (updatedUsers: string[]) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.off("userList");
    };
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-2">Online Users</h2>
      <ul className="space-y-1">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded-lg">
              {user}
            </li>
          ))
        ) : (
          <p className="text-gray-400">No users online</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
