import React, { use } from 'react'
import Logo from './shared/Logo'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {

            const res = await axios.get("http://localhost:8000/api/v1/user/logout");
            if (res.data.success) {
                navigate("/login");

                toast.success(res.data.message);


            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='border-b border-gray-300'>
            <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4">
                <Logo />
                {
                    user ? (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="w-[52px]">
                                    <AvatarImage className="w-full h-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>

                            </PopoverTrigger>
                            <PopoverContent>
                                <Button variant='link' onClick={logoutHandler}>Logout</Button>
                            </PopoverContent>


                        </Popover>


                    ) : (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant='outline' >Login</Button></Link>
                            <Link to="/signup"><Button>Signup</Button></Link>
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default Navbar



// import React from 'react';
// import Logo from './shared/Logo';
// import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
// import { Button } from './ui/button';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const user = true;

//   const logoutHandler = async () => {
//     try {
//       // Your logout logic here
//       console.log("User logged out");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <nav className="border-b border-gray-300 bg-white shadow-sm">
//       <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4 sm:px-6">
//         {/* Logo */}
//         <Logo />

//         {/* User Section */}
//         {user ? (
//           <Popover>
//             <PopoverTrigger>
//               <Avatar className="w-12 h-12 cursor-pointer">
//                 <AvatarImage
//                   className="w-full h-full"
//                   src="https://github.com/shadcn.png"
//                   alt="@shadcn"
//                 />
//               </Avatar>
//             </PopoverTrigger>

//             <PopoverContent className="w-48 bg-white border rounded-md shadow-lg mt-2 p-2 flex flex-col gap-2">
//               <Link
//                 to="/profile"
//                 className="py-2 px-4 hover:bg-gray-100 rounded-md"
//               >
//                 Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 className="py-2 px-4 hover:bg-gray-100 rounded-md"
//               >
//                 Settings
//               </Link>
//               <Button
//                 variant="link"
//                 className="text-left py-2 px-4 hover:bg-gray-100 rounded-md"
//                 onClick={logoutHandler}
//               >
//                 Logout
//               </Button>
//             </PopoverContent>
//           </Popover>
//         ) : (
//           <div className="flex gap-2">
//             <Link to="/login">
//               <Button variant="default">Login</Button>
//             </Link>
//             <Link to="/signup">
//               <Button variant="default">Signup</Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

