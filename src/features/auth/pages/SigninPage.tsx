/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/global/components/ui/Button";
import { FormField } from "@/global/components/ui/form/FormField";
import { notify } from "@/lib/notify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUserSchema, type SignInUserData } from "../schema/auth.schema";

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

  const onSubmit: SubmitHandler<SignInUserData> = async function (data) {
    try {
      // await userService.signInUser(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(data);
      alert(data);
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
            type="password"
            label="Password"
            autoComplete="password"
            register={register}
          />

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
