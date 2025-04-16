import { z } from 'zod'
import { CustomErrorField } from '../parts/CustomErrorField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const unifiedSchema = z
  .object({
    mode: z.enum(['1', '2']),
    name: z.string().min(1, '名前は必須です'),
    phoneNumber: z.string().optional(),
    mailAddress: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.mode === '1') {
        return data.phoneNumber && data.phoneNumber.trim() !== ''
      }
      return true
    },
    {
      path: ['phoneNumber'],
      message: '電話番号は必須です（モード1）',
    }
  )
  .refine(
    (data) => {
      if (data.mode === '2') {
        return data.mailAddress && data.mailAddress.trim() !== ''
      }
      return true
    },
    {
      path: ['mailAddress'],
      message: 'メールアドレスは必須です（モード2）',
    }
  )
  .refine(
    (data) => {
      if (data.mode === '2' && data.mailAddress) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mailAddress)
      }
      return true
    },
    {
      path: ['mailAddress'],
      message: '正しいメールアドレスを入力してください',
    }
  )
export type FormData = z.infer<typeof unifiedSchema>

export const CustomUniSchemaForm: React.FC = () => {
  const [mode, setMode] = useState('1')

  const form = useForm<z.infer<typeof unifiedSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(unifiedSchema),
    defaultValues: {
      mode: '1',
      name: '',
      phoneNumber: '',
      mailAddress: '',
    },
  })

  const onModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('モード変更:', event.target.value)
    setMode(event.target.value)
    form.setValue('mode', event.target.value as '1' | '2')
  }
  const onSubmit = (formData: FormData) => {
    console.log('正常:', formData)
  }
  const onError = (errors: unknown) => {
    console.log('エラー:', errors)
  }

  return (
    <div>
      <div>{JSON.stringify(form.watch())}</div>
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
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <CustomErrorField
          title={'name'}
          placeholder={'name'}
          form={form}
          name={'name'}
        />
        <CustomErrorField
          title={'phoneNumber'}
          placeholder={'phoneNumber'}
          form={form}
          name={'phoneNumber'}
        />
        <CustomErrorField
          title={'mailAddress'}
          placeholder={'mailAddress'}
          form={form}
          name={'mailAddress'}
        />
        <button type="submit">送信</button>
        <button
          type="button"
          onClick={() => {
            form.clearErrors()
          }}
        >
          エラーリセット
        </button>
      </form>
    </div>
  )
}
