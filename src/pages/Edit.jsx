import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: '',
    available: '',
    image: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/tours/${id}`);
        setFormData(data);
      } catch (error) {
        console.error(error);
        alert("Không tìm thấy tour cần sửa!");
        navigate("/");
      }
    };
    fetchTour();
  }, [id, navigate]);

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

    if (!formData.name.trim()) { newErrors.name = "Tên không được để trống"; isValid = false; }
    if (!formData.destination.trim()) { newErrors.destination = "Nhập điểm đến"; isValid = false; }
    if (Number(formData.price) <= 0) { newErrors.price = "Giá phải > 0"; isValid = false; }
    if (Number(formData.available) <= 0) { newErrors.available = "Số lượng phải > 0"; isValid = false; }
    if (!formData.image) { newErrors.image = "Chưa có ảnh"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(`http://localhost:3001/tours/${id}`, formData);
        alert("Cập nhật thành công!");
        navigate("/");
      } catch (error) {
        alert("Lỗi cập nhật: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Cập nhật Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên Tour</label>
          <input type="text"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Điểm đến</label>
            <input type="text"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Thời gian</label>
            <input type="text"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Giá (VNĐ)</label>
            <input type="number"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng còn</label>
            <input type="number"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={formData.available}
              onChange={(e) => setFormData({ ...formData, available: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh đại diện</label>
          <input type="file" accept="image/*"
            className="border p-2 w-full rounded mb-2"
            onChange={handleFileChange}
          />

          {formData.image && (
            <div>
              <p className="text-sm text-gray-500">Ảnh hiện tại:</p>
              <img src={formData.image} alt="Preview" className="h-32 w-auto rounded border object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea rows="3"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        <div className="flex gap-3">
          <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-1/3 text-center">
            Hủy
          </Link>
          <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded w-2/3 hover:bg-orange-600">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit;