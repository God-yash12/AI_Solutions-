import AdminLoginForm from "../components/form/login-form"
import Logo from "../assets/Logo.png";

const AdminLoginFormPage = () => {
  return (
    <div>
          {/* Logo Sectio */}
          <div className="m-10">
                <img src={Logo} alt="AI Solutions Logo" />
            </div>
      <AdminLoginForm />
    </div>
  )
}

export default AdminLoginFormPage
