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
          navigate("/login")
     }
     // storedData.filter(user: userType) =>  user.status == true
     return (
          <>
               <Box className="absolute z-10 right-0 top-4  flex flex-col justify-center items-center  group/item ">
                    <Typography>
                         {storedData
                              ?.filter((user) => user.status == true)
                              .map((userNow) => userNow.userName)}
                    </Typography>
                    <Box className="bg-red-400">
                         <AccountCircleIcon
                              fontSize="large"
                              className="text-white  "
                         />
                    </Box>

                    <ListItem
                         disablePadding
                         className="invisible flex flex-col justify-center items-center bg-white group-hover/item:visible "
                    >
                         <ListItemButton
                              className="hover:bg-gray-500 w-full"
                              onClick={handleClickLogOut}
                         >
                              {/* <NavLink to="/login" className="no-underline  ">
                                   Đăng xuất
                              </NavLink> */}
                              Đăng xuất
                         </ListItemButton>
                         <ListItemButton className="hover:bg-gray-500 w-full">
                              <NavLink
                                   to="/Favorites"
                                   className="no-underline "
                              >
                                   Phim đã thích
                              </NavLink>
                         </ListItemButton>
                         <ListItemButton className="hover:bg-gray-500 w-full">
                              <NavLink
                                   to="/SearchPage"
                                   className="no-underline "
                              >
                                   Tìm kiếm phim
                              </NavLink>
                         </ListItemButton>
                    </ListItem>
               </Box>
          </>
     )
}
export default Avatar
