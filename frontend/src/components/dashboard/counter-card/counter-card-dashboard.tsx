import { AdminService } from "../../../services/admin-login";
import { DashboardCountCard } from "../../ui/counter-card/counter-card";
import { FaNewspaper, FaStar, FaUserSecret, FaCalendarAlt } from "react-icons/fa";

const CounterCards = () => {
  const { data, isLoading, error } = AdminService();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  const cardDetails = [
    {
      id: 1,
      amount: data?.totalReviews || 0,
      cardName: "Ratings",
      icon: FaStar,
    },
    {
      id: 2,
      amount: data?.totalInquiries || 0,
      cardName: "Inquiries",
      icon: FaUserSecret,
    },
    {
      id: 3,
      amount: data?.totalEvent || 0,
      cardName: "Events",
      icon: FaCalendarAlt,
    },
    {
      id: 4,
      amount: data?.totalBlog || 0,
      cardName: "Blogs",
      icon: FaNewspaper,
    },
  ];

  // Render the dashboard cards
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardDetails.map((card) => (
        <DashboardCountCard
          key={card.id}
          amount={card.amount}
          cardName={card.cardName}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default CounterCards;
