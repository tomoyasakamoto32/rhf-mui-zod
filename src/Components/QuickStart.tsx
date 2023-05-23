import { memo } from "react"
import { useForm } from "react-hook-form";

type Inputs = {
  example: string,
  exampleRequired: string,
};

const QuickStart = memo(() => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  )
})

export default QuickStart