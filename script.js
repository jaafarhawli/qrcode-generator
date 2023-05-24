const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector(".form input");
const qrImg = wrapper.querySelector(".qr-code img");
const generateButton = document.getElementById("generateButton");
const downloadButton = document.getElementById("downloadButton");
let preValue;

generateButton.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateButton.innerText = "Generating QR Code...";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=720x720&data=${qrValue}`;

  fetch(qrImageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      qrImg.src = objectURL;
      qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        downloadButton.classList.add("active");
        generateButton.innerText = "Generate QR Code";
        URL.revokeObjectURL(objectURL);
      });
    });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});
