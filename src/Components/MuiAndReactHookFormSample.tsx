import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FormContainer } from './FormRowWrapper';
import FormRowWrapper from './FormRowWrapper';

const defaultValues = {
  email: '',
  password: '',
  birthdate: '',
  birthdateObj: {
    year: '',
    month: '',
    day: '',
  },
  apply: {
    online: true,
    offline: false,
  },
  timeCode: null,
}

const timeCodeMap = {
  '午前中': 1,
  '12時〜16時': 2,
  '16時〜19時': 3,
  '20時以降': 4,
}

const getAge = (birthday: string) => {
  const birthdate = new Date(birthday);
  const today = new Date();
  const currentYearBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
  const age = today.getFullYear() - birthdate.getFullYear()
  const adjustAge = today < currentYearBirthday ? age - 1 : age
  if(Number.isNaN(adjustAge)){
    return null
  }
  return `${adjustAge}歳`
}

const loginInputSchema = z.object({
  email: z.string().email('メールアドレスの形式で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
    'パスワードは半角英数字混合で入力してください'
  ),
  birthdate: z.string(),
  birthdateObj: z.object({
    year: z.string().length(4, '無効な値です'),
    month: z.string().refine(value => {
      const month = parseInt(value);
      return month >= 1 && month <= 12;
    }, '無効な値です'),
    day: z.string().refine(value => {
      const day = parseInt(value);
      return day >= 1 && day <= 31;
    }, '無効な値です'),
  }),
  apply: z.object({
    online: z.boolean(),
    offline: z.boolean(),
  }),
  timeCode: z.number().nullish(),
});

type LoginInputType = z.infer<typeof loginInputSchema>;

const MuiAndReactHookFormSample = memo(() => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data)
  };

  const watchBirthdate = watch('birthdate');
  

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
        <FormRowWrapper label='年齢'>
          <TextField
            type="date"
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            error={'birthdate' in errors}
            helperText={errors.birthdate?.message}
            {...register('birthdate')}
          />
          {getAge(watchBirthdate)}
        </FormRowWrapper>
        <FormRowWrapper label="生年月日">
          <Box display='flex' columnGap={1}>
            <TextField
              variant="outlined"
              size="small"
              label='年'
              error={errors.birthdateObj ? 'year' in errors.birthdateObj : undefined}
              helperText={errors.birthdateObj?.year?.message}
              {...register('birthdateObj.year')}
            />
            <TextField
              variant="outlined"
              size="small"
              label='月'
              error={errors.birthdateObj ? 'month' in errors.birthdateObj : undefined}
              helperText={errors.birthdateObj?.month?.message}
              {...register('birthdateObj.month')}
            />
            <TextField
              variant="outlined"
              size="small"
              label='日'
              error={errors.birthdateObj ? 'day' in errors.birthdateObj : undefined}
              helperText={errors.birthdateObj?.day?.message}
              {...register('birthdateObj.day')}
            />
          </Box>
        </FormRowWrapper>
        <FormRowWrapper label='申し込み'>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked={defaultValues.apply.online} {...register('apply.online')}/>} label='web' />
            <FormControlLabel control={<Checkbox defaultChecked={defaultValues.apply.offline} {...register('apply.offline')}/>} label='対面' />
          </FormGroup>
        </FormRowWrapper>
        <FormRowWrapper label='連絡可能日時'>
          <Controller
            control={control}
            name='timeCode'
            render={({ field }) => (
              <Select
                {...field}
                variant='outlined'
                size='small'
                name='timeCode'
                value={field.value ?? ''}
                style={{minWidth: '160px', textAlign: 'left'}}
              >
                <MenuItem value=''>未選択</MenuItem>
                {Object.entries(timeCodeMap).map(([key, value]) => (
                  <MenuItem value={value} key={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            )}
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