const functionApi =
  "https://count-test-cv-plus-one-gbd4hsaqekb7d0ex.centralus-01.azurewebsites.net/api/incrementbyone";


const getVisitCount = () => {
  fetch(functionApi)
    .then((response) => response.text())
    .then((data) => {
      console.log("Raw response from API:", data);

      const countMatch = data.match(/\d+/);
      const count = countMatch ? parseInt(countMatch[0], 10) : 0;

      console.log("Extracted count:", count);

      // Update the HTML element
      document.getElementById("counter").innerText = count;

      // Store the latest count in localStorage
      localStorage.setItem("visitCount", count);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

// 🔥 THIS IS REQUIRED
getVisitCount();

};
