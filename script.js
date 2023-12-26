document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");
    const downloadButton = document.getElementById("downloadButton");

    let isDrawing = false;

    // Configurações iniciais do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.lineCap = "round";
    context.strokeStyle = "black";

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        // Se a caneta suportar pressão, ajuste a largura da linha com base na pressão
        if (e.pressure) {
            context.lineWidth = e.pressure * 20;
        }

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
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