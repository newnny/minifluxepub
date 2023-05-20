import React from 'react';
import './CheckBox.css'

interface valueProps{
  categoryId: number;
  categoryTitle: string;
  total: number;
}

interface CheckBoxProps {
  isChecked: boolean;
  label: string | undefined;
  onChange: (id: number, value:valueProps) => void;
  id: number;
  value: valueProps;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  label,
  onChange,
  id,
  value
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(id, value);
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