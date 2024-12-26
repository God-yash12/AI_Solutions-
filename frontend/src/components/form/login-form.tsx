
import LoginButton from "../button/primary-button";
import InputField from "../input/input";

import { AdminService } from "../../services/admin-login";



const AdminLoginForm = () => {

    const { register, handleSubmit, errors, onSubmit} = AdminService()
   

    return (
        <div>
            {/* Main body Input field */}
            <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-center text-2xl">Admin Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center gap-5">

                        <div className="w-64 lg:w-80">
                            <InputField
                                label="email"
                                variant="outlined"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </div>


                        <div className="w-64 lg:w-80">
                            <InputField
                                label="Password"
                                type="password"
                                variant="outlined"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </div>


                        <LoginButton type="submit" className="w-64 lg:w-80">
                            Login
                        </LoginButton>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2 mt-3 text-sm">
                        <p className="cursor-pointer">Forget Password?</p>
                        <span className="text-[#37545C] cursor-pointer">Reset Password</span>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminLoginForm;
