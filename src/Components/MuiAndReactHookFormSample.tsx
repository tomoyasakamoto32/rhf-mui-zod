import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormContainer } from './FormRowWrapper';
import FormRowWrapper from './FormRowWrapper';

const loginInputSchema = z.object({
  email: z.string().email('メールアドレスの形式で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
    'パスワードは半角英数字混合で入力してください'
  ),
});

type LoginInputType = z.infer<typeof loginInputSchema>;

const MuiAndReactHookFormSample = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data)
  };

  return (
    <Box style={{border: '1px solid #ECEBEB', padding: '5rem'}}>
      <Typography variant='h4'>ログイン</Typography>
      <FormContainer>
        <FormRowWrapper
          label='メールアドレス'
        >
          <TextField
            required
            size='small'
            fullWidth
            type="email"
            error={'email' in errors}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormRowWrapper>
        <FormRowWrapper
          label='パスワード'
        >
          <TextField
            required
            size='small'
            fullWidth
            type="password"
            error={'password' in errors}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormRowWrapper>
      </FormContainer>
      <Button onClick={handleSubmit(onSubmit)} variant='contained'>
        ログイン
      </Button>
    </Box>
  )
})

export default MuiAndReactHookFormSample