import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
                {author.firstName + ' ' + author.lastName}
            </div>
        </>
    )
}
