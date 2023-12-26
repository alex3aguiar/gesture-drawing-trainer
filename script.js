document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");
    const downloadButton = document.getElementById("downloadButton");

    let isDrawing = false;

    // Configurações iniciais do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillStyle = "black"; // Cor do pincel

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;

        const x = e.clientX;
        const y = e.clientY;

        if (e.pressure) {
            const pressure = e.pressure * 20;
            context.fillRect(x - pressure / 2, y - pressure / 2, pressure, pressure);
        } else {
            context.fillRect(x, y, 5, 5); // Tamanho do pixel padrão
        }
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadCanvas() {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "canvas_image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listeners
    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointerout", stopDrawing);

    clearButton.addEventListener("click", clearCanvas);
    downloadButton.addEventListener("click", downloadCanvas);
});
