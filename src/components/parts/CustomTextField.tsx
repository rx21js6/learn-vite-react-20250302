import '@/components/parts/CustomTextField.css'

export const CustomTextField: React.FC = () => {
  return (
    <div className="customTextField">
      <div className="customTextFieldHeader">
        <label className="customTextFieldLabel">
          フォームタイトルが長い文字列
        </label>
        <div className="customTextFieldNote">注釈の文言もそこそこ長い</div>
      </div>
      <div className="customTextFieldInput">
        <input type="text" value="入力フィールド" />
      </div>
    </div>
  )
}
