import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";


function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState('Tour Trong Nước');
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const API_URL = `http://localhost:3001/tours/${id}`;
        const { data } = await axios.get(API_URL);
        setName(data.name)
        setDestination(data.destination);
        setDuration(data.duration);
        setPrice(data.price.toString());
        setAvailable(data.available.toString());
        setImage(data.image);
        setCategory(data.category);
        setDescription(data.description);
      } catch (error) {
        console.error("Lỗi khi tải tour:", error);
        toast.error("Không tìm thấy tour cần sửa hoặc lỗi server!");
      }
    };
    fetchTour();
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const API_URL = `http://localhost:3001/tours/${id}`;
      await axios.put(API_URL, {
        name,
        destination,
        duration,
        price: Number(price),
        available: available,
        image,
        category,
        description
      });

      toast.success("Cập nhật tour thành công!");
      navigate("/list");

    } catch (error) {
      console.error("Lỗi khi cập nhật tour:", error);
      toast.error("Cập nhật tour thất bại: " + error.message);
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
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Điểm đến</label>
            <input
              name="destination"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Thời gian</label>
            <input
              name="duration"
              type="text"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={duration}
              onChange={e => setDuration(e.target.value)}
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
              value={price}
              onChange={e => setPrice(e.target.value)}
            />

          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng còn</label>
            <input
              name="available"
              type="number"
              className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={available}
              onChange={e => setAvailable(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh đại diện (URL)</label>
          <input
            name="image"
            type="text"
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            name="category"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tour Trong Nước">Tour Trong Nước</option>
            <option value="Tour Quốc Tế">Tour Quốc Tế</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả chi tiết</label>
          <textarea
            name="description"
            rows="3"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded w-full hover:bg-blue-700 transition">
          Lưu Tour Mới
        </button>
      </form>
    </div>
  )
}

export default Edit;