import { useState } from "react";

const Modal = ({ mode, data }) => {
  const [editableFields, setEditableFields] = useState({});

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    data[field] = value; // Update the data object with the new value
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div>
      <button onClick={openModal}>VIEW</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-black">
          {mode === "author" ? (
            // Display Author Data
            <>
              <h3 className="font-bold text-lg">
                {data.firstName} {data.lastName}
              </h3>
              <div>
                <label className="block">First Name</label>
                {editableFields.firstName ? (
                  <input
                    type="text"
                    defaultValue={data.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.firstName}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("firstName")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">Last Name</label>
                {editableFields.lastName ? (
                  <input
                    type="text"
                    defaultValue={data.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.lastName}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("lastName")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">Date of Birth</label>
                {editableFields.dob ? (
                  <input
                    type="date"
                    defaultValue={data.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.dob}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("dob")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">Image URL</label>
                {editableFields.image ? (
                  <input
                    type="text"
                    defaultValue={data.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.image || "No image"}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("image")}>
                  Edit
                </button>
              </div>
            </>
          ) : (
            // Display Book Data
            <>
              <h3 className="font-bold text-lg">{data.title}</h3>

              <div>
                <label className="block">Title</label>
                {editableFields.title ? (
                  <input
                    type="text"
                    defaultValue={data.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.title}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("title")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">ISBN</label>
                {editableFields.isbn ? (
                  <input
                    type="text"
                    defaultValue={data.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.isbn}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("isbn")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">Year Published</label>
                {editableFields.published ? (
                  <input
                    type="number"
                    defaultValue={data.published}
                    onChange={(e) => handleInputChange("published", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.published}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("published")}>
                  Edit
                </button>
              </div>

              <div>
                <label className="block">Pages</label>
                {editableFields.pages ? (
                  <input
                    type="number"
                    defaultValue={data.pages}
                    onChange={(e) => handleInputChange("pages", e.target.value)}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{data.pages}</span>
                )}
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick("pages")}>
                  Edit
                </button>
              </div>
            </>
          )}

          <div className="modal-action">
            <button className="btn">Save</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
