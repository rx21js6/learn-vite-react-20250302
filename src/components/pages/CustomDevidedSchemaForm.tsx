import { z } from 'zod'
import { CustomErrorField } from '../parts/CustomErrorField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

// モード１用スキーマ
const schemaMode1 = z.object({
  name: z.string().min(1, '名前は必須です'),
  phoneNumber: z.string().min(1, '電話番号は必須です').or(z.undefined()),
  mailAddress: z.string().optional(),
})

// モード２用スキーマ
const schemaMode2 = z.object({
  name: z.string().min(1, '名前は必須です'),
  phoneNumber: z.string().optional(),
  mailAddress: z
    .string()
    .email('正しいメールアドレスを入力してください')
    .min(1, 'メールアドレスは必須です')
    .or(z.undefined()),
})

export type FormDataMode1 = z.infer<typeof schemaMode1>
export type FormDataMode2 = z.infer<typeof schemaMode2>

export const CustomDevidedSchemaForm: React.FC = () => {
  const [mode, setMode] = useState('1')

  const defaultValues = {
    name: '',
    phoneNumber: '',
    mailAddress: '',
  }

  const formMode1 = useForm<FormDataMode1>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaMode1),
    defaultValues,
  })

  const formMode2 = useForm<FormDataMode2>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaMode2),
    defaultValues,
  })

  const [formMode, setFormMode] = useState<
    | ReturnType<typeof useForm<FormDataMode1>>
    | ReturnType<typeof useForm<FormDataMode2>>
  >(formMode1)

  const onModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('モード変更:', event.target.value)
    if (event.target.value === '2') {
      setFormMode(formMode2)
    } else {
      setFormMode(formMode1)
    }
    setMode(event.target.value)
  }
  const onSubmit = (formData: FormDataMode1 | FormDataMode2) => {
    console.log('正常:', formData)
  }
  const onError = (errors: unknown) => {
    console.log('エラー:', errors)
  }

  return (
    <div>
      <div>{JSON.stringify(formMode.watch())}</div>
      <div>
        <label>
          <input
            type="radio"
            checked={mode === '1'}
            onChange={onModeChange}
            value="1"
          />
          モード1
        </label>
        <label>
          <input
            type="radio"
            checked={mode === '2'}
            onChange={onModeChange}
            value="2"
          />
          モード2
        </label>
      </div>
      <form onSubmit={formMode.handleSubmit(onSubmit, onError)}>
        <CustomErrorField
          title={'name'}
          placeholder={'name'}
          form={formMode}
          name={'name'}
        />
        <CustomErrorField
          title={'phoneNumber'}
          placeholder={'phoneNumber'}
          form={formMode}
          name={'phoneNumber'}
        />
        <CustomErrorField
          title={'mailAddress'}
          placeholder={'mailAddress'}
          form={formMode}
          name={'mailAddress'}
        />
        <button type="submit">送信</button>
        <button
          type="button"
          onClick={() => {
            formMode.clearErrors()
          }}
        >
          エラーリセット
        </button>
      </form>
    </div>
  )
}
