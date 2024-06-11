import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function UpdateNote() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");

  const { user } = useAuth();
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const getNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/notes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setColor(data.data.color);
        setLoading(false);
      }
      if (!data.success) {
        toast.error(data.msg);
        setLoading(false);
      }
    } catch (error) {
      toast.error("something wrong.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      title,
      description,
      color,
    };

    try {
      const res = await fetch(` ${apiUrl}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(note),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Note updated successfully");
        navigate("/notes");
      }
      if (!data.success) {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred while updating the note.");
    }
  };

  useEffect(() => {
    getNote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Color</label>
          <select
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="#ffffff">White</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Update Note
        </button>
      </form>
    </div>
  );
}
