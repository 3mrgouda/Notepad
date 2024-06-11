import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { ClipLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const getAllNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setNotes(data.data);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while fetching notes.");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Note deleted successfully");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the note.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="container  mx-auto mt-10 p-4">
      {notes.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl text-gray-700">No Notes found</h1>
          <Link to="/notes/create">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Add Note
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-4 bg-white rounded-lg shadow-md relative"
                style={{ backgroundColor: note.color }}
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {note.title}
                </h3>
                <p className="mt-2 text-gray-700">{note.description}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link to={`/notes/${note._id}`}>
                    <button className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => handleDeleteNote(note._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <Link to="/notes/create">Add Note</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
