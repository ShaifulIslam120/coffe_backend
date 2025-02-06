import React, { useState } from 'react';

const AddCoffee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddCoffee = async (event) => {
    event.preventDefault();
    const form = event.target;
    const coffeeName = form.coffeeName.value;
    const availableQuantity = form.availableQuantity.value;
    const category = form.category.value;
    const supplierName = form.supplierName.value;
    const details = form.details.value;
    const photoUrl = form.photoUrl.value;

    // Validations
    if (availableQuantity <= 0) {
      setError("Available quantity must be a positive number.");
      return;
    }

    const newCoffee = {
      coffeeName,
      availableQuantity,
      category,
      supplierName,
      details,
      photoUrl
    };

    setLoading(true);
    setError(null); // Reset error before making the API call

    try {
      // Send data to backend
      const response = await fetch('http://localhost:3000/addcoffe', { // Change the URL if necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoffee),
      });

      if (!response.ok) {
        throw new Error('Failed to add coffee');
      }

      // Reset form after successful submission
      form.reset();
      alert('Coffee added successfully!');
    } catch (error) {
      setError("Failed to add coffee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-[#F4F3F0] min-h-screen items-center p-6">
      <form onSubmit={handleAddCoffee} className="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Coffee Name */}
        <label className="form-control w-full md:w-[48%]">
          <div className="label">
            <span className="label-text">Coffee Name</span>
          </div>
          <input type="text" name="coffeeName" placeholder="Coffee name" className="input input-bordered w-full" required />
        </label>

        {/* Available Quantity */}
        <label className="form-control w-full md:w-[48%]">
          <div className="label">
            <span className="label-text">Available Quantity</span>
          </div>
          <input type="number" name="availableQuantity" placeholder="Available Quantity" className="input input-bordered w-full" required />
        </label>

        {/* Coffee Category */}
        <label className="form-control w-full md:w-[48%]">
          <div className="label">
            <span className="label-text">Coffee Category</span>
          </div>
          <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" required />
        </label>

        {/* Supplier Name */}
        <label className="form-control w-full md:w-[48%]">
          <div className="label">
            <span className="label-text">Supplier Name</span>
          </div>
          <input type="text" name="supplierName" placeholder="Supplier name" className="input input-bordered w-full" required />
        </label>

        {/* Details */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Details</span>
          </div>
          <textarea name="details" placeholder="Enter coffee details..." className="textarea textarea-bordered w-full" required></textarea>
        </label>

        {/* Photo URL */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Photo URL</span>
          </div>
          <input type="url" name="photoUrl" placeholder="Photo URL" className="input input-bordered w-full" required />
        </label>

        {/* Error Message */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Submit Button */}
        <input type="submit" value={loading ? "Adding..." : "Add Coffee"} className="btn btn-primary w-full mt-4 cursor-pointer" disabled={loading} />
      </form>
    </div>
  );
};

export default AddCoffee;
