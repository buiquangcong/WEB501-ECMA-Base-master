import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            const res = await axios.post('http://localhost:3001/login', {
                email,
                password
            })
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            toast.success('Đăng nhập thành công!')
            navigate('/list')
        } catch (error) {
            console.log(error)
            toast.error('Sai email hoặc mật khẩu!')
        }
    }

    return (
        <div className="p-6 flex justify-center items-center h-screen bg-gray-100">
            <form className="w-96 bg-white p-6 rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>

                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email..."
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Mật khẩu</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Đăng nhập
                </button>

                <p className="text-center text-sm">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-green-600">
                        Đăng ký ngay
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login