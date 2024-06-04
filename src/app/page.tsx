// "use client";
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleModalToggle = () => {
//     setModalOpen(!modalOpen);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <header className="bg-white shadow">
//         <div className="container mx-auto flex justify-between items-center py-6 px-4">
//           <Image
//             src="/images/logo.jpg"
//             alt="Peluquería Bella"
//             width={75}
//             height={75}
//             className="rounded-full"
//           />
//           <h1 className="text-3xl font-bold text-gray-900">Peluquería Bella</h1>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//             onClick={handleModalToggle}
//           >
//             Agenda tu cita
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <section className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4">
//             Bienvenidos a Peluquería Bella
//           </h2>
//           <p className="text-gray-700 text-lg">
//             Donde tu estilo es nuestra pasión.
//           </p>
//         </section>

//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Image
//               src="/images/cortes.jpg"
//               alt="Corte de Pelo"
//               width={500}
//               height={500}
//               className="rounded-lg"
//             />
//             <h3 className="text-2xl font-bold mt-4">Corte de Pelo</h3>
//             <p className="text-gray-700 mt-2">
//               Cortes modernos y clásicos para todas las edades.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Image
//               src="/images/tinturado.jpg"
//               alt="Coloración"
//               width={500}
//               height={500}
//               className="rounded-lg"
//             />
//             <h3 className="text-2xl font-bold mt-4">Coloración</h3>
//             <p className="text-gray-700 mt-2">
//               Tintes, mechas y técnicas avanzadas de color.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Image
//               src="/images/estilizado.jpg"
//               alt="Estilizado"
//               width={500}
//               height={500}
//               className="rounded-lg"
//             />
//             <h3 className="text-2xl font-bold mt-4">Estilizado</h3>
//             <p className="text-gray-700 mt-2">
//               Peinados para cualquier ocasión especial.
//             </p>
//           </div>
//         </section>
//       </main>

//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">Agenda tu Cita</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Nombre</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded mt-1"
//                   placeholder="Tu nombre"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   className="w-full p-2 border border-gray-300 rounded mt-1"
//                   placeholder="Tu email"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Servicio</label>
//                 <select className="w-full p-2 border border-gray-300 rounded mt-1">
//                   <option>Corte de Pelo</option>
//                   <option>Coloración</option>
//                   <option>Estilizado</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Enviar
//               </button>
//               <button
//                 type="button"
//                 className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//                 onClick={handleModalToggle}
//               >
//                 Cancelar
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { HomePage } from "@/components";
import "./globals.css";

export default function NamePage() {
  return <HomePage />;
}
