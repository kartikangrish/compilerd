async function submitCode() {
    const code = document.getElementById("code").value;
    const language = document.getElementById("language").value;
    const resultElement = document.getElementById("result");
  
    resultElement.textContent = "Processing...";
  
    try {
      let body = JSON.stringify({ script: code, language: language });
      const response = await fetch("http://localhost:3000/api/execute/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
  
      if (data["compile_message"] != "") {
        resultElement.textContent = `Output: ${data["output"]}\n\nErrors: ${data["compile_message"]}`;
      } else {
        resultElement.textContent =`Output: ${data.output}\n\nErrors: ${data.errors}`;
      }
    } catch (error) {
      resultElement.textContent =
        "An error occurred while processing your request.";
    }
  }