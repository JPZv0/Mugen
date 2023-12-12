document.addEventListener('DOMContentLoaded', function() {
    // Code for box creation and resizing
    const container = document.getElementById('box-container');

    container.addEventListener('mousedown', function(e) {
        console.log("Mouse down event triggered"); // Debugging line

        const startX = e.clientX - container.getBoundingClientRect().left;
        const startY = e.clientY - container.getBoundingClientRect().top;

        const box = document.createElement('textarea');
        box.classList.add('dynamic-box');
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;

        container.appendChild(box);

        function onMouseMove(e) {
            const currentX = e.clientX - container.getBoundingClientRect().left;
            const currentY = e.clientY - container.getBoundingClientRect().top;
            const width = Math.max(currentX - startX, 0);
            const height = Math.max(currentY - startY, 0);
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;
        }

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', function() {
            container.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    // Code to make the toolbar draggable
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

    // Hotkey functionality
    function handleKeyPress(e) {
        if (e.key === 'F1') {
            e.preventDefault();  // Prevent default F1 action
            console.log('F1 pressed'); // Replace with actual functionality
        } else if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();  // Prevent default Ctrl+B action
            console.log('Ctrl+B pressed'); // Replace with actual functionality
        }
        // Add more hotkeys as needed
    }

    document.addEventListener('keydown', handleKeyPress);
});
