document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('userInput');
    const saveButton = document.getElementById('saveButton');
    const status = document.getElementById('status');

    // Load saved input
    browser.storage.sync.get('userInput').then((result) => {
        if (result.userInput) {
            inputField.value = result.userInput;
        }
    });

    // Save input on button click
    saveButton.addEventListener('click', function() {
        const inputValue = inputField.value;
        browser.storage.sync.set({ userInput: inputValue }).then(() => {
            status.textContent = 'Server IP:Port saved!';
        }, () => {
            status.textContent = 'Error saving input.';
        });
    });
});
