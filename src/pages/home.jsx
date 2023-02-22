import React, { useState, useEffect } from 'react'
import { AppCtx } from '../context/appContext';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Header from '../components/Header.component';
import CountryCard from '../components/CountryCard.component';

export default function Home() {

    const { countries, setCountries } = AppCtx();
    const [toggleSelect, setToggleSelect] = useState(false);
    const [filter, setFilter] = useState("Filter by Region");
    const [data, setData] = useState(countries ?? "");
    const [regions, setRegions] = useState([]);
    const [resetFilter, setResetFilter] = useState(false);

    useEffect(() => {
        getCountriesData();
    }, []);

    const getCountriesData = async () => {
        return await fetch("https://restcountries.com/v2/all")
            .then(r => r.json())
            .then(res => {
                if (res) {
                    setCountries(res);
                    setData(res);

                    let regionsList = res.map(item => item.region);
                    if (regionsList) {
                        setRegions([... new Set(regionsList)]);
                    }
                }
            })
    }

    const handleSearchCountry = async (e) => {
        let searchText = e.target.value;
        let result = countries.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        if (result) {
            setData(result);
        } else {
            setData(countries);
        }
    }

    const handleFilterResult = () => {
        let result = countries.filter(item => item.region.toLowerCase() == filter.toLowerCase());

        if (result) {
            setData(result);
        } else {
            setData(countries);
        }

    }

    useEffect(() => {
        if (filter != "Filter by Region") {
            handleFilterResult();
        }
    }, [filter]);

    const resetFilterResults = () => {
        setData(countries);
        setFilter("Filter by Region");
        setResetFilter(false);
    }

    return (
        <>

            <Header />

            <div className="py-8 px-12 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <div className="flex justify-between flex-wrap md:flex-nowrap">
                    <div className="w-full md:w-2/3 lg:w-1/3 relative">
                        <BsSearch className='absolute text-black dark:text-white font-md top-4 left-6' />
                        <input
                            type={"text"}
                            name="countries"
                            placeholder='Search for a countries'
                            className='text-black dark:text-white py-4 pr-4 pl-16 bg-white dark:bg-gray-800 shadow-sm rounded-sm text-sm w-full focus-within:outline-none'
                            onChange={(e) => handleSearchCountry(e)}
                        />
                    </div>
                    <div className='text-dark dark:text-white text-sm relative'>

                        <div
                            className='min-w-[150px] mt-3 md:mt-0 flex items-center bg-white dark:bg-gray-800 py-4 px-6 rounded'
                            onClick={() => {
                                setToggleSelect(!toggleSelect);
                            }}
                        >
                            <span className='mr-4'>{filter && filter}</span>
                            <IoIosArrowDown />
                        </div>
                        {
                            resetFilter &&
                            <p
                                className='underline text-blue-600 dark:text-blue-400 text-center cursor-pointer'
                                onClick={resetFilterResults}
                            >Reset Filter</p>
                        }
                        <ul className={`bg-white dark:bg-gray-800 mt-1 rounded max-h-[200px] overflow-y-auto absolute w-full ${toggleSelect ? "block" : "hidden"}`}>
                            {
                                regions && regions.length > 0 ?
                                    regions?.map((item, idx) =>
                                        <li className='px-4 py-2 font-sm hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer'
                                            key={idx}
                                            onClick={() => {
                                                setFilter(item);
                                                setResetFilter(true);
                                            }}
                                        >{item}</li>
                                    )
                                    :
                                    (<li className='px-4 py-2 font-sm hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer'>No Region Found</li>)
                            }
                        </ul>

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-16 my-16">
                    {
                        data && data.length > 0 ?
                            data.map((item, idx) =>
                                <CountryCard
                                    data={item}
                                    key={idx}
                                />
                            )
                            :
                            (<p className='col-span-4 text-center text-black dark:text-white'>No Record Found!</p>)
                    }

                </div>

            </div>

        </>
    )
}
