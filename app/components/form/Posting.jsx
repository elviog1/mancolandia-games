"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gamesOptions } from "@/app/constants";


const FormPage = ({post, apiEndpoint}) => {
  const [selectedGame, setSelectedGame] = useState(post.game);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const {data:session} = useSession()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postForm = new FormData();
      postForm.append("creator", session?.user.id);
      postForm.append("game", selectedGame);
      postForm.append("title", title);
      postForm.append("description", description);
      
  
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: postForm,
      });
  
      if (response.ok) {
        router.push(`/profile/${session?.user.id}/posts`);
      } else {
        // Mostrar mensaje de error al usuario
        console.error("Error al enviar el formulario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <form
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="game"
            className="block text-white text-sm font-bold mb-2"
          >
            Select Game
          </label>
          <select
            id="game"
            name="game"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full p-2 bg-gray-950 border border-gray-300 rounded focus:outline-none focus:border-blue-800 text-white cursor-pointer"
            required
          >
            <option value="" disabled>
              Selecciona un juego
            </option>
            {gamesOptions.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-white text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border bg-gray-950 border-gray-300 rounded focus:outline-none focus:border-blue-800 text-white "
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-white text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border bg-gray-950 border-gray-300 rounded focus:outline-none focus:border-blue-800 text-white"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-800 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-indigo hover:bg-blue-600 duration-200"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
