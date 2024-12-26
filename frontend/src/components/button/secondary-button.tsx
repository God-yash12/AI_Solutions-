import Button, { ButtonProps } from '@mui/material/Button';


interface SecondaryButtonProps extends ButtonProps {
    children: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    type = "button",
    children,
    onClick,
    ...props
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            {...props}
            variant="outlined"
            className={`bg-[2B2352]`}
        >
            {children}
        </Button>
    )
}

export default SecondaryButton
