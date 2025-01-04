import "./FavPage.css";
import React, { useEffect, useState ,} from "react";
// imort {useNavigate}
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Modal, Button ,ViewModal } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

// const packages = [
//   { name: "Basic Plan" },
//   { name: "Premium Plan" },
//   { name: "Ultimate Plan" },
//   { name: "Standard Package" },
//   { name: "Enterprise Package" },
// ];



function FavPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPackageReason, setSelectedPackageReason] = useState(null);
  const [localStorageData,setLocalStorageData]=useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    setLocalStorageData(JSON.parse(localStorage.getItem("formData")));
    console.log(localStorageData);
  },[])

  const handleView = (packageName,packageReason) => {
    console.log(`Viewing ${packageName}`);
    setViewModalOpen(true);
    setSelectedPackage(packageName);
    setSelectedPackageReason(packageReason);
  };




const handleUpdate = (packageName) => {
  console.log(`Updating ${packageName}`);


  const currentData = JSON.parse(localStorage.getItem("formData")) || [];
  const packageToUpdate = currentData.find(
    (pkg) => pkg.selectedPackage === packageName
  );

  if (packageToUpdate) {
    // Navigate to the form page and pass the package details via state
    navigate("/form", { state: { packageDetails: packageToUpdate } });
  } else {
    console.log(`Package "${packageName}" not found.`);
  }
};


  const handleDelete = (packageName) => {
    console.log(`Deleting ${packageName}`);
    setModalOpen(true);
    setSelectedPackage(packageName);
    
  };

  const confirmDelete = () => {
    console.log(`Confirmed delete of ${selectedPackage}`);
    setModalOpen(false);
    const updatedData=localStorageData.filter((pkg)=>pkg.selectedPackage!==selectedPackage);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setLocalStorageData(updatedData);
    if(localStorage.getItem("formData")==="[]"){
      navigate('/');
    }
  };

  return (
    <div className="mainContainer">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div className="textHeading">Welcome to Your Favorite NPM Packages</div>
      <Button style={{backgroundColor:"#5f0fc9"}}
      label="Add Fav"
      onClick={()=>{
        navigate('/form');
      }}></Button></div>

      <div className="mainBox">
        <div className="tableHeader">
          <span className="headerName">Package Names</span>
          <span className="headerActions">Actions</span>
        </div>
        <div className="packageList">
          {localStorageData.map((pkg, index) => (
            <div key={index} className="packageItem">
              <span className="packageName">{pkg.selectedPackage}</span>
              <div className="actions">
                <button
                  onClick={() => handleView(pkg.selectedPackage,pkg.reason)}
                  className="actionBtn"
                >
                  <AiOutlineEye size={24} color="#4CAF50" title="View" />
                </button>
                <button
                  onClick={() => handleUpdate(pkg.selectedPackage)}
                  className="actionBtn"
                >
                  <FiEdit size={24} color="#FFC107" title="Edit" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.selectedPackage)}
                  className="actionBtn"
                >
                  <AiOutlineDelete size={24} color="#F44336" title="delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>



      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        // title="Delete Package"
      >
        <p style={{margin:"20px"}}>Are you sure you want to delete the package?</p>
        {/* <button onClick={confirmDelete} style={{ marginRight: "10px" }}>
          Yes
        </button> */}
        <Button
          label="Cancel"
          onClick={() => {
            setModalOpen(false);
          }}
          variant="success"
        ></Button>

        <Button label="Yes" onClick={confirmDelete} variant="success"></Button>

        {/* <Button
          label="Submit"
          onClick={handleSubmit}
          variant="success"
          style={{ float: "right", marginTop: "10px" }}
        />
        <button onClick={() => setModalOpen(false)}>Cancel</button> */}
      </Modal>


      
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={selectedPackage}
      >
        <p style={{margin:"20px"}}>{selectedPackageReason}</p>
        {/* <button onClick={confirmDelete} style={{ marginRight: "10px" }}>
          Yes
        </button> */}
        <Button
          label="Close"
          onClick={() => {
            setViewModalOpen(false);
          }}
          variant="success"
        ></Button>

        {/* <Button label="Yes" onClick={handleDelete} variant="success"></Button> */}

        {/* <Button
          label="Submit"
          onClick={handleSubmit}
          variant="success"
          style={{ float: "right", marginTop: "10px" }}
        />
        <button onClick={() => setModalOpen(false)}>Cancel</button> */}
      </ViewModal>
    </div>
  );
}

export default FavPage;
