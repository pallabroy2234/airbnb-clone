"use client";
import {useCallback, useState} from "react";

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal";
import userRegisterModal from "@/app/hooks/userRegister";
import axios from "axios";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import Button from "../Button";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {

  // 
  const loginModal = useLoginModal();
  const registerModal = userRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //  Register modal Close and login modal open function
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  // register modal  body
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an Account' />
      <Input id='email' label='Email' type='email' register={register} errors={errors} disabled={isLoading} required />

      <Input id='name' label='Name' register={register} errors={errors} disabled={isLoading} required />

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
          <div>Already have an account?</div>
          <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline '>
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal disable={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    </div>
  );
};

export default RegisterModal;
