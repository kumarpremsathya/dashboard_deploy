
function openPopup(source_name) {
    fetch(`/probe/rbiget_data_for_popup1/${source_name}/`, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Data not available for today.');
            }
            return response.json();
        })
        .then(data => {
            var popupContent = `
                <div class="popup-container">
                    <span class="close-btn" onclick="closePopup()">X</span>
                    <p class="popup-info">Data Source: <span class="popup-style">${data.source_name}</span></p>
                    <p class="popup-info">Status: <span class="status-text">${data.script_status}</span></p>
                    <p class="popup-info">#Records Scraped: <span class="popup-style">${data.data_scraped}</span></p>
                    <p class="popup-info">Failure Reason: <span class="popup-style">${data.failure_reason}</span></p>
                    <p class="popup-info">Newly Added Count: <span class="popup-style">${data.newly_added_count}</span></p>
                    <p class="popup-info">Deleted Source Count: <span class="popup-style">${data.deleted_source_count}</span></p>
                    <p class="popup-info">Scraped On: <span class="popup-style">${data.date_of_scraping}</span></p>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', popupContent);

            // Add class to status text based on the status
            var statusElement = document.querySelector('.status-text');
            if (data.script_status.toLowerCase() === 'success') {
                statusElement.classList.add('green');
            } else if (data.script_status.toLowerCase() === 'failure' && data.failure_reason.includes('204')) {
                statusElement.classList.add('orange');
            } else if (data.script_status.toLowerCase() === 'failure') {
                statusElement.classList.add('red');
            } else if (data.script_status.toLowerCase() === 'not run') {
                statusElement.classList.add('red');
            }

            document.querySelector('.popup-container').style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

function closePopup() {
    var popupContainer = document.querySelector('.popup-container');
    if (popupContainer) {
        popupContainer.style.display = 'none';
        popupContainer.remove();
    }
}



	
