import Button, { ButtonProps } from '@mui/material/Button';


interface PrimaryButtonProps extends ButtonProps {
    children: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    type = "button",
    children,
    onClick,
    className,
    ...props
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            {...props}
            variant="contained"
            className={className}
        >
            {children}
        </Button>
    )
}

export default PrimaryButton
