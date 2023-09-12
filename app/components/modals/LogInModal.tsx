"use client";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import Modal from "./Modal";
import userRegisterModal from "@/app/hooks/userRegister";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import Button from "../Button";
import {AiFillGithub} from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LogInModal = () => {
  const router = useRouter();
  const registerModal = userRegisterModal();
  const logInModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In Successfully");
        router.refresh();
        logInModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  // Login modal close and register modal open function
  const toggle = useCallback(() => {
    logInModal.onClose();
    registerModal.onOpen();
  }, [logInModal, registerModal]);

  // register modal  body
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Log In your account' />
      <Input id='email' label='Email' type='email' register={register} errors={errors} disabled={isLoading} required />

      <Input id='password' label='Password' type='password' register={register} errors={errors} disabled={isLoading} required />
    </div>
  );

  // register modal footer content

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='Continue with google' icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label='Continue with github' icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <div>First time using Aribnb?</div>
          <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline '>
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal disable={isLoading} isOpen={logInModal.isOpen} title='Log In' actionLabel='Continue' onClose={logInModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    </div>
  );
};

export default LogInModal;
