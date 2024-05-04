"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic";
import Link from "next/link"

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
  return (
    <Container>
      <Stack py={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          <Box component={"span"} color={"primary.main"} >HERO</Box> Health Care
        </Typography>
        <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
          <Typography component={Link} href="/consultation">Consultation</Typography>
          <Typography component={Link} href="/health-plans">Health Plans</Typography>
          <Typography component={Link} href="/medicine">Medicine</Typography>
          <Typography component={Link} href="/daignostics">Diagnostics</Typography>
          <Typography component={Link} href="/ngos">NGOs</Typography>
        </Stack>
        <AuthButton/>
      </Stack>
    </Container>
  )
}

export default Navbar