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
        generateButton.disabled = true;
        URL.revokeObjectURL(objectURL);
      });
    });
});

downloadButton.addEventListener("click", () => {
  downloadButton.innerText = "Downloading...";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const qrImgWidth = qrImg.naturalWidth;
  const qrImgHeight = qrImg.naturalHeight;
  canvas.width = qrImgWidth;
  canvas.height = qrImgHeight;
  context.drawImage(qrImg, 0, 0, qrImgWidth, qrImgHeight);

  const link = document.createElement("a");
  canvas.toBlob(function (blob) {
    link.href = URL.createObjectURL(blob);
    link.download = "qr-code.png";
    link.click();
  });
  downloadButton.innerText = "Download QR Code";
});

qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim() || qrInput.value.trim() === preValue) {
    generateButton.disabled = true;
  } else {
    generateButton.disabled = false;
  }
  
  if (!qrInput.value.trim()) {
    downloadButton.classList.remove("active");
  }
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});
