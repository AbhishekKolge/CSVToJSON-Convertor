//API endpoints
const addUsersUrl = "/api/v1/users";
const getAgeDistributionUrl = "/api/v1/users/age-distribution";

//HTML references
const formEl = document.getElementById("form");
const fileEl = document.getElementById("formFile");
const alertSuccessEl = document.getElementById("alert-success");
const alertErrorEl = document.getElementById("alert-danger");
const tableContainerEl = document.getElementById("table-container");
const distributionBtnEl = document.getElementById("distribution-btn");
const loaderEl = document.getElementById("loader");

//global variable to store file
let csvFile;

//helper functions
const formAgeDistributionTable = (data) => {
  if (data.length) {
    tableContainerEl.innerHTML = `<table class="table">
    <thead>
        <tr>
            <th scope="col">Age-Group</th>
            <th scope="col">% Distribution</th>
        </tr>
    </thead>
    <tbody>
    ${data
      .map((item) => {
        return `<tr>
      <th scope="col">${item.age_group}</th>
      <td scope="col">${item.age_distribution}</td>
    </tr>`;
      })
      .join("")}
    </tbody>
  </table>`;
  } else {
    tableContainerEl.innerHTML =
      "<p class='text-center fw-semibold fs-5'>No data found, please add users</p>";
  }
};

const getAgeDistribution = async () => {
  loaderEl.classList.remove("d-none");
  try {
    const response = await fetch(getAgeDistributionUrl);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }

    loaderEl.classList.add("d-none");
    alertSuccessEl.classList.remove("d-none");
    alertSuccessEl.innerHTML = "Data fetched successfully";

    setTimeout(() => {
      alertSuccessEl.classList.add("d-none");
      alertSuccessEl.innerHTML = "";
    }, 3000);

    formAgeDistributionTable(data.data);
  } catch (err) {
    loaderEl.classList.add("d-none");
    alertErrorEl.classList.remove("d-none");
    alertErrorEl.innerHTML = err.message || "Something went wrong";

    setTimeout(() => {
      alertErrorEl.classList.add("d-none");
      alertErrorEl.innerHTML = "";
    }, 3000);
  }
};

//event listeners
fileEl.addEventListener("change", async (e) => {
  csvFile = e.target.files[0];
});

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("users", csvFile);
  loaderEl.classList.remove("d-none");
  try {
    const response = await fetch(addUsersUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }

    loaderEl.classList.add("d-none");
    alertSuccessEl.classList.remove("d-none");
    alertSuccessEl.innerHTML = "File uploaded successfully";

    setTimeout(() => {
      alertSuccessEl.classList.add("d-none");
      alertSuccessEl.innerHTML = "";
    }, 3000);
  } catch (err) {
    loaderEl.classList.add("d-none");
    alertErrorEl.classList.remove("d-none");
    alertErrorEl.innerHTML = err.message || "Something went wrong";

    setTimeout(() => {
      alertErrorEl.classList.add("d-none");
      alertErrorEl.innerHTML = "";
    }, 3000);
  }
});

distributionBtnEl.addEventListener("click", getAgeDistribution);
