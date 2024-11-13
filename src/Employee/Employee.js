import React, { useState, useEffect } from "react";

let debounceTimeout;

const EmployeeComponent = (props) => {
  console.log(" props ", props)
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [employeeExist, setEmployeeExist] = useState("");
  const [searchType, setSearchType] = useState("s1");

  // Fetch employees
  const fetchEmployees = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    setLoading(true);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setError(`HTTP error! status: ${response.status}`);
      setLoading(false);
      return;
    }

    const data = await response.json();
    setEmployees(data);
    setLoading(false);
  };

  // Finds the employee by exact name
  const findEmployee = (value) => {
    const isEmpPresent = employees.find((employee) => employee.name === value);
    if (isEmpPresent) {
      setEmployeeExist(isEmpPresent.name);
    } else {
      setEmployeeExist("");
    }
  };

  // Find similar employees (partial match)
  const findSimilar = (value) => {
    const similarEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(value.toLowerCase())
    );
    setEmployeeExist(similarEmployees.map((emp) => emp.name).join(", "));
  };

  // Make API call on search (debounced)
  const callForSearch = (value) => {
    console.log("2")
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response:", res);
      })
      .catch((err) => {
        console.error("Error during API call:", err);
      });
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear the previous debounce timeout
    clearTimeout(debounceTimeout);

    if (searchType === "s1") {
      findEmployee(value);
    } else if (searchType === "s2") {
      findSimilar(value);
    } else if (searchType === "s3") {
      debounceTimeout = setTimeout(() => {
        console.log("1")
        callForSearch(value);
      }, 800);
    }
  };

  // Component Did Mount
  useEffect(() => {
    fetchEmployees();

    return () => {
      console.log("Cleaning up component...");
      clearTimeout(debounceTimeout); // Clear timeout on unmount
    };
  }, []);

  return (
    <div>
      <h1 onClick={props.changeOrganization}>Employees from {props.appname}</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {employees.map((employee) => (
            <li key={employee.id}>{employee.name}</li>
          ))}
        </ul>
      )}

      {/* Buttons to Set Search Type */}
      <div>
        <button onClick={() => setSearchType("s1")}>Exact Match</button>
        <button onClick={() => setSearchType("s2")}>Partial Match</button>
        <button onClick={() => setSearchType("s3")}>API Search</button>
      </div>

      {/* Input Field for Search */}
      <input
        type="text"
        placeholder="Search Employee..."
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
      />

      {/* Display Results */}
      <div>
        <span style={{ color: employeeExist ? "green" : "black" }}>
          {employeeExist || "No results found"}
        </span>
      </div>
    </div>
  );
};

export default EmployeeComponent;
