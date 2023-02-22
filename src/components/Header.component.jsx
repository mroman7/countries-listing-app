import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import { AppCtx } from '../context/appContext'

export default function Header() {
    const { setTheme, isDarkTheme } = AppCtx();
    return (
        <div className='bg-white dark:bg-gray-800 shadow-sm py-4 px-2 sm:px-12 flex justify-between '>
            <h4 className="text-black dark:text-white font-bold sm:text-xl">Where in the world?</h4>
            <div className="text-dark dark:text-white cursor-pointer text-sm sm:text-md" onClick={() => setTheme(!isDarkTheme)}>
                {
                    isDarkTheme ? (
                        <span className='flex items-center gap-2 font-semibold'>
                            <BsSun /> Light Mode
                        </span>
                    ) : (
                        <span className='flex items-center gap-2 font-semibold'>
                            <BsMoon /> Dark Mode
                        </span>
                    )
                }

            </div>
        </div>
    )
}
