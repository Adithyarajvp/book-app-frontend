import React from 'react'
import { Link } from 'react-router-dom'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";    
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    {name: "Dashboard", href:"/dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {

    const {currentUser, logout} = useAuth()
    const handleLogOut = () => {
        logout();
    }
    const [isDropdownOpen, setisDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
    
    return (

        


        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className='flex justify-between  items-center'>
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to={"/"}>
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/*Search Inpit */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearch  className='absolute inline-block left-3 inset-y-2'/>
                        <input type="text" placeholder="Search here" className='bg-[#EAEAEA]
                w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'></input>
                    </div>
                </div>
                
                {/* Right Side */}
                <div className='relative flex items-center md:space-x-2 space-x-2'>
                    <div className=''>
                        {
                            currentUser ? <>
                            <button onClick={()=> setisDropdownOpen(!isDropdownOpen)}> 
                                <img src={avatarImg} alt="" className={`size-7 rounded-full 
                                ${currentUser ? 'ring-2 ring-blue-500' : ''}`}/>
                            </button>
                            {/* Dropdown */}
                            {
                                isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                        <ul className='py-2'>
                                            {
                                                navigation.map((item)=>(
                                                    <li key={item.name} onClick={()=>setisDropdownOpen(false)}>
                                                        <Link to={item.href}  className='block  px-4 py-2 text-sm hover:bg-gray-100'>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button onClick={handleLogOut}
                                                className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </> : <Link to={"/login"}><HiOutlineUser className='size-6'/></Link>
                        }
                    </div>
                    
                    <button className='hidden sm:block'>
                    <HiOutlineHeart className='size-6' />
                    </button>

                    <Link to={"/cart"} className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                    <HiOutlineShoppingCart className=''/>
                    {
                        <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
                    }
                    
                    
                    </Link>

                </div>
            </nav>
        </header>
    )
}

export default Navbar
