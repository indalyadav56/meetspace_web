// "use client";

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHook";
// import { getSingleUser } from "@/redux/features/user/userApi";
// import Cookies from "js-cookie";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Form } from "./ui/form";
// import { Label } from "./ui/label";
// import CookieService from "@/lib/cookies";
// import constants from "@/constants";
// import JwtService from "@/lib/jwt";

// const UserProfile = () => {
//   const dispatch = useAppDispatch();
//   const currentUser = useAppSelector((state) => state.userReducer.currentUser);

//   useEffect(() => {
//     const accessToken = CookieService.getCookie(constants.token.ACCESS_TOKEN);
//     console.log("accessToken", accessToken);
//     if (accessToken) {
//       const jwtData = JwtService.verifyToken(accessToken);
//       if (jwtData?.user_id) dispatch(getSingleUser(jwtData?.user_id));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Login form submitted:", { email, password });
//   };

//   return (
//     <div className="flex flex-col">
//       <h1>{currentUser?.username}</h1>
//       <Avatar className="w-24 h-24">
//         <AvatarImage src="https://github.com/shadcn.png" />
//         <AvatarFallback>IN</AvatarFallback>
//       </Avatar>
//       <Form onSubmit={handleSubmit}>
//         <Label htmlFor="email">Email:</Label>
//         <Input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           required
//         />
//       </Form>

//       <Button>Update</Button>
//     </div>
//   );
// };

// export default UserProfile;
