import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Author = ({ id }) => {

    const [author, setAuthor] = useState({})

    useEffect(() => {
        const getAuthor = async () => {
            await axios.get('/api/author/' + id).then(res => {
                setAuthor(res.data)
            })
        }

        getAuthor()

    }, [])


    return (
        <>
            <div>
                <Link to={`/author/${id}`} className="hover:underline hover:text-slate-600">
                    {author.firstName + ' ' + author.lastName}
                </Link>
            </div>
        </>
    )
}
