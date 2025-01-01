import { Loader2 } from 'lucide-react';
import { IconType } from 'react-icons/lib';

// Counter Card Component
interface CounterCardProps {
  amount?: number;
  cardName: string;
  icon: IconType;
  isLoading?: boolean;
  error?: any;
}

export const DashboardCountCard: React.FC<CounterCardProps> = ({ 
  amount, 
  cardName, 
  icon: Icon,
  isLoading,
  error 
}) => {
  return (
    <div className="bg-white shadow-lg h-28 border rounded-tr-3xl flex items-center justify-between p-4">
      <div className="flex flex-col justify-start gap-5">
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : error ? (
          <p className="text-red-500 text-sm">Error loading data</p>
        ) : (
          <p className="font-semibold text-2xl">{amount}</p>
        )}
        <p className="text-sm text-gray-600">{cardName}</p>
      </div>
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#D8ECF1]">
        <div className="flex justify-center items-center w-full h-full">
          <Icon className="text-center text-5xl text-yellow-500" />
        </div>
      </div>
    </div>
  );
};