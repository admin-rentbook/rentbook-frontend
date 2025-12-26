import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { reportDetailsSchema, reportIssueSchema } from '../constants/validationSchemas';

export const useReport = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const issueForm = useForm<z.infer<typeof reportIssueSchema>>({
    resolver: zodResolver(reportIssueSchema),
    mode: 'onChange',
    defaultValues: {
      issue: '',
    },
  });

  const detailsForm = useForm<z.infer<typeof reportDetailsSchema>>({
    resolver: zodResolver(reportDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      evidence: undefined,
    },
  });

  const isIssueButtonDisabled = !issueForm.formState.isValid;
  const isDetailsButtonDisabled = !detailsForm.formState.isValid;

  const onIssueSubmit = (data: z.infer<typeof reportIssueSchema>) => {
    console.log('Selected issue:', data);
    setShowDetailsModal(true);
  };

  const onDetailsSubmit = (data: z.infer<typeof reportDetailsSchema>) => {
    console.log('Report details:', data);
    console.log('Selected issue:', issueForm.getValues('issue'));
    setShowDetailsModal(false);
    setShowSuccessModal(true);
  };

  return {
    issueForm,
    detailsForm,
    isIssueButtonDisabled,
    isDetailsButtonDisabled,
    showDetailsModal,
    setShowDetailsModal,
    showSuccessModal,
    setShowSuccessModal,
    onIssueSubmit,
    onDetailsSubmit,
  };
};