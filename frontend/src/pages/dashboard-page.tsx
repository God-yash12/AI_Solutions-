import AdminDashboard from "../components/dashboard/dashboard";
import CounterCards from "../components/dashboard/counter-card/counter-card-dashboard";


const AdminDashboardPage = () => {
  return (
    <div
    className="grid grid-rows-2 mt-10"
    >
    <CounterCards />
     <AdminDashboard />

    </div>
  )
}

export default AdminDashboardPage;
