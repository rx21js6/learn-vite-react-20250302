import { FieldValues, useForm } from 'react-hook-form'

import { Path } from 'react-hook-form'

type CustomErrorFieldProps<TFieldValues extends FieldValues> = {
  title: string
  name: Path<TFieldValues>
  placeholder: string
  form: ReturnType<typeof useForm<TFieldValues>>
}
export const CustomErrorField = <TFieldValues extends FieldValues>(
  props: CustomErrorFieldProps<TFieldValues>
) => {
  const { title, name, placeholder, form } = props
  return (
    <div className="customErrorField">
      <div className="customErrorFieldHeader">
        <label className="customErrorFieldLabel">{title}</label>
      </div>
      <div className="customErrorFieldInput">
        <input type="text" placeholder={placeholder} {...form.register(name)} />
      </div>
      <div className="customErrorFieldError">
        {(form.formState.errors[name as keyof TFieldValues] &&
          (form.formState.errors[name as keyof TFieldValues]
            ?.message as string)) ??
          ''}
      </div>
    </div>
  )
}
