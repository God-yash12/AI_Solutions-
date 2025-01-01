import CounterCards from "../components/dashboard/counter-card/counter-card-dashboard";
import Inquiries from "../components/dashboard/inquiries/inquiries";


const AdminDashboardPage = () => {
  return (
    <div
      className="grid grid-rows-2 mt-10"
    >
      <div className="flex flex-col gap-10">
        <CounterCards />
        <Inquiries />
      </div>

    </div>
  )
}

export default AdminDashboardPage;
