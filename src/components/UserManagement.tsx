import React, { useState } from 'react';

// Интерфейс пользователя
interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  
  // Функция для добавления нового пользователя
  const addUser = () => {
    const newUser: User = {
      id: Date.now(), // уникальный идентификатор
      name: newName,
      email: newEmail,
    };
    setUsers([...users, newUser]);
    setNewName('');
    setNewEmail('');
  };

  // Функция для редактирования пользователя
  const editUser = (id: number, updatedName: string, updatedEmail: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, name: updatedName, email: updatedEmail } : user));
  };

  // Функция для удаления пользователя
  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <input type="text" value={newName} placeholder="Name" onChange={(e) => setNewName(e.target.value)} />
      <input type="email" value={newEmail} placeholder="Email" onChange={(e) => setNewEmail(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => removeUser(user.id)}>Delete</button>
            <button onClick={() => editUser(user.id, prompt("New name", user.name) || user.name, prompt("New email", user.email) || user.email)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;

