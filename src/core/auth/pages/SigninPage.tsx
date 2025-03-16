/* eslint-disable @typescript-eslint/no-misused-promises */
import { notify } from "@/lib/notify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUserSchema, type SignInUserData } from "../schema/auth.schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { signInUser } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { authActions } from "../auth.slice";
import { FormField } from "@/common/components/ui/form/FormField";
import { Button } from "@/common/components/ui/Button";

export const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: pending },
  } = useForm<SignInUserData>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit: SubmitHandler<SignInUserData> = async function (data) {
    try {
      const { access_token } = await signInUser(data);
      dispatch(authActions.setToken(access_token));
      notify.success("Sign in successful");
      await navigate("/");
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

          <a className="btn btn-neutral">
            <i className="fa-brands fa-google text-primary"></i>
            Log in with Google
          </a>

          <div className="divider">OR</div>

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
            <button
              className="btn btn-ghost btn-sm btn-circle absolute top-[56%] right-0 mr-2"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {showPassword ? (
                <EyeIcon className="h-6 text-gray-400" />
              ) : (
                <EyeSlashIcon className="h-6 text-gray-400" />
              )}
            </button>
          </FormField>

          <div className="form-control">
            <label className="label cursor-pointer gap-2 self-start">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">Remember me</span>
            </label>
          </div>

          <Button shape="primary" type="submit" pending={pending}>
            Log In
          </Button>
        </div>
      </form>
    </main>
  );
};
