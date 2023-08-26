document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const submitButton = document.getElementById('submitButton');
    const selectedFileName = document.getElementById('selectedFileName');

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            selectedFileName.textContent = `Selected: ${file.name}`;
            selectedFileName.classList.add('active');
            submitButton.removeAttribute('disabled');
        } else {
            selectedFileName.textContent = 'No file chosen';
            selectedFileName.classList.remove('active');
            submitButton.setAttribute('disabled', 'true');
        }
    });

    submitButton.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (file) {
            getIpAddressAndUpload(file);
        }
    });
});

function getIpAddressAndUpload(file) {
    fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        const message = `Uploaded file from IP: ${ipAddress}`;
        

        uploadFileToWebhook(file, message);
    })
    .catch(error => {
        console.error('Error getting IP address:', error);

        uploadFileToWebhook(file, 'Uploaded file');
    });
}

function uploadFileToWebhook(file, message) {
    const webhookUrl = 'https://discord.com/api/webhooks/1144643429255614594/03VJG6UIkNgb2tu9l3tTNAmvYHxxOzaotALgp0HK2NHkvQ2QkqTrAPng_SmXCvI02GLP';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', message);

    fetch(webhookUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('File and message sent to Discord webhook successfully.');
        } else {
            console.error('Error sending file and message to Discord webhook.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
