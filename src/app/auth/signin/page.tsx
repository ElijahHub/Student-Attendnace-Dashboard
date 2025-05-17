"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Spinner,
  Form
} from "@heroui/react";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setAuthError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      setAuthError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex justify-center">
          <h2>Sign In</h2>
        </CardHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {authError && (
              <p 
                className="text-red-500 text-sm mt-2"
                >
                {authError}
              </p>
            )}
          </CardBody>

          <CardFooter>
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading}
            >
             SignIn
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
