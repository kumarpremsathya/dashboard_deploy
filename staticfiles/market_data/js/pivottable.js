// When the user clicks on <div>, open the popup
function toggleDateInputs() {
    var timeRangeSelect = document.getElementById('time_range_select');
    var dateRangeForm = document.getElementById('date_range_form');
    var filterButton = document.querySelector("#date_range_form button");

    if (timeRangeSelect.value === "custom") {
        var currentDate = new Date();
        var ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(currentDate.getDate() - 90);

        // Enable or disable the "Date Range" option based on the restriction
        var dateRangeOption = document.querySelector("option[value='custom']");
        dateRangeOption.disabled = (ninetyDaysAgo > new Date());

        dateRangeForm.style.display = "inline-block";
        filterButton.style.display = "inline-block";
    } else {
        dateRangeForm.style.display = "none";
        filterButton.style.display = "none";
    }
}




// Function to set the from_date and to_date values based on the selected time range
function setDefaultDates() {
    var timeRangeSelect = document.getElementById('time_range_select');
    var fromInput = document.getElementById('from_date');
    var toInput = document.getElementById('to_date');
    
    if (timeRangeSelect.value === '7') {
        // Set the from_date to 15 days ago and to_date to today
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        fromInput.value = sevenDaysAgo.toISOString().split('T')[0];

        var today = new Date();
        toInput.value = today.toISOString().split('T')[0];
    } else if (timeRangeSelect.value === '15') {
        // Set the from_date to 15 days ago and to_date to today
        var fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        fromInput.value = fifteenDaysAgo.toISOString().split('T')[0];

        var today = new Date();
        toInput.value = today.toISOString().split('T')[0];
    } else if (timeRangeSelect.value === '30') {
        // Set the from_date to 30 days ago and to_date to today
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        fromInput.value = thirtyDaysAgo.toISOString().split('T')[0];

        var today = new Date();
        toInput.value = today.toISOString().split('T')[0];
    }
}
function submitForm() {
    document.getElementById('date_range_form').submit();
}


// Converted jQuery document.ready to vanilla JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set the default time range to "Last 7 Days"
    document.getElementById("time_range_select").value = '7';

    // Call the function to toggle date inputs based on the default selection
    toggleDateInputs();

    // Call the function to set default dates based on the default time range
    setDefaultDates();

    highlightSelectedTable();
});


function openPopup(table_name) {
    fetch(`/get_data_for_popup/${table_name}/`, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Data not available for today.');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log(data.reason);

                var statusColor = 'red';  // Default color if status is undefined
                if (data.status) {
                    if (data.status.toLowerCase() === 'success') {
                        statusColor = 'green';
                    } else if (data.status.toLowerCase() === 'failure' && data.amber_table_names.includes(data.table_name)) {
                        statusColor = 'orange';
                    }
                }

                var popupContent = `
                    <div class="popup-container">
                        <span class="close-btn" onclick="closePopup()">X</span>
                        <p class="popup-info">Data Source : <span class="popup-style">${data.table_name}</span></p>
                        <p class="popup-info">Status :
                            <span class="popup-style" style="color: ${statusColor}">${data.status || '-'}</span>
                        </p>
                        <p class="popup-info">#Records Scraped : <span class="popup-style">${data.no_of_data_scraped}</span></p>
                        <p class="popup-info">Failure Reason : <span class="popup-style">${data.reason ? data.reason : '-'}</span></p>
                        <p class="popup-info">Trade Date : <span class="popup-style">${data.trade_date}</span></p>
                        <p class="popup-info">Newly Added Count : <span class="popup-style">${data.newly_added_count}</span></p>
                        <p class="popup-info">Deleted Source Count : <span class="popup-style">${data.deleted_source_count}</span></p>
                        <p class="popup-info">Scraped On : <span class="popup-style">${data.Scraped_on}</span></p>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', popupContent);

                document.querySelector('.popup-container').style.display = 'block';
            } else {
                alert('Data not available for today.');
            }
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



function highlightSelectedTable() {
    var selectedTable = "{{ table_name }}";  // Assuming table_name is defined in your Django context
    var tableLinks = document.querySelectorAll('.table-link');

    tableLinks.forEach(function (link) {
        if (link.textContent.trim() === selectedTable) {
            link.classList.add('highlight');
      // Apply styles directly
    link.style.backgroundColor = 'greenyellow';
    link.style.fontWeight = 'bold';
    // Add any other styles you want to apply
}
});
}