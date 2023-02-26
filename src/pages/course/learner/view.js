import React, { useState, useEffect } from 'react'

import PageTitle from '../../../components/Typography/PageTitle'
import SectionTitle from '../../../components/Typography/SectionTitle'

import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Tables() {

    const useQuery = () => {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search));
    };
    const query = useQuery();

    const [pageTable2, setPageTable2] = useState(1);

    const [resultsPerPage, setResultPerPage] = useState(10);
    const [totalResults, setTotalResult] = useState(0);
    const [courses, setCourses] = useState([]);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));


    const fetchCourses = async () => {
        const learnerId = localStorage.getItem('userId');
        const url = `http://localhost:8000/api/v1/course/learner/${learnerId}`;
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
            setCourses(paginatedData);
        }
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        fetchCourses()
        // setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [])

    return (
        <>
            <PageTitle>Courses</PageTitle>
            <SectionTitle>{courses.length > 0 ? 'List of available courses' : 'There is no courses at the moment'}</SectionTitle>

            {
                query.get('viewModule') === "true" ? (
                    <div className='flex align-self-center'>
                        <span className='text-white font-bold'>this is a modules</span>
                    </div>
                ) : null
            }


        </>
    )
}

export default Tables
