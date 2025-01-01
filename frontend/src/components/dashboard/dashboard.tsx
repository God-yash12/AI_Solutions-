import CounterCards from "./counter-card/counter-card-dashboard"
import Inquiries from "./inquiries/inquiries"


const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      <CounterCards />
      <Inquiries />
    </div>
  )
}

export default AdminDashboard
