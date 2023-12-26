document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");

    let isDrawing = false;

    // Configurações iniciais do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.lineWidth = 5;
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

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    function clearCanvas() {
        downloadCanvas()
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
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    clearButton.addEventListener("click", clearCanvas);
});