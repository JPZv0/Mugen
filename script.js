document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('box-container');

    container.addEventListener('mousedown', function(e) {
        console.log("Mouse down event triggered"); // Debugging line

        const startX = e.clientX;
        const startY = e.clientY;

        const box = document.createElement('textarea');
        box.classList.add('dynamic-box');
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;

        container.appendChild(box);

        function onMouseMove(e) {
            const currentX = e.clientX;
            const currentY = e.clientY;
            const width = currentX - startX;
            const height = currentY - startY;
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;
        }

        container.addEventListener('mousemove', onMouseMove);

        container.addEventListener('mouseup', function() {
            container.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
});
