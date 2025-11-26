import { Toaster } from "react-hot-toast";
// 1. Phải import thêm "Link" từ react-router-dom
import { Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit"; // Nhớ import trang Edit nếu đã tạo

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Dùng Link thay cho a href để trang không bị load lại */}
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* 2. Sửa toàn bộ thẻ <link> thành <Link> và đổi 'href' thành 'to' */}

            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>

            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>

            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>

            {/* Lưu ý: Thường ta không để nút "Sửa" ở menu chính 
                vì chưa biết sửa ID nào. Ta chỉ để nút Sửa trong bảng Danh sách thôi.
                Mình tạm ẩn đi nhé. */}
            {/* <Link to="/edit" ...>Sửa</Link> */}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-gray-200">
              Đăng nhập
            </a>
            <a href="#" className="hover:text-gray-200">
              Đăng ký
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        {/* Những dòng chữ này sẽ hiện ở TẤT CẢ các trang. 
            Nếu bạn chỉ muốn hiện ở trang chủ, hãy tạo 1 component Home riêng */}
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600 mb-8">Ứng dụng quản lý dữ liệu</p>

        <Routes>
          {/* 3. Chuẩn hóa đường dẫn thành chữ thường */}
          <Route path="/" element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={<Add />} />

          {/* Route cho trang sửa cần có :id */}
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;