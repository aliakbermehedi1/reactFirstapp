import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingEdit = ({ onHide, fetchandGetClients, updateData }) => {
  const [spotID, setSpotID] = useState([]);

  const [formData, setFormData] = useState({
    ClientId: updateData.clientId,
    ClientName: updateData.clientName,
    BirthDate: updateData.birthDate ? new Date(updateData.birthDate).toISOString().split('T')[0] : '', // Convert birthDate to correct format
    PhoneNo: updateData.phoneNo,
    MaritalStatus: updateData.maritalStatus,
    PictureFile: "", // You may need to handle picture file separately
    SpotId: updateData.bookingEntries.map(entry => entry.spotId.toString()),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSpotId = () => {
    setFormData((prevData) => ({
      ...prevData,
      SpotId: [...prevData.SpotId, ""],
    }));
  };

  const handleRemoveSpotId = (index) => {
    const updatedSpotIds = [...formData.SpotId];
    updatedSpotIds.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      SpotId: updatedSpotIds,
    }));
  };

  const ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5231/api/BookingEntries/${formData.ClientId}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Booking updated successfully!");
        onHide();
        fetchandGetClients();
      } else {
        console.error("Error updating booking:", response.data);
        toast.error("Failed to update booking!");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking!");
    }
  };

  const fetchSpotDropdown = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5231/api/BookingEntries/GetSpots`
      );
      setSpotID(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchSpotDropdown();
  }, []);

  const handleChangeForDropdown = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      SpotId: [...prevState.SpotId.slice(0, index), value],
    }));
  };

  return (
    <div className="">
      <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} ref={ref} className="p-6.5 pt-1">
          <div className="grid grid-cols-3">
            <div className="col-span-2 border-2 border-t-0 border-b-0 border-l-0 border-red-600 px-12">
              {/* START Left Side */}
              {/* Client Name */}
              <div className="w-full mb-4">
                <label className="block text-black dark:text-white">
                  Client Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="ClientName"
                  placeholder="Enter Client Name"
                  value={formData.ClientName}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              {/* Birth Date */}
              <div className="w-full mb-4">
                <label className="block text-black dark:text-white">
                  Birth Date <span className="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  name="BirthDate"
                  value={formData.BirthDate}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              {/* Phone Number */}
              <div className="w-full mb-4">
                <label className="block text-black dark:text-white">
                  Phone Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="tel"
                  name="PhoneNo"
                  placeholder="Enter Phone Number"
                  value={formData.PhoneNo}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              {/* Marital Status */}
              <div className="w-full mb-4">
                <label className="block text-black dark:text-white">
                  Marital Status <span className="text-red-700">*</span>
                </label>
                <select
                  name="MaritalStatus"
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                >
                  <option value={true}>Married</option>
                  <option value={false}>Single</option>
                </select>
              </div>

              {/* Picture File */}
              <div className="w-full mb-4">
                <label className="block text-black dark:text-white">
                  Picture File
                </label>
                <input
                  type="file"
                  name="PictureFile"
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {/* END Left Side */}
            </div>
            <div className="col-span-1 px-4">
              {/* Spot Dropdown */}
              <div className="mb-4 px-2">
                <label className="block text-black dark:text-white mb-1">
                  Select Spot <span className="text-red-700">*</span>
                </label>
                {formData.SpotId.map((spotId, index) => (
                  <div key={index} className="flex mb-2">
                    <select
                      name="SpotId"
                      value={formData.SpotId[index]}
                      onChange={(e) => handleChangeForDropdown(e, index)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    >
                      <option value="">Select Spot</option>
                      {spotID.map((spot) => (
                        <option key={spot.spotId} value={spot.spotId}>
                          {spot.spotName}
                        </option>
                      ))}
                    </select>

                    {index === formData.SpotId.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddSpotId}
                        className="ml-2 py-3 px-4 bg-green-400 text-white rounded-full hover:bg-green-600 transition"
                      >
                        <i className="pi pi-plus"></i>
                      </button>
                    )}

                    {index !== formData.SpotId.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpotId(index)}
                        className="ml-2 py-3 px-4 bg-red-400 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <i className="pi pi-minus"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* OFF */}
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            {/* Submit & Reset Button */}
            <button
              type="reset"
              className="flex w-20 justify-center rounded bg-red-600 text-white p-3 font-medium text-gray"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex w-20 justify-center rounded bg-green-600 text-white p-3 font-medium text-gray"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingEdit;
