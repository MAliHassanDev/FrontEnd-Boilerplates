// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Button } from "@/shared/components/ui/Button";
// import { FormField } from "@/shared/components/ui/form/FormField";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { Link, useNavigate } from "react-router";
// import {
//   registerUserSchema,
//   type RegisterUserData
// } from "../../auth/schema/auth.schema";
// import { notify } from "@/lib/notify";
// import { useState } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
// import { AuthService } from "../../auth/services/auth.service";

// export const RegisterPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting: pending }
//   } = useForm<RegisterUserData>({
//     resolver: zodResolver(registerUserSchema),
//     defaultValues: {
//       email: "",
//       password: ""
//     }
//   });
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const onSubmit: SubmitHandler<RegisterUserData> = async function (data) {
//     try {
//       // Use the authService to register the user
//       const authService = new AuthService();
//       await authService.registerUser(data);
//       notify.success("Registration successful");
//       await navigate("/");
//     } catch (error) {
//       if (error instanceof Error) {
//         notify.error(error.message);
//       }
//     }
//   };

//   return (
//     <main className="flex w-full flex-1 items-center justify-center">
//       <form
//         method="post"
//         action="/account/register"
//         onSubmit={handleSubmit(onSubmit)}
//         noValidate
//       >
//         <div className="rounded-box border-light-content flex max-w-md flex-col gap-4 border p-6 shadow md:min-w-sm">
//           <h1 className="self-center text-3xl font-bold">Create an account</h1>

//           <span className="self-center">
//             Already have an account?
//             <Link to="/login" className="link link-Light">
//               Log in
//             </Link>
//           </span>

//           <Link to={"/"} className="btn btn-neutral">
//             <i className="fa-brands fa-google text-primary"></i>
//             Create with Google
//           </Link>

//           <div className="divider my-0">OR</div>

//           <FormField
//             errorMessage={errors.email?.message}
//             name="email"
//             type="email"
//             register={register}
//             label="Email"
//             autoComplete="email"
//           />

//           <FormField
//             errorMessage={errors.password?.message}
//             name="password"
//             type={showPassword ? "text" : "password"}
//             label="Password"
//             autoComplete="password"
//             register={register}
//           ></FormField>

//           <FormField
//             errorMessage={errors.confirmPassword?.message}
//             name="confirmPassword"
//             type={showPassword ? "text" : "password"}
//             label="Confirm Password"
//             autoComplete="password"
//             register={register}
//           >
//             <button
//               className="btn btn-ghost btn-sm btn-circle absolute top-[56%] right-0 mr-2"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//                 <EyeIcon className="h-6 text-gray-400" />
//               ) : (
//                 <EyeSlashIcon className="h-6 text-gray-400" />
//               )}
//             </button>
//           </FormField>

//           <div className="form-control">
//             <label className="label cursor-pointer gap-2 self-start">
//               <input type="checkbox" className="checkbox" />
//               <span className="label-text">
//                 I accept the
//                 <Link to={"/"} className="link link-accent">
//                   Terms and Conditions
//                 </Link>
//               </span>
//             </label>
//           </div>

//           <Button shape="primary" type="submit" pending={pending}>
//             Log In
//           </Button>
//         </div>
//       </form>
//     </main>
//   );
// };
