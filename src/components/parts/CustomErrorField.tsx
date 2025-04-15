import { UseFormReturn, FieldValues } from 'react-hook-form'

import { Path } from 'react-hook-form'

export type CustomErrorFieldProps<
  TFieldValues extends FieldValues = Record<string, unknown>,
> = {
  title: string
  name: Path<TFieldValues>
  placeholder: string
  form: UseFormReturn<TFieldValues>
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
