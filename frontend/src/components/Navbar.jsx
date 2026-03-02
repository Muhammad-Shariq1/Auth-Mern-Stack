import { BookA, BookOpen, LogOut, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const {user, setUser} = getData()
    const accessToken = localStorage.getItem("accessToken")
    console.log(user);

    const logoutHandler = async()=>{
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`,{},{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <nav className='p-2 border-b border-gray-200 bg-transparent'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {/* logo section  */}
                <div className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-black' />
                    <h1 className='font-bold text-xl'><span className='text-black'>Notes</span>App</h1>
                </div>
                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-7 items-center text-lg font-semibold'>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>About</li>
                        {
                            user ? <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback className="bg-black text-white">CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><User/>Profile</DropdownMenuItem>
                                    <DropdownMenuItem><BookA/>Notes</DropdownMenuItem>
                                    <DropdownMenuItem><Link to={'/change-password/' + user?.email}>Change Password</Link></DropdownMenuItem>
                                   <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logoutHandler} ><LogOut/>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> : (
                                <>
                                    <Link to={'/login'}>
                                        <li className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                                            Login
                                        </li>
                                    </Link>
                                    <Link to={'/signup'}>
                                        <li className="px-4 py-2 border-2 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors">
                                            Signup
                                        </li>
                                    </Link>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
