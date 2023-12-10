document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('box-container');

    container.addEventListener('mousedown', function(e) {
        console.log("Mouse down event triggered"); // Debugging line

        // Adjusted to get the starting position relative to the container
        const startX = e.clientX - container.getBoundingClientRect().left;
        const startY = e.clientY - container.getBoundingClientRect().top;

        const box = document.createElement('textarea');
        box.classList.add('dynamic-box');
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;

        container.appendChild(box);

        function onMouseMove(e) {
            // Adjusted to get the current position relative to the container
            const currentX = e.clientX - container.getBoundingClientRect().left;
            const currentY = e.clientY - container.getBoundingClientRect().top;
            const width = Math.max(currentX - startX, 0); // Ensure width is not negative
            const height = Math.max(currentY - startY, 0); // Ensure height is not negative
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;
        }

        container.addEventListener('mousemove', onMouseMove);

        container.addEventListener('mouseup', function() {
            container.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    // Make the toolbar draggable
    const toolbar = document.getElementById('floating-toolbar');
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    toolbar.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffsetX = e.clientX - toolbar.getBoundingClientRect().left;
        dragOffsetY = e.clientY - toolbar.getBoundingClientRect().top;
        e.preventDefault(); // Prevents unwanted text selection
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            toolbar.style.left = (e.clientX - dragOffsetX) + 'px';
            toolbar.style.top = (e.clientY - dragOffsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
});
