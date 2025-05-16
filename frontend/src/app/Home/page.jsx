import Navbar from "@/components/Navbar";
import React from "react";

const Home = () => {
  return (

    <>
      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-md">
        <div className="p-4 text-lg font-bold">Expired Medicines</div>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              
              Dashboard
            </li>
            <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              
              Inventory
            </li>
            <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
               
              NGO Contributions
            </li>
            <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              
              Notifications
            </li>
            <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
             
              Reports
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Section */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="flex items-center justify-center bg-white shadow-md rounded-lg p-6">
            <div className="text-center">
              <div className="text-gray-500 mb-4">
                <span className="material-icons-outlined text-6xl">qr_code_scanner</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Scan Barcode
              </button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="text-gray-700">Notification content goes here</div>
                </div>
                <div className="text-gray-400">Time</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
export default Home;