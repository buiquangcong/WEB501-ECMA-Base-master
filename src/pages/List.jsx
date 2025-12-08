import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function List() {
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState("");
  const API_URL = "http://localhost:3001/tours";
  useEffect(() => {
    axios.get(API_URL).then((res) => setTours(res.data)).catch((err) => {
      console.error("Lỗi khi tải dữ liệu:", err);
    });
  }, []);

  const Search = () => {
    console.log("handleSearch");
    const data = tours.filter((tour) =>
      tour.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setTours(data);
  };
  const deleteTour = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa Tour này chứ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTours(tours.filter((t) => t.id !== id));
      toast.success("Xóa tour thành công!");
    } catch (err) {
      toast.error("Xóa thất bại: " + err.message);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>
      <div className="my-2 flex gap-2 ">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          id="text"
          placeholder="Nhập tên tour để tìm kiếm..."
          className="border p-2 gap-2"

        />
        <button onClick={Search} className="bg-blue-500 text-white p-2">Tìm kiếm</button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">#</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Ảnh</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Tên Tour</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Còn lại</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Danh mục</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.length === 0 ? (
              <tr><td colSpan="10" className="text-center py-4">Chưa có tour nào</td></tr>
            ) : (
              tours.map((tour, index) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                  <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                  <td className="px-4 py-2 border border-gray-300 text-red-600 font-bold">
                    {Number(tour.price).toLocaleString()} VNĐ
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                  <td className="px-4 py-2 border border-gray-300">{tour.category}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-2">
                      <Link
                        to={`/edit/${tour.id}`}
                        className="bg-orange-500 text-white px-3 py-1 rounded"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => deleteTour(tour.id)}
                        className="bg-red-500 text-white px-3 py-1 "
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