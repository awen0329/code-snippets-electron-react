import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CodeTypes, CodeSnippet } from '@customTypes/CodeSnippetTypes';

const schema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required('Title is required'),
  code: yup.string().required('Code is required'),
  description: yup.string().required('Description is required'),
  type: yup.string<CodeTypes>().required(),
});

const useSnippetForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<CodeSnippet>({
    resolver: yupResolver<CodeSnippet>(schema),
  });
  return { control, handleSubmit, watch, reset, errors, isDirty, isValid };
};

export default useSnippetForm;
