document.addEventListener('DOMContentLoaded', function() {
    /* Code for box creation and resizing
    const container = document.getElementById('box-container');

    container.addEventListener('mousedown', function(e) {
        console.log("Mouse down event triggered");

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
            box.style.width = `${Math.max(currentX - startX, 0)}px`;
            box.style.height = `${Math.max(currentY - startY, 0)}px`;
        }

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', function() {
            container.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
*/
    // Code to make the toolbar draggable
    const toolbar = document.getElementById('floating-toolbar');
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    toolbar.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffsetX = e.clientX - toolbar.getBoundingClientRect().left;
        dragOffsetY = e.clientY - toolbar.getBoundingClientRect().top;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            toolbar.style.left = `${e.clientX - dragOffsetX}px`;
            toolbar.style.top = `${e.clientY - dragOffsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Hotkey functionality
    function handleKeyPress(e) {
        if (e.key === 'p') {
            e.preventDefault();
            console.log('p pressed');
        } else if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            console.log('Ctrl+B pressed');
        }
    }

    document.addEventListener('keydown', handleKeyPress);

    // Function for calculating option outcomes
    function calculateOptionOutcomesForPriceRange(currentStockPrice, strikePrice, optionPremium, theta, daysUntilExpiration, priceIncrement, maxPriceRange) {
        const thetaDecayPerDay = theta / 365;
        let outcomes = [];

        for (let price = currentStockPrice; price <= currentStockPrice + maxPriceRange; price += priceIncrement) {
            let timeDecay = thetaDecayPerDay * daysUntilExpiration;
            let optionValueAtPrice = Math.max(0, (price - strikePrice) - timeDecay);
            let potentialProfit = optionValueAtPrice - optionPremium;
            outcomes.push({
                "futureStockPrice": price,
                "potentialProfit": potentialProfit
            });
        }

        return outcomes;
    }

    // Function to display the calculation outcomes
    function displayResults(outcomes) {
        const resultsElement = document.createElement('div');
        document.body.appendChild(resultsElement);

        outcomes.forEach(outcome => {
            const resultText = `If stock price reaches $${outcome.futureStockPrice}, potential profit: $${outcome.potentialProfit.toFixed(2)}`;
            const paragraph = document.createElement('p');
            paragraph.textContent = resultText;
            resultsElement.appendChild(paragraph);
        });
    }

    // Handling form submission
    document.getElementById('optionCalcForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let currentStockPrice = parseFloat(document.getElementById('currentStockPrice').value);
        let strikePrice = parseFloat(document.getElementById('strikePrice').value);
        let optionPremium = parseFloat(document.getElementById('optionPremium').value);
        let theta = parseFloat(document.getElementById('theta').value);
        let daysUntilExpiration = parseInt(document.getElementById('daysUntilExpiration').value);
        let priceIncrement = parseFloat(document.getElementById('priceIncrement').value);
        let maxPriceRange = parseFloat(document.getElementById('maxPriceRange').value);

        let outcomes = calculateOptionOutcomesForPriceRange(currentStockPrice, strikePrice, optionPremium, theta, daysUntilExpiration, priceIncrement, maxPriceRange);
        displayResults(outcomes);
    });
});
