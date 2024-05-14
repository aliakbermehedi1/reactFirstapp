import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import axios from "axios";
import { Paginator } from "primereact/paginator"; // Import Paginator component from PrimeReact
import { useNavigate } from "react-router-dom";
import BookingInsert from "./BookingInsert";
import { IoIosSearch } from "react-icons/io";
import BookingEdit from "./BookingEdit";

const Booking = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [showDialog, setShowDialog] = useState(false); //insert customer
  const [showDialog1, setShowDialog1] = useState(false); //update customer

  //state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // delete
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [branchIdToDelete, setBranchIdToDelete] = useState(null);

  // Here Start
  const [clientsData, setClientsData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // Fetch branches from the API
  const fetchandGetClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5231/api/BookingEntries/GetClients"
      );
      setClientsData(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchandGetClients();
  }, []);

  const onHideDialog = () => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // handle Update or Edit
  const handleEditClick = async (clientId) => {
    try {
      const response = await axios.get(
        `http://localhost:5231/api/BookingEntries/GetClientById/${clientId}`
      );
      setShowDialog1(true)

      setUpdateData(response.data);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  // handle Delete
  const handleDeleteClick = (branch) => {
    setBranchIdToDelete(branch); // Store the BranchID that needs to be deleted
    setShowConfirmationDialog(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        "https://arabian-hunter-backend.vercel.app/api/branch/DeleteBranch",
        { BranchID: branchIdToDelete }
      );

      if (response.data.success) {
        fetchandGetClients();
        setShowConfirmationDialog(false); // Close the confirmation dialog

        // Display a success toast message
        toast.success("Deleted Successfully", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to delete branch:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  // Step 2: Modify rendering to filter Clients based on search
  const filteredClients = clientsData
    ? clientsData.filter((clients) =>
        searchQuery
          ? Object.values(clients)
              .join("") // Concatenate all values of a clients object to a string
              .toLowerCase() // Convert to lowercase for case-insensitive matching
              .includes(searchQuery.toLowerCase())
          : true
      )
    : [];

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  console.log("Data: ", clientsData);
  return (
    <>
      <div className="text-xs mx-20 mt-8">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
          <div className="ml-1">
            <Button
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-green-600 py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4"
              onClick={() => setShowDialog(true)}
              style={{ outline: "none", borderColor: "transparent !important" }}
            >
              <span>
                <i
                  className="pi pi-plus font-semibold"
                  style={{ fontSize: "12px" }}
                ></i>
              </span>
              NEW
            </Button>

            <Button
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-blue-600 py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
              onClick={handleBackClick}
              style={{ outline: "none", borderColor: "transparent !important" }}
            >
              <span>
                <i
                  className="pi pi-arrow-left font-semibold"
                  style={{ fontSize: "12px" }}
                ></i>
              </span>
              BACK
            </Button>
          </div>

          <div className="relative mx-8 mr-4">
            <input
              type="text"
              id="table-search-users"
              className="block py-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="absolute inset-y-0 flex items-center p-3">
              <IoIosSearch />
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {filteredClients.map((clients) => (
                <tr key={clients.clientId} className="font-semibold">
                  <td className="border border-tableBorder bg-[#F7F7F7]">
                    <div className="bg-[#F7F7F7] flex justify-between">
                      <div className="flex justify-center items-center gap-6">
                        <div className="px-8 py-2">
                          <img
                            src={clients.picture}
                            alt="Client"
                            style={{ maxWidth: "40px", maxHeight: "40px" }}
                          />
                        </div>

                        <p>Name: {clients?.clientName}</p>
                        <p>
                          Birth Date:{" "}
                          {new Date(clients.birthDate).toLocaleDateString()}
                        </p>
                        <p>
                          Marital Status:{" "}
                          {clients.maritalStatus ? "Married" : "Single"}
                        </p>
                        <p>Phone: {clients.phoneNo}</p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 mr-4">
                        <div className="flex justify-center items-center py-2">
                          <Button
                            className="font-semibold gap-2.5 rounded-lg bg-blue-600 text-white py-2 px-4"
                            onClick={() => handleEditClick(clients.clientId)} // Ensure this is correct
                          >
                            <span>
                              <i
                                className="pi pi-pencil font-semibold"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </span>
                            EDIT
                          </Button>
                        </div>

                        <div className="flex justify-center items-center py-2">
                          <Button
                            className="font-semibold gap-2.5 rounded-lg bg-red-500 text-white py-2 px-4"
                            onClick={() => handleDeleteClick(clients.BranchID)}
                          >
                            <span>
                              <i
                                className="pi pi-trash font-semibold"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </span>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white">
                      <div className="mx-8 py-3">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="border border-tableBorder pl-1">
                                Spot ID
                              </th>
                              <th className="border border-tableBorder pl-1">
                                Spot Name
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {clients?.bookingEntries.map((bookingEntry) => (
                              <tr key={bookingEntry.bookingEntryId}>
                                <td className="border border-tableBorder pl-1">
                                  {bookingEntry?.spot?.spotId || "N/A"}
                                </td>
                                <td className="border border-tableBorder pl-1">
                                  {bookingEntry?.spot?.spotName || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {clientsData && (
        <Paginator
          first={first}
          rows={rows}
          totalRecords={clientsData.length}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        />
      )}

      {/* start insert dialog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={"Booking Entry"}
        visible={showDialog}
        style={{ width: "80vw" }}
        onHide={onHideDialog}
        id="fname"
      >
        <BookingInsert
          onHide={onHideDialog}
          fetchandGetClients={fetchandGetClients}
        />
      </Dialog>

      {/* start update dualog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={"Booking Update"}
        visible={showDialog1}
        style={{ width: "80vw" }}
        onHide={onHideDialog}
        id="fname"
      >
        <BookingEdit
          onHide={onHideDialog}
          fetchandGetClients={fetchandGetClients}
          updateData={updateData}
        />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete Branch?"
        footer={
          <div className="flex items-center justify-center">
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text bg-danger text-white py-3 px-8 mr-4 text-lg"
              onClick={() => setShowConfirmationDialog(false)}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text bg-success text-white py-3 px-8 mr-4 text-lg"
              onClick={confirmDelete}
            />
          </div>
        }
      ></Dialog>
    </>
  );
};

export default Booking;
