import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const AdminLayout = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <nav className="bg-blue-600 text-white shadow">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-semibold">
                        <strong>WEB501 App</strong>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
                        <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
                        <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>

                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <span>Xin chào, <strong>{userString ? JSON.parse(userString).name : 'User'}</strong></span>
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-200 font-medium"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Quản lý dữ liệu</h1>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;