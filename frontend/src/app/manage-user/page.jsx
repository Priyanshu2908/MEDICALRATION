'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

    const [userList, setUserList] = useState([]);

    const fetchUserData = async () => {
        const res = await axios.get('http://localhost:5000/user/getall');
        console.table(res.data);
        setUserList(res.data);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/user/delete/${id}`)
            .then((result) => {
                toast.success('User deleted successfully');
                fetchUserData();
            }).catch((err) => {
                console.log(err);
                toast.error('Failed to delete user');
            });
    }

    return (
        <div>
            <div className='max-w-[80%] mx-auto'>
                <h1 className='text-3xl font-bold text-center'>Manage User</h1>

                <table className='w-full mt-10 border-2 border-blue-300'>
                    <thead className='bg-blue-600 text-white'>
                        <tr>
                            <th>S. No.</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Date</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            userList.map((user, index) => {
                                return <tr key={user._id}
                                    className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
                                    <td className='p-3'>{index + 1}</td>
                                    <td className='p-3'>{user._id}</td>
                                    <td className='p-3'>{user.name}</td>
                                    <td className='p-3'>{user.email}</td>
                                    <td className='p-3'>{user.city}</td>
                                    <td className='p-3'>{new Date(user.createdAt).toLocaleDateString()}</td>

                                    <td>
                                        <button onClick={() => { deleteUser(user._id) }}
                                            className='rounded bg-red-500 text-white px-3 py-1'>
                                            <IconTrash />
                                        </button>
                                    </td>

                                    <td>
                                        <Link href={`/update-user/${user._id}`}
                                            className='block w-fit mx-auto rounded bg-blue-500 text-white px-3 py-1'>
                                            <IconPencil />
                                        </Link>
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ManageUser;