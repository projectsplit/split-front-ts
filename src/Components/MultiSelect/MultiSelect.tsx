import { StyledSelect } from "./MultiSelect.styled"

export default function MultiSelect({ onChange, options, value }: any) {
  return (
    <StyledSelect
      classNamePrefix="Select"
      blurInputOnSelect={false}
      hideSelectedOptions={true}
      closeMenuOnSelect={false}
      isMulti={true}
      onChange={onChange}
      options={options}
      value={value}
    />
  )
} 