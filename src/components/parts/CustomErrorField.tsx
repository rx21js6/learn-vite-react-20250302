import { FieldValues, useForm } from 'react-hook-form'

import { Path } from 'react-hook-form'
import { FormDataMode1, FormDataMode2 } from '../pages/CustomForm'

export type CustomErrorFieldProps<
  TFieldValues extends FieldValues = Record<string, unknown>,
> = {
  title: string
  name: Path<TFieldValues>
  placeholder: string
  form:
    | ReturnType<typeof useForm<FormDataMode1>>
    | ReturnType<typeof useForm<FormDataMode2>>
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
        {(form.formState.errors[name]?.message as string) ?? ''}
      </div>
    </div>
  )
}
