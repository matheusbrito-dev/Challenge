import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  type?: "submit" | "reset" | "button" | undefined;
  
}
const Button: React.FC<ButtonProps> = ({ type, name}) => {
  return (
    <div id="button-container">
      <button type={type}>
        {name}
      </button>
    </div>
  );
}


Button.defaultProps={
  name: 'text',
  type: 'button'
}

export default Button;
