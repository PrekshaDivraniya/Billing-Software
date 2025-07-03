import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/userForm/UserForm';
import UserList from '../../components/userList/UserList';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../service/UserService';
const ManageUsers = () => {

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])


  useEffect(()=>{
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch users");
      }finally{
        setLoading(false);
      }
    }
    loadUsers();
  },[])
  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers}/>
      </div>

      <div className="right-column">
        <UserList users={users} setUsers={setUsers}/>
      </div>
    </div>
  );
}

export default ManageUsers