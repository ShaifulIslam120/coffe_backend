import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch coffee list from the backend
    const fetchCoffees = async () => {
      try {
        const response = await fetch('http://localhost:3000/addcoffe'); // Ensure this matches your backend
        if (!response.ok) {
          throw new Error('Failed to fetch coffees');
        }
        const data = await response.json();
        setCoffees(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCoffees();
  }, []);

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Our Coffee Collection</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coffees.length > 0 ? (
          coffees.map((coffee, index) => (
            <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-teal-400 to-teal-600 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img className="w-full h-48 object-cover rounded-t-xl" src={coffee.photoUrl} alt={coffee.coffeeName} />
              <div className="px-6 py-4">
                <h3 className="text-2xl font-bold text-white mb-3">{coffee.coffeeName}</h3>
                <p className="text-white text-sm mb-2"><span className="font-semibold">Category:</span> {coffee.category}</p>
                <p className="text-white text-sm mb-2"><span className="font-semibold">Supplier:</span> {coffee.supplierName}</p>
                <p className="text-white text-sm mb-2"><span className="font-semibold">Available:</span> {coffee.availableQuantity}</p>
                <p className="text-white text-sm mb-3">{coffee.details}</p>
                <div className="flex justify-center">
                  <button className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-all duration-300">Learn More</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No coffees available</p>
        )}
      </div>
    </div>
  );
}

export default App;
