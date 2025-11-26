import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/tours";

  // --- HÀM XỬ LÝ CHUNG CHO CÁC Ô INPUT (Cách 2) ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      // Kiểm tra nếu là ô số (price, available) thì ép kiểu Number, còn lại giữ nguyên
      [name]: (name === "price" || name === "available") ? Number(value) : value
    });

    // Tự động xóa lỗi của ô đang gõ
    setErrors({
      ...errors,
      [name]: ""
    });
  };
  // -----------------------------------------------

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) { newErrors.name = "Tên tour không được để trống"; isValid = false; }
    else if (formData.name.length < 5) { newErrors.name = "Tên tour phải dài hơn 5 ký tự"; isValid = false; }

    if (!formData.destination.trim()) { newErrors.destination = "Vui lòng nhập điểm đến"; isValid = false; }
    if (!formData.duration.trim()) { newErrors.duration = "Vui lòng nhập thời gian"; isValid = false; }
    if (Number(formData.price) <= 0) { newErrors.price = "Giá tiền phải lớn hơn 0"; isValid = false; }
    if (Number(formData.available) <= 0) { newErrors.available = "Số lượng phải lớn hơn 0"; isValid = false; }
    if (!formData.image) { newErrors.image = "Vui lòng chọn ảnh"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(API_URL, formData);
        alert("Thêm thành công!");
        navigate("/list");
      } catch (error) {
        console.error(error);
        alert("Lỗi server: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Thêm Tour Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên Tour</label>
          <input
            name="name"
            type="text"
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Điểm đến</label>
            <input
              name="destination"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.destination ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
              value={formData.destination}
              onChange={handleChange}
            />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Thời gian</label>
            <input
              name="duration"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.duration ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Giá (VNĐ)</label>
            <input
              name="price"
              type="number"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.price ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng còn</label>
            <input
              name="available"
              type="number"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.available ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
              value={formData.available}
              onChange={handleChange}
            />
            {errors.available && <p className="text-red-500 text-sm mt-1">{errors.available}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh đại diện</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${errors.image ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
            onChange={handleFileChange}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          {formData.image && (
            <div className="mt-3">
              <img src={formData.image} alt="Preview" className="h-32 w-auto rounded border shadow-sm object-cover" />
            </div>
          )}
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

        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded w-full hover:bg-blue-700 transition">
          Lưu Tour Mới
        </button>
      </form>
    </div>
  );
};

export default Add;