import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const AuthorDetails = () => {

    const [author, setAuthor] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getAuthorDetails = async () => {
            await axios.get('/api/author/' + id).then(res => {
                setAuthor(res.data)
            }).catch(err => {
                console.log(err)
            })
        }

        getAuthorDetails()
    }, [])

    return (
        <>
            <div className="p-1 flex justify-center items-center" style={{ minHeight: '75vh' }}>
                <div className="max-w-md mx-auto bg-white rounded drop-shadow-md overflow-hidden md:w-full md:max-w-2xl mb-4">
                    <div className="md:flex">
                        {
                            author.image !== undefined &&
                            <div className="md:shrink-0 p-1">
                                <img className="h-62 w-full rounded object-cover md:h-full md:w-72" alt="profile" src={`../../../uploads/${author.image}`} />
                            </div>
                        }
                        <div className="p-8 md:flex md:justify-center w-full">
                            <div>
                                <div className="uppercase tracking-wide text-sm text-yellow-500 font-semibold"> {author.firstName + ' ' + author.lastName} </div>
                                <div className="block mt-1 text-lg leading-tight font-medium text-black">

                                </div>
                                <div className="mt-4">
                                    <div className="mt-2 text-black">About</div>
                                    <small className="block mx-2 my-2">
                                        Nationality : {author.country}
                                    </small>
                                    <small className="block mx-2 my-2">
                                        Birthday : {author.birthday}
                                    </small>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
