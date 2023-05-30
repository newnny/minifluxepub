import React from 'react';
import './CheckBox.css'

interface valueProps{
  categoryId: number;
  categoryTitle: string;
  total: number;
  checked: boolean;
}

interface CheckBoxProps {
  isChecked: boolean;
  label: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>,  value:valueProps) => void;
  value: valueProps;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  label,
  onChange,
  value
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(event, value);
  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className={isChecked?'checkbox-chekced' : 'checkbox-default'}></span>
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  )
}

export default CheckBox;