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
    const [modules, setModules] = useState([]);

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    const fetchModule = async () => {
        const url = `http://localhost:8000/api/v1/module`;
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
            setModules(paginatedData);
        }
    }

    const deleteModule = async (id) => {

        const url = `http://localhost:8000/api/v1/module/${id}`;
        const token = localStorage.getItem('userToken');

        const { data } = await axios(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        console.log('data delete >> ', data);

        if (data.status === 'success') {
            window.alert('success delete module')
            window.location.reload();
        }
    }


    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        fetchModule()
        // setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    return (
        <>
            <PageTitle>Modules</PageTitle>
            <SectionTitle>List of available modules</SectionTitle>

            <Button onClick={() => history.replace('/app/modules/create')} className="p-5 mb-4">
                <span>Add new Module</span>
            </Button>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Module Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {modules.map((module, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {/* <Avatar className="hidden mr-3 md:block" src={user.coverImage} alt="User avatar" /> */}
                                        <div>
                                            <p className="font-semibold">{module.name}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button onClick={async () => await deleteModule(module._id)} layout="link" size="icon" aria-label="Delete">
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
