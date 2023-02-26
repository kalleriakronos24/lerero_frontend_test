import React, { useState, useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'

import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Tables() {

    const history = useHistory();
    // setup pages control for every table
    const [pageTable2, setPageTable2] = useState(1);

    const [resultsPerPage, setResultPerPage] = useState(10);
    const [totalResults, setTotalResult] = useState(0);
    const [users, setUsers] = useState([]);

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    const fetchUsers = async () => {
        const url = `http://localhost:8000/api/v1/user`;
        const token = localStorage.getItem('userToken');
        const { data } = await axios(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (data.status === 'success') {
            const paginatedData = data.data.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)
            setTotalResult(data.data.length)
            setUsers(paginatedData);
        }
    }

    const deleteUser = async (id) => {

        const url = `http://localhost:8000/api/v1/user/${id}`;
        const token = localStorage.getItem('userToken');

        const { data } = await axios(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (data.status === 'success') {
            window.alert('success delete user')
            window.location.reload();
        }
    }


    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        fetchUsers()
        // setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    return (
        <>
            <PageTitle>Users</PageTitle>
            <SectionTitle>List of available users</SectionTitle>

            <Button onClick={() => history.replace('/app/users/create')} className="p-5 mb-4">
                <span>Add new User</span>
            </Button>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {/* <Avatar className="hidden mr-3 md:block" src={user.coverImage} alt="User avatar" /> */}
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{user.username}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{user.email}</span>
                                    {/* <Badge type={user.status}>{user.status}</Badge> */}
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{user.userRole}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{user.status}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button onClick={async () => await deleteUser(user._id)} layout="link" size="icon" aria-label="Delete">
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable2}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default Tables
