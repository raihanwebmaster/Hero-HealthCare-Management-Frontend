/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import {
   useGetDoctorQuery,
   useUpdateDoctorMutation,
} from '@/redux/api/doctorApi';
import { FieldValues } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { Gender } from '@/types';
import MultipleSelectChip from './MultipleSelectChip';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import HInput from '@/components/Forms/HInput';
import HSelectField from '@/components/Forms/HSelectField';
import HForm from '@/components/Forms/HForm';
import HFullScreenModal from '@/components/Shared/HModal/HFullScreenModal';

type TProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   id: string;
};

const validationSchema = z.object({
   experience: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   apointmentFee: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   name: z.string().optional(),
   contactNumber: z.string().optional(),
   registrationNumber: z.string().optional(),
   gender: z.string().optional(),
   qualification: z.string().optional(),
   currentWorkingPlace: z.string().optional(),
   designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
   const { data: doctorData, refetch, isSuccess } = useGetDoctorQuery(id);
   const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);
   const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

   const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

   useEffect(() => {
      if (!isSuccess) return;

      setSelectedSpecialtiesIds(
         doctorData?.doctorSpecialties.map((sp: any) => {
            return sp.specialtiesId;
         })
      );
   }, [isSuccess]);

   const submitHandler = async (values: FieldValues) => {
      const specialties = selectedSpecialtiesIds.map(
         (specialtiesId: string) => ({
            specialtiesId,
            isDeleted: false,
         })
      );

      console.log({ id });
      // return;

      const excludedFields: Array<keyof typeof values> = [
         'email',
         'id',
         'role',
         'needPasswordChange',
         'status',
         'createdAt',
         'updatedAt',
         'isDeleted',
         'averageRating',
         'review',
         'profilePhoto',
         'registrationNumber',
         'schedules',
         'doctorSpecialties',
      ];

      const updatedValues = Object.fromEntries(
         Object.entries(values).filter(([key]) => {
            return !excludedFields.includes(key);
         })
      );

      updatedValues.specialties = specialties;

      try {
         updateDoctor({ body: updatedValues, id });
         await refetch();
         setOpen(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <HFullScreenModal open={open} setOpen={setOpen} title='Update Profile'>
         <HForm
            onSubmit={submitHandler}
            defaultValues={doctorData}
            resolver={zodResolver(validationSchema)}
         >
            <Grid container spacing={2} sx={{ my: 5 }}>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput name='name' label='Name' sx={{ mb: 2 }} fullWidth />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='email'
                     type='email'
                     label='Email'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='contactNumber'
                     label='Contract Number'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='address'
                     label='Address'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='registrationNumber'
                     label='Registration Number'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='experience'
                     type='number'
                     label='Experience'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HSelectField
                     items={Gender}
                     name='gender'
                     label='Gender'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='apointmentFee'
                     type='number'
                     label='ApointmentFee'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='qualification'
                     label='Qualification'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='currentWorkingPlace'
                     label='Current Working Place'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <HInput
                     name='designation'
                     label='Designation'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <MultipleSelectChip
                     allSpecialties={allSpecialties}
                     selectedIds={selectedSpecialtiesIds}
                     setSelectedIds={setSelectedSpecialtiesIds}
                  />
               </Grid>
            </Grid>

            <Button type='submit' disabled={updating}>
               Save
            </Button>
         </HForm>
      </HFullScreenModal>
   );
};

export default ProfileUpdateModal;