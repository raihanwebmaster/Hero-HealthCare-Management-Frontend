"use client";
import useUserInfo from "@/hooks/userUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic";
import Link from "next/link"
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const AuthButton = dynamic(
  //   () => import("@/components/UI/AuthButton/AuthButton"),
  //   { ssr: false }
  // );
  const router = useRouter();
  const userInfo = useUserInfo();
  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
      }}
    >
      <Container>
        <Stack py={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h4" component={Link} href="/" fontWeight={600}>
            <Box component={"span"} color={"#ffffff"} >HERO</Box> Health Care
          </Typography>
          <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
            <Typography component={Link} href="/consultation" color={"#ffffff"}>Consultation</Typography>
            <Typography component={Link} href="/health-plans" color={"#ffffff"}>Health Plans</Typography>
            <Typography component={Link} href="/medicine" color={"#ffffff"}>Medicine</Typography>
            <Typography component={Link} href="/daignostics" color={"#ffffff"}>Diagnostics</Typography>
            <Typography component={Link} href="/ngos" color={"#ffffff"}>NGOs</Typography>
            {userInfo?.userId ? (
              <Typography component={Link} href='/dashboard' color={"#ffffff"}>
                Dashboard
              </Typography>
            ) : null}
          </Stack>
          {/* <AuthButton /> */}
          {userInfo?.userId ? (
            <Button color='error' onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href='/login'>
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar