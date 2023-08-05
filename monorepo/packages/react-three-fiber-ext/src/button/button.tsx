import type {FC, ButtonHTMLAttributes} from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
	return <button {...props}>{children}</button>;
};

export default Button;
