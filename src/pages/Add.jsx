import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: 0,
    image: "",
    description: "",
    available: 1
  });

  // Đã bỏ useState({}) cho errors

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/tours";

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Chuyển đổi giá trị thành số nếu là input type="number"
    const newValue = type === 'number' ? parseFloat(value) || 0 : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      toast.success("Thêm tour thành công!");
      navigate("/list");
    } catch (error) {
      console.error("Lỗi khi thêm tour:", error);
      toast.error("Thêm tour thất bại: " + error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Thêm Tour Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên Tour</label>
          <input
            name="name"
            type="text"
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Điểm đến</label>
            <input
              name="destination"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={formData.destination}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Thời gian</label>
            <input
              name="duration"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Giá (VNĐ)</label>
            <input
              name="price"
              type="number"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={formData.price}
              onChange={handleChange}
            />

          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng còn</label>
            <input
              name="available"
              type="number"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={formData.available}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh đại diện (URL)</label>
          <input
            name="image"
            type="text"
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả chi tiết</label>
          <textarea
            name="description"
            rows="3"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded w-full hover:bg-blue-700 transition">
          Lưu Tour Mới
        </button>
      </form>
    </div>
  );
};

export default Add;