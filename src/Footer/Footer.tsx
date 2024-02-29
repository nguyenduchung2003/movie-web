import { Box, Typography } from "@mui/material"
import Apple from "../assets/Picture/apple.png"
import GGPlay from "../assets/Picture/google-play.png"

const Footer = () => {
     return (
          <>
               <Box className="flex justify-evenly  bg-[rgba(0,0,0,.75)] text-gray-200 h-[300px]">
                    <Box className="flex flex-col gap-5  mt-[50px]">
                         <Typography
                              className="font-bold font-mono text-white"
                              variant="h5"
                         >
                              Information
                         </Typography>
                         <Typography>Email us:admin@gmail.com</Typography>
                         <Typography>Phone: 0123456789</Typography>
                         <Typography>Address: 123/4/5</Typography>
                    </Box>
                    <Box className="flex flex-col gap-5  mt-[50px]">
                         <Typography
                              className="font-bold font-mono text-white"
                              variant="h5"
                         >
                              Quick Links
                         </Typography>
                         <Typography>Home</Typography>
                         <Typography>About</Typography>
                         <Typography>Pricing Plan</Typography>
                         <Typography>FAQ</Typography>
                    </Box>
                    <Box className="flex flex-col gap-5  mt-[50px]">
                         <Typography
                              className="font-bold font-mono text-white"
                              variant="h5"
                         >
                              Movies To Watch
                         </Typography>
                         <Typography>Top Trending</Typography>
                         <Typography>Recommended</Typography>
                         <Typography>Popular</Typography>
                    </Box>
                    <Box className="flex flex-col gap-5  mt-[50px]">
                         <Typography
                              className="font-bold font-mono text-white"
                              variant="h5"
                         >
                              About Company
                         </Typography>
                         <Typography>Contact US</Typography>
                         <Typography>Privacy Policy</Typography>
                         <Typography>Terms Of Use</Typography>
                    </Box>
                    <Box className="flex flex-col gap-5  mt-[50px]">
                         <Typography
                              className="font-bold font-mono text-white"
                              variant="h5"
                         >
                              Download Apps
                         </Typography>

                         <img src={Apple} alt="Apple" />
                         <img src={GGPlay} alt="Google Play" />
                    </Box>
               </Box>
          </>
     )
}
export default Footer
