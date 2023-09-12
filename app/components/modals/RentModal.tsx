"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import {useMemo, useState} from "react";
import Heading from "../Heading";
import {categories} from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {FieldValues, useForm} from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  // form control
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      pirce: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathRoomCount = watch("bathroomCount");

  // map components import

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // on back handler
  const onBack = () => {
    setStep((value) => value - 1);
  };

  //
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  //
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  // rent modal body content
  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Which of these best descripes your place?' subtitle='Pick a category' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput onClick={(category) => setCustomValue("category", category)} selected={category === item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );

  // rent modal location content
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Where is your place  located?' subtitle='Help guests find you!' />

        <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />

        {/* map */}
        <Map center={location?.latlng} />
      </div>
    );
  }

  //  rent modal info content
  if (step == STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Share  some basic about your place' subtitle='What amenities do you have?' />

        {/* coutner */}
        <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount} onChange={(value) => setCustomValue("guestCount", value)} />

        <hr />

        <Counter title='Rooms' subtitle='How many  rooms yhou have?' value={roomCount} onChange={(value) => setCustomValue("roomCount", value)} />

        <hr />
        
        <Counter title='Bathroom' subtitle='How many bathroom do you have?' value={bathRoomCount} onChange={(value) => setCustomValue("bathroomCount", value)} />
      </div>
    );
  }

  return (
    <div>
      <Modal title='Airbnb your home' onClose={rentModal.onClose} onSubmit={onNext} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} isOpen={rentModal.isOpen} body={bodyContent} />
    </div>
  );
};

export default RentModal;
