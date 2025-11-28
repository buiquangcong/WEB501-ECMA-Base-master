import { useEffect, useState } from "react";
import axios from "axios";
// 1. QUAN TRỌNG: Phải import Link
import { Link } from "react-router-dom";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001/tours";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải danh sách tour");
      })
      .finally(() => setLoading(false));
  }, []);


  const deleteTour = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa Tour này chứ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Cập nhật giao diện: Lọc bỏ tour vừa xóa
      setTours(tours.filter((t) => t.id !== id));
    } catch (err) {
      alert("Xóa thất bại: " + err.message);
    }
  };

  if (loading) return <p className="mt-6 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="flex justify-start mb-2">
        {/* Nút chuyển sang trang Thêm mới */}
        <Link
          to="/add"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <span>+</span> Thêm
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Ảnh</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Tên Tour</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Còn lại</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4">Chưa có tour nào</td></tr>
            ) : (
              tours.map((tour, index) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-24 h-16 object-cover rounded"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300 font-medium">{tour.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                  <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                  <td className="px-4 py-2 border border-gray-300 text-red-600 font-bold">
                    {Number(tour.price).toLocaleString()} VNĐ
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-2">
                      {/* 2. SỬA: Chuyển nút Sửa thành Link */}
                      <Link
                        to={`/edit/${tour.id}`}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
                      >
                        Sửa
                      </Link>

                      <button
                        onClick={() => deleteTour(tour.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;