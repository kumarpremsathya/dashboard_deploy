
// Highlighting the anchor tag links when we clicked with background colour greenyellow

document.addEventListener('DOMContentLoaded', function () {
    function highlightSelectedTable() {
        var tableLinks = document.querySelectorAll('[data-source]');

        tableLinks.forEach(function (link) {
            if (link.getAttribute('data-source') === selectedTable) {
                link.classList.add('highlight');
                link.style.backgroundColor = 'greenyellow';
                link.style.fontWeight = 'bold';
            }
        });
    }

    highlightSelectedTable();
});



// function for implementing excel download functionalities  
document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('downloadExcel').addEventListener('click', function () {
            var dateRangeDropdown = document.getElementById('id_date_range');
            var startDate = document.getElementById('id_start_date').value;
            var endDate = document.getElementById('id_end_date').value;
    
            // Use the selected value from the date range dropdown
            var dateRange = dateRangeDropdown.options[dateRangeDropdown.selectedIndex].value;
    
            // Construct the download link dynamically based on the selected date range and custom dates
            var downloadLink = window.location.href.split('?')[0] + '?download=true&date_range=' + dateRange;
    
            if (dateRange === 'custom') {
                // Add custom start_date and end_date to the download link
                downloadLink += '&start_date=' + startDate + '&end_date=' + endDate;
            }
    
            window.location.href = downloadLink;
        });
});       

    
// function for implementing dropdown functionalities and showing results in table.
window.validateCustomDateRange = function() {
    var dateRangeDropdown = document.getElementsByName('date_range')[0];
    var startDateInput = document.getElementsByName('start_date')[0];
    var endDateInput = document.getElementsByName('end_date')[0];
    var errorMessage = document.getElementById('error-message');

    if (dateRangeDropdown.value === 'custom') {
        // Check if both start date and end date are selected
        if (!startDateInput.value || !endDateInput.value) {
            errorMessage.textContent = 'Please select both start date and end date.';
            return false;
        }

        // Check if end date is today or earlier
        var today = new Date().toISOString().split('T')[0];
        if (endDateInput.value > today) {
            errorMessage.textContent = 'End date cannot be later than today.';
            return false;
        }
        
        // Check if the start date is greater than the end date
        var startDate = new Date(startDateInput.value);
        var endDate = new Date(endDateInput.value);
        if (startDate > endDate) {
            errorMessage.textContent = 'Start date should not be greater than end date.';
            return false;
        }


        // Check if the date range exceeds 60 days
        var startDate = new Date(startDateInput.value);
        var endDate = new Date(endDateInput.value);
        var sixtyDaysLater = new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000);

        if (endDate > sixtyDaysLater) {
            errorMessage.textContent = 'Date range for custom view cannot exceed 60 days.';
            return false;
        }

        // Hide the error message and display the table
        errorMessage.textContent = '';
        document.getElementById('city-table').style.display = 'table'; 
    }

    return true;
};

document.addEventListener('DOMContentLoaded', function () {
    var customDateFields = document.getElementById('custom-date-fields');
    var dateRangeDropdown = document.getElementsByName('date_range')[0];
    var errorMessage = document.getElementById('error-message');

    // Initial check to show/hide custom date fields
    toggleCustomDateFields();

    // Add event listener to the date range dropdown
    dateRangeDropdown.addEventListener('change', toggleCustomDateFields);

    function toggleCustomDateFields() {
        if (dateRangeDropdown.value === 'custom') {
            customDateFields.style.display = 'block';
            // Hide the table for the custom option until validated
            document.getElementById('city-table').style.display = 'table';
        } else {
            customDateFields.style.display = 'none';
            // Show the table for other options
            document.getElementById('city-table').style.display = 'table';
        }
    }
});




