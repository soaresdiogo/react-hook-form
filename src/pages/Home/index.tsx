import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  AgeInput,
  FormContainer,
  HomeContainer,
  NameInput,
  SendButton,
} from './style';

const newPersonFormValidationSchema = zod.object({
  name: zod.string().min(3, 'Enter with a name'),
  age: zod.number().min(18, 'Age must be greater than 18 years'),
});

type NewPersonFormData = zod.infer<typeof newPersonFormValidationSchema>;

export const Home = () => {
  const { register, handleSubmit, watch, formState } =
    useForm<NewPersonFormData>({
      resolver: zodResolver(newPersonFormValidationSchema),
      defaultValues: {
        name: '',
        age: 0,
      },
    });

  const handleCreateNewCycle = (data: NewPersonFormData) => {
    console.log(data);
  };

  console.log(formState.errors);

  const isFilledInputs = watch('name');

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="name">Name</label>
          <NameInput type="text" id="name" {...register('name')} />
          <label htmlFor="age">Age</label>
          <AgeInput
            type="number"
            id="age"
            min={18}
            {...register('age', { valueAsNumber: true })}
          />
        </FormContainer>
        <SendButton type="submit" disabled={!isFilledInputs}>
          Send
        </SendButton>
      </form>
    </HomeContainer>
  );
};
