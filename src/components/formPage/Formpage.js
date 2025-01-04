import "./FormPage.css";
import { useState, useEffect } from "react";
import { Button } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

function FormPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [paragraphInput, setParagraphInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
   
    if (location.state?.packageDetails) {
      setSelectedPackage(location.state?.packageDetails?.selectedPackage);
      setParagraphInput(location.state?.packageDetails?.reason);
      setSearchInput(location.state?.packageDetails?.selectedPackage)
    }
  }, [location.state]);

  function handlesearch(e) {
    setSearchInput(e.target.value);
  }

  function handleParagraph(e) {
    setParagraphInput(e.target.value);
  }

  function handleSelectPackage(e) {
    setSelectedPackage(e.target.value);
    console.log("Selected package:", e.target.value);
  }

  useEffect(() => {
    async function fetchResults() {
      if (searchInput.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.npms.io/v2/search?q=${searchInput}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [searchInput]);

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedPackage && paragraphInput) {
      const newFormData = {
        selectedPackage,
        reason: paragraphInput,
      };

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("formData")) || [];

      if (location.state?.packageDetails) {
        // If editing, update the existing package
        const updatedData = existingData.map((pkg) =>
          pkg.selectedPackage === location.state.packageDetails.selectedPackage
            ? newFormData : pkg
        );

        // Save updated data to localStorage
        localStorage.setItem("formData", JSON.stringify(updatedData));
        console.log("Updated data saved to local storage:", updatedData);
      } else {
        // If creating a new package, append it to the array
        if(existingData?.some((pkg) => pkg.selectedPackage === selectedPackage)) {
          alert("Package already exists in favorites");
        }
        else{
        const updatedData = [...existingData, newFormData];
        localStorage.setItem("formData", JSON.stringify(updatedData));
        console.log("New data saved to local storage:", updatedData);}
      }

      // Clear the form fields
      setSelectedPackage(null);
      setParagraphInput("");
      setSearchInput("");
      navigate("/favorites");
    } else {
      alert("Please select a package and provide a reason before submitting.");
    }
  }

  return (
    <div className="mainBox" style={{ marginTop: "10em" }}>
      <form onSubmit={handleSubmit} className="formContainer">
        <p className="labelText">Search for Npm Packages</p>
        <input
          type="text"
          className="textInput"
          value={searchInput}
          onChange={handlesearch}
          placeholder="Search here..."
        />

        {results.length > 0 && <p className="resultText">Results</p>}
        {loading && <p>Loading...</p>}

        <div className="resultsContainer">
          {results.length > 0
            ? results.map((result) => (
                <div key={result.package.name} className="resultItem">
                  <input
                    type="radio"
                    name="package"
                    value={result.package.name}
                    checked={selectedPackage === result.package.name}
                    onChange={handleSelectPackage}
                  />
                  <p>
                    <strong>{result.package.name}</strong>
                  </p>
                </div>
              ))
            : searchInput.trim() !== "" && <p>No results found.</p>}
        </div>
        <p className="pargraphText">Why is this your favorite?</p>
        <textarea
          className="paragraphInput"
          value={paragraphInput}
          onChange={handleParagraph}
          placeholder="Type here..."
        ></textarea>

        <Button
          label="Submit"
          onClick={handleSubmit}
          variant="success"
          style={{ float: "right", marginTop: "10px" }}
        />
      </form>
    </div>
  );
}

export default FormPage;
