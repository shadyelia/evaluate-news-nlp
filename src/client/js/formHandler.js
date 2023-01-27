function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    
    postData('http://localhost:8080/analysis',{ text: formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = JSON.stringify(res, null, 4);
    })
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

export { handleSubmit }
