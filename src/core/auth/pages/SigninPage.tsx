/* eslint-disable @typescript-eslint/no-misused-promises */
import { notify } from "@/lib/notify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUserSchema, type SignInUserData } from "../schema/auth.schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { signInUser } from "../services/auth.service";
import { FormField } from "@/common/components/ui/form/FormField";
import { useAuthStore } from "../auth.store";
import { Button } from "@/common/components/ui/Button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/common/components/ui/Checkbox";
import { DividerWithText } from "@/common/components/ui/Divider";
export const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInUserData>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from: string } | undefined)?.from ?? "/";

  const authState = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit: SubmitHandler<SignInUserData> = async function (data) {
    try {
      const res = await signInUser(data);
      authState.setAuth(res);
      notify.success("Sign in successful");
      await navigate(from);
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      }
    }
  };

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <form
        method="post"
        action="/account/register"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="rounded-box border-light-content flex max-w-md flex-col gap-4 border p-6 shadow md:min-w-sm">
          <h1 className="self-center text-3xl font-bold">Log in</h1>

          <span className="self-center">
            Don't have an account?
            <Link to="../register" className="link link-secondary">
              Register
            </Link>
          </span>

          <Button asChild>
            <a className="btn btn-neutral">
              <i className="fa-brands fa-google text-primary"></i>
              Log in with Google
            </a>
          </Button>

          <DividerWithText text="OR" />
          <FormField
            errorMessage={errors.email?.message}
            name="email"
            type="email"
            register={register}
            label="Email"
            autoComplete="email"
          />

          <FormField
            errorMessage={errors.password?.message}
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            autoComplete="password"
            register={register}
          >
            <Button
              className="absolute top-[44%] right-0 mr-2"
              variant={"ghost"}
              onClick={togglePasswordVisibility}
              type="button"
            >
              {showPassword ? (
                <EyeIcon className="h-6 text-gray-400" />
              ) : (
                <EyeSlashIcon className="h-6 text-gray-400" />
              )}
            </Button>
          </FormField>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Log In
          </Button>
        </div>
      </form>
    </main>
  );
};
