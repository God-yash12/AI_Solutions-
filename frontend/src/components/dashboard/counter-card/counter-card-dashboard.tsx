import DashboardCountCard from "../../ui/counter-card/counter-card";
import { FaNewspaper, FaStar, FaUserSecret, FaCalendarAlt } from "react-icons/fa";

const cardDetails = [
    {
      id: 1,
      amount: 234,
      cardName: "Ratings",
      icon: FaStar,
    },
    {
      id: 2,
      amount: 234,
      cardName: "Inquiries ",
      icon: FaUserSecret,
    },
    {
      id: 3,
      amount: 234,
      cardName: "Events",
      icon: FaCalendarAlt ,
    },
    {
      id: 4,
      amount: 234,
      cardName: "Blogs",
      icon: FaNewspaper,
    },
  ];
  
  const CounterCards = () => {
    return (
      <div className="container mx-auto flex flex-wrap gap-4">
        {cardDetails.map((data) => (
          <section key={data.id} className="grow">
            <DashboardCountCard
              amount={data.amount}
              cardName={data.cardName}
              icon={data.icon}
            />
          </section>
        ))}
      </div>
    );
  };
  
  export default CounterCards;