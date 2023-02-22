import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({ data }) {
    return (
        <Link to={`/${data.alpha3Code.toLowerCase()}`}>
            <div className="">
                <div className="h-40">
                    <img src={data.flag} alt={data.name} className='w-full h-full object-cover' />
                </div>

                <div className="px-4 py-6 text-black dark:text-white bg-white dark:bg-gray-800">
                    <h3 className='text-lg mb-4 font-bold tracking-wide'>{data.name}</h3>

                    <p className='text-sm'><b>Population:</b> {data.population}</p>
                    <p className='text-sm'><b>Region:</b> {data.region}</p>
                    <p className='text-sm'><b>Capital:</b> {data.capital}</p>
                </div>
            </div>
        </Link>
    )
}
