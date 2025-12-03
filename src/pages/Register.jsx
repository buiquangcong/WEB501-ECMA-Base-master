import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/register", form);
            toast.success("Đăng ký thành công!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-blue-600">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;