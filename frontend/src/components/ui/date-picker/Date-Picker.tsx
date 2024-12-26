
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const DatePicker = ({ children }: { children: React.ReactNode }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     {children}
    </LocalizationProvider>
  );
};

export default DatePicker;
