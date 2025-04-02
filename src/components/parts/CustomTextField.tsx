import '@/components/parts/CustomTextField.css'

export const CustomTextField: React.FC = () => {
  return (
    <div className="customTextField">
      <label className="customTextFieldLabel">フォームタイトル</label>
      <div className="customTextFieldNote">注釈の文言</div>
      <div className="customTextFieldInput">
        <input type="text" value="入力フィールド"/>
      </div>
    </div>
  )
}
