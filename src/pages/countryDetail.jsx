import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header.component';
import { BiArrowBack } from "react-icons/bi";
import { AppCtx } from '../context/appContext';

export default function CountryDetail() {

    const { countries } = AppCtx();
    let { name } = useParams();
    const [detail, setDetail] = useState("");

    useEffect(() => {
        getCountryDetail();
    }, []);

    const getCountryDetail = async () => {
        if (name) {
            let result = countries.filter(item => item.alpha3Code.toLowerCase() === name);
            console.log("result =========== ", result);
            if (result) {
                setDetail(result);
            }
        }
    }




    return (
        <>
            <Header />

            <div className='py-8 px-12 bg-gray-100 dark:bg-gray-900 min-h-screen'>
                <Link to={"/"} className="bg-white text-black shadow-sm dark:bg-gray-800 dark:text-white py-2 px-10 my-8 flex items-center gap-2 rounded-md w-fit hover:bg-gray-300 dark:hover:bg-gray-700">
                    <BiArrowBack />
                    Back
                </Link>
                {
                    detail && detail.length > 0 ?
                        detail.map((item, idx) => (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-24" key={idx}>
                                <div className='w-full object-fill'>
                                    <img src={item.flag} alt='' className='w-full h-auto object-fill' />
                                </div>

                                <div className="text-black dark:text-white">
                                    <h2 className='text-3xl font-semibold mb-8'>{item?.name}</h2>


                                    <div className="relative">

                                        <div className="flex lg:gap-2 flex-wrap xl:gap-4 text-sm">
                                            <ul>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Native Name:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.nativeName}</span>
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Population:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.population}</span>
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Region:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.region}</span>
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Sub Region:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.subregion}</span>
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Capital:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.capital}</span>
                                                </li>
                                            </ul>

                                            <ul>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Top Level Domain:</b>
                                                    <span className='opacity-90 ml-2 font-light'>{item?.topLevelDomain?.join(" ")}</span>
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Currencies:</b>
                                                    {
                                                        item?.currencies.map((cur, idx) =>
                                                            <span className='opacity-90 ml-2 font-light' key={idx}>{cur?.name}</span>
                                                        )
                                                    }
                                                </li>
                                                <li className="pr-6 py-1 text-black whitespace-nowrap dark:text-white">
                                                    <b className='font-semibold'>Languages:</b>
                                                    {
                                                        item?.languages?.map((lang, idx) =>
                                                            <span className='opacity-90 ml-2 font-light' key={idx}>{lang.name}</span>
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        </div>


                                        <div className="text-black dark:text-white font-semibold text-sm mt-6 flex items-center gap-3 flex-wrap lg:flex-nowrap">
                                            Border Countries:
                                            <div className="flex gap-2 flex-wrap">
                                                {
                                                    item?.borders?.map((bord, idx) =>
                                                        <span className='bg-white shadow-sm dark:bg-gray-800 px-4 py-1 text-sm font-normal rounded-md' key={idx}>{bord}</span>
                                                    )
                                                }
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        ))
                        :
                        (<p>Details not Found!</p>)
                }
            </div>

        </>
    )
}
