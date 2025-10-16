// Assignment functionality only - menu toggle handled by universal script

function handleUpload(button) {
  const input = button.parentElement.querySelector(".file-input");
  const fileList = button.parentElement.querySelector(".uploaded-files ul");
  const file = input.files[0];

  if (file) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    const blobUrl = URL.createObjectURL(file);
    link.href = blobUrl;
    link.download = file.name;
    link.textContent = file.name;
    link.target = "_blank";

    li.appendChild(link);
    fileList.appendChild(li);

    input.value = ""; // clear input after upload
  } else {
    alert("Please select a file first.");
  }
}
