import { Box, ListItem, ListItemButton, Typography } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { NavLink, useNavigate } from "react-router-dom"
import { userType } from "../types/User"

const Avatar = () => {
     const navigate = useNavigate()
     const storedData: userType[] = JSON.parse(
          localStorage.getItem("users") as string
     )
     const handleClickLogOut = () => {
          storedData.forEach((user: userType) => {
               console.log(user)
               if (user.status == true) {
                    user.status = false
               }
          })

          localStorage.setItem("users", JSON.stringify(storedData))
          navigate("/movie-web/login")
     }
     // storedData.filter(user: userType) =>  user.status == true
     return (
          <>
               <Box className="absolute z-10 right-0 top-4  flex flex-col justify-center items-center  group/item ">
                    <Typography className="bg-[rgba(0,0,0,.75)] text-white w-[150px] truncate">
                         {storedData
                              ?.filter((user) => user.status == true)
                              .map((userNow) => userNow.userName)}
                    </Typography>
                    <Box className="bg-black w-[150px] flex justify-center">
                         <AccountCircleIcon
                              fontSize="large"
                              className="text-white  "
                         />
                    </Box>

                    <ListItem
                         disablePadding
                         className="invisible flex flex-col justify-center items-center bg-white group-hover/item:visible w-[180px]  "
                    >
                         {storedData?.some((user) => user.status == true) ? (
                              <>
                                   <ListItemButton
                                        className="hover:bg-gray-500 w-full flex justify-center items-center border border-black border-solid"
                                        onClick={handleClickLogOut}
                                   >
                                        Logout
                                   </ListItemButton>
                                   <ListItemButton className="hover:bg-gray-500 w-full flex justify-center items-center border border-black border-solid">
                                        <NavLink
                                             to="/movie-web/Favorites"
                                             className="no-underline "
                                        >
                                             List of liked movies
                                        </NavLink>
                                   </ListItemButton>
                              </>
                         ) : (
                              <>
                                   <ListItemButton className="hover:bg-gray-500 w-full flex justify-center items-center border border-black border-solid">
                                        <NavLink
                                             to="/movie-web/login"
                                             className="no-underline "
                                        >
                                             Login
                                        </NavLink>
                                   </ListItemButton>
                                   <ListItemButton className="hover:bg-gray-500 w-full flex justify-center items-center border border-black border-solid">
                                        <NavLink
                                             to="/movie-web/register"
                                             className="no-underline "
                                        >
                                             Register
                                        </NavLink>
                                   </ListItemButton>
                              </>
                         )}

                         <ListItemButton className="hover:bg-gray-500 w-full flex justify-center items-center border border-black border-solid">
                              <NavLink
                                   to="/movie-web/SearchPage"
                                   className="no-underline "
                              >
                                   Search for movies
                              </NavLink>
                         </ListItemButton>
                    </ListItem>
               </Box>
          </>
     )
}
export default Avatar
