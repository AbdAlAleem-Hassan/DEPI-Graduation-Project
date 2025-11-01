// hospitals.js
let hospitals = [];
let filteredHospitals = [];
let currentView = 'grid';
let currentPage = 1;
const hospitalsPerPage = 9;
let hospitalMarkers = [];
let hospitalMap;
let activeFilters = {};
let userLocation = null;
let locationCircle = null;
let userMarker = null;

// Toaster functions
function showToast(message, type = 'error') {
    const toasterContainer = document.getElementById('toasterContainer') || createToasterContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation-circle' : 'check-circle'}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toasterContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function createToasterContainer() {
    const container = document.createElement('div');
    container.id = 'toasterContainer';
    container.className = 'toaster-container';
    document.body.appendChild(container);
    return container;
}

// Hospital data with coordinates
const hospitalData = [
    {
        id: 1,
        name: 'Cairo Medical Center',
        nameAr: 'المركز الطبي بالقاهرة',
        location: 'Cairo, Egypt',
        locationAr: 'القاهرة، مصر',
        specialties: ['Cardiology', 'Neurology', 'Surgery'],
        rating: 4.8,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 25,
        doctors: 150,
        distance: null,
        coordinates: [30.0444, 31.2357],
        availability24: true,
        cost: 'medium',
        insurance: ['public', 'private'],
        contractStatus: 'active',
        type: 'general'
    },
    {
        id: 2,
        name: 'Alexandria General Hospital',
        nameAr: 'مستشفى الإسكندرية العام',
        location: 'Alexandria, Egypt',
        locationAr: 'الإسكندرية، مصر',
        specialties: ['Pediatrics', 'Orthopedics', 'Dermatology'],
        rating: 4.6,
        reviews: 278,
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 18,
        doctors: 120,
        distance: null,
        coordinates: [31.2001, 29.9187],
        availability24: true,
        cost: 'low',
        insurance: ['public'],
        contractStatus: 'active',
        type: 'general'
    },
    {
        id: 3,
        name: 'Giza Specialty Hospital',
        nameAr: 'مستشفى الجيزة التخصصي',
        location: 'Giza, Egypt',
        locationAr: 'الجيزة، مصر',
        specialties: ['Surgery', 'Cardiology', 'Emergency'],
        rating: 4.9,
        reviews: 195,
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWxzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
        departments: 30,
        doctors: 200,
        distance: null,
        coordinates: [30.0131, 31.2089],
        availability24: true,
        cost: 'high',
        insurance: ['private'],
        contractStatus: 'active',
        type: 'specialty'
    },
    {
        id: 4,
        name: 'Sharm El Sheikh Medical',
        nameAr: 'المركز الطبي بشرم الشيخ',
        location: 'Sharm El Sheikh, Egypt',
        locationAr: 'شرم الشيخ، مصر',
        specialties: ['Orthopedics', 'Physiotherapy', 'Sports Medicine'],
        rating: 4.7,
        reviews: 223,
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 15,
        doctors: 85,
        distance: null,
        coordinates: [27.9158, 34.3300],
        availability24: false,
        cost: 'high',
        insurance: ['private'],
        contractStatus: 'pending',
        type: 'private'
    },
    {
        id: 5,
        name: 'Luxor International Hospital',
        nameAr: 'مستشفى الأقصر الدولي',
        location: 'Luxor, Egypt',
        locationAr: 'الأقصر، مصر',
        specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
        rating: 4.5,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 20,
        doctors: 110,
        distance: null,
        coordinates: [25.6872, 32.6396],
        availability24: true,
        cost: 'medium',
        insurance: ['public', 'private'],
        contractStatus: 'active',
        type: 'general'
    },
    {
        id: 6,
        name: 'Aswan University Hospital',
        nameAr: 'مستشفى أسوان الجامعي',
        location: 'Aswan, Egypt',
        locationAr: 'أسوان، مصر',
        specialties: ['Research', 'Teaching', 'Specialized Care'],
        rating: 4.4,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 22,
        doctors: 95,
        distance: null,
        coordinates: [24.0889, 32.8998],
        availability24: true,
        cost: 'low',
        insurance: ['public'],
        contractStatus: 'active',
        type: 'university'
    },
    {
        id: 7,
        name: 'Hurghada Health Center',
        nameAr: 'مركز الغردقة الصحي',
        location: 'Hurghada, Egypt',
        locationAr: 'الغردقة، مصر',
        specialties: ['Tourism Medicine', 'Emergency Care', 'General Practice'],
        rating: 4.6,
        reviews: 212,
        image: 'https://plus.unsplash.com/premium_photo-1673988726931-127584121c34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
        departments: 18,
        doctors: 100,
        distance: null,
        coordinates: [27.1750, 33.6403],
        availability24: true,
        cost: 'medium',
        insurance: ['private'],
        contractStatus: 'active',
        type: 'private'
    },
    {
        id: 8,
        name: 'Tanta Specialized Hospital',
        nameAr: 'مستشفى طنطا التخصصي',
        location: 'Tanta, Egypt',
        locationAr: 'طنطا، مصر',
        specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
        rating: 4.7,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 19,
        doctors: 95,
        distance: null,
        coordinates: [31.1667, 31.4167],
        availability24: true,
        cost: 'low',
        insurance: ['public', 'private'],
        contractStatus: 'active',
        type: 'general'
    },
    {
        id: 9,
        name: 'Cairo University Hospital',
        nameAr: 'مستشفى الجامعة القاهرية',
        location: 'Cairo, Egypt',
        locationAr: 'قاهرة، مصر',
        specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
        rating: 4.5,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zcGl0YWxzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
        departments: 20,
        doctors: 110,
        distance: null,
        coordinates: [30.0444, 31.2497],
        availability24: true,
        cost: 'high',
        insurance: ['public'],
        contractStatus: 'active',
        type: 'university'
    },
    {
        id: 10,
        name: 'Alexandria Medical Center',
        nameAr: 'المركز الطبي بالعليا',
        location: 'Alexandria, Egypt',
        locationAr: 'العليا، مصر',
        specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
        rating: 4.8,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        departments: 25,
        doctors: 150,
        distance: null,
        coordinates: [31.2057, 29.9187],
        availability24: true,
        cost: 'medium',
        insurance: ['public', 'private'],
        contractStatus: 'active',
        type: 'general'
    }
];

// Initialize hospitals page
function initializeHospitalsPage() {
    hospitals = hospitalData.map(hospital => ({
        ...hospital,
        distance: null
    }));
    filteredHospitals = [...hospitals];
    
    initializeEventListeners();
    requestUserLocation();
    applySorting();
    updateResultsCount();
    updateActiveFiltersDisplay();
    initializeCustomDropdowns();

    // Force distance filter to be off initially
    const distanceToggle = document.getElementById('distanceToggle');
    if (distanceToggle) {
        distanceToggle.checked = false;
        updateDistanceFilterState(false);
    }
}

// Request user location
function requestUserLocation() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by this browser.', 'error');
        updateDistanceFilterState(false);
        return;
    }

    showToast('Requesting location access...', 'warning');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            showToast('Location access granted! Calculating distances...', 'success');
            calculateDistances();
            // updateDistanceFilterState(true);
            if (hospitalMap) {
                addUserLocationToMap();
            }
        },
        (error) => {
            handleLocationError(error);
            updateDistanceFilterState(false);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

// Handle location errors
function handleLocationError(error) {
    let message = 'Unable to retrieve your location. ';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message += 'Location access was denied.';
            break;
        case error.POSITION_UNAVAILABLE:
            message += 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            message += 'Location request timed out.';
            break;
        default:
            message += 'An unknown error occurred.';
            break;
    }
    
    showToast(message, 'error');
    console.error('Location error:', error);
}

// Calculate distances using Haversine formula
function calculateDistances() {
    if (!userLocation) return;

    hospitals.forEach(hospital => {
        hospital.distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            hospital.coordinates[0],
            hospital.coordinates[1]
        );
    });

    filteredHospitals = [...hospitals];
    applyFilters();
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Update distance filter state
function updateDistanceFilterState(enabled) {
    const distanceToggle = document.getElementById('distanceToggle');
    const distanceFilter = document.getElementById('distanceFilter');
    const distanceContainer = document.getElementById('distanceFilterContainer');
    
    if (enabled && userLocation) {
        distanceToggle.checked = true;
        distanceFilter.disabled = false;
        distanceContainer.classList.remove('distance-unavailable');
        // Update range value display
        const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
        const distanceValue = document.getElementById('distanceValue');
        distanceValue.textContent = `${distanceFilter.value} ${currentLang === 'ar' ? 'كم' : 'km'}`;
        updateRangeProgress(distanceFilter);
    } else {
        distanceToggle.checked = false;
        distanceFilter.disabled = true;
        distanceContainer.classList.add('distance-unavailable');
    }
}

// Initialize custom dropdowns
function initializeCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.custom-dropdown-select');
        const options = dropdown.querySelector('.custom-dropdown-options');
        const optionsList = dropdown.querySelectorAll('.custom-dropdown-option');
        const hiddenInput = dropdown.querySelector('select');
        
        // Set initial value - select first option
        if (optionsList.length > 0) {
            const firstOption = optionsList[0];
            const value = firstOption.getAttribute('data-value');
            const text = firstOption.textContent;
            
            select.innerHTML = text + '<i class="fas fa-chevron-down"></i>';
            hiddenInput.value = value;
            
            // Add selected class to first option
            optionsList.forEach(opt => opt.classList.remove('selected'));
            firstOption.classList.add('selected');
        }
        
        // Toggle dropdown
        select.addEventListener('click', (e) => {
            e.stopPropagation();
            options.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.custom-dropdown-options').forEach(otherOptions => {
                if (otherOptions !== options) {
                    otherOptions.classList.remove('active');
                }
            });
        });
        
        // Handle option selection
        optionsList.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                const text = option.textContent;
                
                // Update select display
                select.innerHTML = text + '<i class="fas fa-chevron-down"></i>';
                
                // Update hidden input
                hiddenInput.value = value;
                
                // Close dropdown
                options.classList.remove('active');
                
                // Trigger change event
                hiddenInput.dispatchEvent(new Event('change'));
                
                // Remove selected class from all options
                optionsList.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to current option
                option.classList.add('selected');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            options.classList.remove('active');
        });
    });
}

// Reset custom dropdown to first option
function resetCustomDropdown(dropdownId) {
    const dropdown = document.querySelector(`#${dropdownId}`).closest('.custom-dropdown');
    if (!dropdown) return;
    
    const select = dropdown.querySelector('.custom-dropdown-select');
    const options = dropdown.querySelectorAll('.custom-dropdown-option');
    const hiddenInput = dropdown.querySelector('select');
    
    if (options.length > 0) {
        const firstOption = options[0];
        const value = firstOption.getAttribute('data-value');
        const text = firstOption.textContent;
        
        select.innerHTML = text + '<i class="fas fa-chevron-down"></i>';
        hiddenInput.value = value;
        
        // Update selected class
        options.forEach(opt => opt.classList.remove('selected'));
        firstOption.classList.add('selected');
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.getAttribute('data-view');
            localStorage.setItem('currentHospitalView', currentView);
            switchView(currentView);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('hospitalSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);

    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select, .filter-checkbox input');
    filterSelects.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Distance filter toggle
    const distanceToggle = document.getElementById('distanceToggle');
    if (distanceToggle) {
        distanceToggle.addEventListener('change', () => {
            if (distanceToggle.checked && !userLocation) {
                // If toggle is on but no location, request location
                requestUserLocation();
            } else {
                updateDistanceFilterState(distanceToggle.checked && userLocation);
                applyFilters();
            }
        });
    }

    // Distance range filter
    const distanceFilter = document.getElementById('distanceFilter');
    const distanceValue = document.getElementById('distanceValue');

    // Initialize range progress
    updateRangeProgress(distanceFilter);

    distanceFilter.addEventListener('input', () => {
        updateRangeProgress(distanceFilter);
        const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
        distanceValue.textContent = `${distanceFilter.value} ${currentLang === 'ar' ? 'كم' : 'km'}`;
        // Only apply filters if distance toggle is actually on
        if (distanceToggle.checked && userLocation) {
            applyFilters();
        }
    });

    // Quick filter buttons - UPDATED
    const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
    quickFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.getAttribute('data-filter');
            applyQuickFilter(filterType);
        });
    });

    // More filters toggle
    const moreFiltersBtn = document.getElementById('moreFiltersBtn');
    const additionalFilters = document.getElementById('additionalFilters');
    
    if (moreFiltersBtn && additionalFilters) {
        moreFiltersBtn.addEventListener('click', () => {
            additionalFilters.classList.toggle('active');
            const icon = moreFiltersBtn.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    }

    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }

    // Pagination
    updatePagination();
    setupPaginationEventListeners();
}

// Apply quick filters - NEW FUNCTION
function applyQuickFilter(filterType) {
    // Reset all quick filter buttons
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activate the clicked button
    const clickedBtn = document.querySelector(`[data-filter="${filterType}"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    switch (filterType) {
        case '24/7':
            document.getElementById('availabilityFilter').checked = true;
            break;
        case 'high-rating':
            document.getElementById('ratingFilter').value = '4.5';
            updateCustomDropdownDisplay('ratingFilter');
            break;
        case 'nearby':
            if (userLocation) {
                document.getElementById('distanceToggle').checked = true;
                document.getElementById('distanceFilter').value = '10';
                updateDistanceFilterState(true);
                updateRangeProgress(document.getElementById('distanceFilter'));
            } else {
                requestUserLocation();
                showToast('Requesting location for nearby filter...', 'warning');
            }
            break;
        case 'emergency':
            document.getElementById('availabilityFilter').checked = true;
            document.getElementById('specialtyFilter').value = 'surgery';
            updateCustomDropdownDisplay('specialtyFilter');
            break;
    }
    
    applyFilters();
}

// Update custom dropdown display
function updateCustomDropdownDisplay(selectId) {
    const select = document.getElementById(selectId);
    const dropdown = select.closest('.custom-dropdown');
    const customSelect = dropdown.querySelector('.custom-dropdown-select');
    const options = dropdown.querySelectorAll('.custom-dropdown-option');
    
    const selectedOption = Array.from(options).find(option => 
        option.getAttribute('data-value') === select.value
    );
    
    if (selectedOption) {
        customSelect.innerHTML = selectedOption.innerHTML + '<i class="fas fa-chevron-down"></i>';
        options.forEach(opt => opt.classList.remove('selected'));
        selectedOption.classList.add('selected');
    }
}

// Distance range progress update
function updateRangeProgress(range) {
    const value = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.setProperty('--range-progress', value + '%');
}

// Handle search functionality
function handleSearch() {
    const searchTerm = document.getElementById('hospitalSearch').value.toLowerCase();
    
    if (searchTerm.length >= 2) {
        showAutocompleteSuggestions(searchTerm);
    } else {
        hideAutocomplete();
    }
    
    applyFilters();
}

// Show autocomplete suggestions
function showAutocompleteSuggestions(searchTerm) {
    const autocomplete = document.getElementById('searchAutocomplete');
    const suggestions = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchTerm) || 
        hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
    ).slice(0, 5);
    
    if (suggestions.length > 0) {
        autocomplete.innerHTML = suggestions.map(hospital => 
            `<div class="autocomplete-item" data-id="${hospital.id}">${hospital.name}</div>`
        ).join('');
        autocomplete.classList.add('active');
        
        // Add click event to autocomplete items
        document.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('hospitalSearch').value = item.textContent;
                hideAutocomplete();
                applyFilters();
            });
        });
    } else {
        hideAutocomplete();
    }
}

// Hide autocomplete
function hideAutocomplete() {
    const autocomplete = document.getElementById('searchAutocomplete');
    autocomplete.classList.remove('active');
    autocomplete.innerHTML = '';
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('hospitalSearch').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const specialtyFilter = document.getElementById('specialtyFilter').value;
    const ratingFilter = parseFloat(document.getElementById('ratingFilter').value);
    const distanceFilterValue = parseFloat(document.getElementById('distanceFilter').value);
    const distanceToggle = document.getElementById('distanceToggle');
    const isDistanceFilterActive = distanceToggle.checked && userLocation;
    const costFilter = document.getElementById('costFilter').value;
    const availabilityFilter = document.getElementById('availabilityFilter')?.checked || false;
    const insuranceFilter = document.getElementById('insuranceFilter').value;
    const contractFilter = document.getElementById('contractFilter').value;
    
    // Update active filters
    activeFilters = {};
    if (searchTerm) activeFilters.search = searchTerm;
    if (locationFilter) activeFilters.location = locationFilter;
    if (specialtyFilter) activeFilters.specialty = specialtyFilter;
    if (ratingFilter > 0) activeFilters.rating = ratingFilter;
    if (isDistanceFilterActive) activeFilters.distance = distanceFilterValue;    
    if (costFilter) activeFilters.cost = costFilter;
    if (availabilityFilter) activeFilters.availability = true;
    if (insuranceFilter) activeFilters.insurance = insuranceFilter;
    if (contractFilter) activeFilters.contract = contractFilter;

    filteredHospitals = hospitals.filter(hospital => {
        // Search filter
        const matchesSearch = !searchTerm || 
            hospital.name.toLowerCase().includes(searchTerm) ||
            hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm));
        
        // Location filter
        const matchesLocation = !locationFilter || hospital.location.toLowerCase().includes(locationFilter);
        
        // Specialty filter
        const matchesSpecialty = !specialtyFilter || 
            hospital.specialties.some(specialty => specialty.toLowerCase().includes(specialtyFilter));
        
        // Rating filter
        const matchesRating = !ratingFilter || hospital.rating >= ratingFilter;
        
        // Distance filter
        const matchesDistance = !isDistanceFilterActive || 
                              (hospital.distance !== null && hospital.distance <= distanceFilterValue);
        
        // Additional filters
        const matchesCost = !costFilter || hospital.cost === costFilter;
        const matchesAvailability = !availabilityFilter || hospital.availability24;
        const matchesInsurance = !insuranceFilter || hospital.insurance.includes(insuranceFilter);
        const matchesContract = !contractFilter || hospital.contractStatus === contractFilter;
        
        return matchesSearch && matchesLocation && matchesSpecialty && matchesRating && 
               matchesDistance && matchesCost && matchesAvailability && matchesInsurance && matchesContract;
    });
    
    currentPage = 1;
    applySorting();
    updateResultsCount();
    renderHospitals();
    updateHospitalMap();
    updateActiveFiltersDisplay();
    updatePagination();
}

// Apply sorting
function applySorting() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredHospitals.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                return b.rating - a.rating;
            case 'distance':
                if (a.distance === null && b.distance === null) return 0;
                if (a.distance === null) return 1;
                if (b.distance === null) return -1;
                return a.distance - b.distance;
            default:
                return 0;
        }
    });
    
    renderHospitals();
    updateHospitalMap();
}

// Update active filters display
function updateActiveFiltersDisplay() {
    const container = document.getElementById('activeFilters');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(activeFilters).forEach(([key, value]) => {
        const filterText = getFilterDisplayText(key, value);
        if (filterText) {
            const tag = document.createElement('div');
            tag.className = 'active-filter-tag';
            tag.innerHTML = `
                <span>${filterText}</span>
                <button class="remove-filter" data-filter="${key}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(tag);
        }
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterKey = e.currentTarget.getAttribute('data-filter');
            removeFilter(filterKey);
        });
    });
}

// Get display text for filter
function getFilterDisplayText(key, value) {
    const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
    
    const texts = {
        search: { en: `Search: ${value}`, ar: `بحث: ${value}` },
        location: { en: `Location: ${value}`, ar: `الموقع: ${value}` },
        specialty: { en: `Specialty: ${value}`, ar: `التخصص: ${value}` },
        rating: { en: `Rating: ${value}+`, ar: `التقييم: ${value}+` },
        distance: { en: `Distance: ${value}km`, ar: `المسافة: ${value}كم` },
        cost: { 
            low: { en: 'Cost: Low', ar: 'التكلفة: منخفض' },
            medium: { en: 'Cost: Medium', ar: 'التكلفة: متوسط' },
            high: { en: 'Cost: High', ar: 'التكلفة: مرتفع' }
        },
        availability: { en: '24/7 Available', ar: 'متاح 24/7' },
        insurance: {
            public: { en: 'Public Insurance', ar: 'تأمين حكومي' },
            private: { en: 'Private Insurance', ar: 'تأمين خاص' }
        },
        contract: {
            active: { en: 'Active Contract', ar: 'عقد فعال' },
            pending: { en: 'Pending Contract', ar: 'عقد معلق' }
        }
    };
    
    if (key === 'cost' && texts.cost[value]) {
        return texts.cost[value][currentLang];
    }
    if (key === 'insurance' && texts.insurance[value]) {
        return texts.insurance[value][currentLang];
    }
    if (key === 'contract' && texts.contract[value]) {
        return texts.contract[value][currentLang];
    }
    if (texts[key] && typeof texts[key] === 'object' && texts[key][currentLang]) {
        return texts[key][currentLang];
    }
    
    return null;
}

// Remove specific filter
function removeFilter(filterKey) {
    switch (filterKey) {
        case 'search':
            document.getElementById('hospitalSearch').value = '';
            break;
        case 'location':
            resetCustomDropdown('locationFilter');
            break;
        case 'specialty':
            resetCustomDropdown('specialtyFilter');
            break;
        case 'rating':
            resetCustomDropdown('ratingFilter');
            break;
        case 'distance':
            document.getElementById('distanceToggle').checked = false;
            updateDistanceFilterState(false);
            break;
        case 'cost':
            resetCustomDropdown('costFilter');
            break;
        case 'availability':
            document.getElementById('availabilityFilter').checked = false;
            break;
        case 'insurance':
            resetCustomDropdown('insuranceFilter');
            break;
        case 'contract':
            resetCustomDropdown('contractFilter');
            break;
    }
    
    // Reset quick filter buttons
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    applyFilters();
}

// Clear all filters
function clearFilters() {
    // Reset all filter inputs
    document.getElementById('hospitalSearch').value = '';
    
    // Reset all dropdowns to first option
    resetCustomDropdown('locationFilter');
    resetCustomDropdown('specialtyFilter');
    resetCustomDropdown('ratingFilter');
    resetCustomDropdown('costFilter');
    resetCustomDropdown('insuranceFilter');
    resetCustomDropdown('contractFilter');
    
    // Reset checkboxes and toggles
    document.getElementById('distanceToggle').checked = false;
    document.getElementById('distanceFilter').value = '50';
    document.getElementById('availabilityFilter').checked = false;
    
    // Reset quick filters
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset additional filters
    const additionalFilters = document.getElementById('additionalFilters');
    if (additionalFilters) {
        additionalFilters.classList.remove('active');
    }
    
    updateDistanceFilterState(false);
    updateRangeProgress(document.getElementById('distanceFilter'));
    applyFilters();
}

// Switch view
function switchView(view) {
    document.querySelectorAll('.results-grid, .results-list, .results-map').forEach(el => {
        el.classList.remove('active');
    });
    
    document.getElementById(`${view}View`).classList.add('active');
    
    if (view === 'map') {
        if (!hospitalMap) {
            initializeHospitalMap();
        } else {
            updateHospitalMap();
        }
    }
    
    renderHospitals();
}

// Render hospitals based on current view
function renderHospitals() {
    const startIndex = (currentPage - 1) * hospitalsPerPage;
    const endIndex = startIndex + hospitalsPerPage;
    const hospitalsToShow = filteredHospitals.slice(startIndex, endIndex);
    
    switch (currentView) {
        case 'grid':
            renderGridView(hospitalsToShow);
            break;
        case 'list':
            renderListView(hospitalsToShow);
            break;
        case 'map':
            renderMapView(hospitalsToShow);
            break;
    }
}

// Render grid view
function renderGridView(hospitalsToShow) {
    const container = document.getElementById('hospitalsGrid');
    if (!container) return;
    
    if (hospitalsToShow.length === 0) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = '1fr';
        container.innerHTML = getNoResultsHTML();
        return;
    } else {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
    
    container.innerHTML = hospitalsToShow.map(hospital => `
        <div class="hospital-card" data-id="${hospital.id}">
            <div class="hospital-image">
                <img src="${hospital.image}" alt="${hospital.name}">
                <div class="hospital-rating">
                    <i class="fas fa-star"></i>
                    <span>${hospital.rating}</span>
                </div>
                ${hospital.availability24 ? '<div class="hospital-badge" data-en="24/7" data-ar="24/7">24/7</div>' : ''}
            </div>
            <div class="hospital-content">
                <h3 class="hospital-name" data-en="${hospital.name}" data-ar="${hospital.nameAr}">${hospital.name}</h3>
                <div class="hospital-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span data-en="${hospital.location}" data-ar="${hospital.locationAr}">${hospital.location}</span>
                    <span class="hospital-distance">${hospital.distance !== null ? hospital.distance : '--'} km</span>
                </div>
                <div class="hospital-specialties">
                    ${hospital.specialties.slice(0, 3).map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                    ${hospital.specialties.length > 3 ? 
                        `<span class="more-specialties">+${hospital.specialties.length - 3}</span>` : ''
                    }
                </div>
                <div class="hospital-stats">
                    <div class="hospital-stat">
                        <div class="hospital-stat-value">${hospital.departments}</div>
                        <div class="hospital-stat-label" data-en="Departments" data-ar="أقسام">Departments</div>
                    </div>
                    <div class="hospital-stat">
                        <div class="hospital-stat-value">${hospital.doctors}</div>
                        <div class="hospital-stat-label" data-en="Doctors" data-ar="أطباء">Doctors</div>
                    </div>
                </div>
                <div class="hospital-actions">
                    <button class="hospital-btn view-details" data-id="${hospital.id}">
                        <span data-en="View Details" data-ar="عرض التفاصيل">View Details</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="hospital-btn secondary view-on-map" data-id="${hospital.id}">
                        <i class="fas fa-map-marker-alt"></i>
                        <span data-en="View on Map" data-ar="عرض على الخريطة">View on Map</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const hospitalId = e.currentTarget.getAttribute('data-id');
            viewHospitalDetails(hospitalId);
        });
    });
    
    document.querySelectorAll('.view-on-map').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const hospitalId = e.currentTarget.getAttribute('data-id');
            switchToMapView(hospitalId);
        });
    });
}

// Render list view
function renderListView(hospitalsToShow) {
    const container = document.getElementById('hospitalsList');
    if (!container) return;
    
    if (hospitalsToShow.length === 0) {
        container.innerHTML = getNoResultsHTML();
        return;
    }
    
    container.innerHTML = `
        <table class="hospitals-table">
            <thead>
                <tr>
                    <th data-en="Hospital" data-ar="المستشفى">Hospital</th>
                    <th data-en="Location" data-ar="الموقع">Location</th>
                    <th data-en="Specialties" data-ar="التخصصات">Specialties</th>
                    <th data-en="Rating" data-ar="التقييم">Rating</th>
                    <th data-en="Distance" data-ar="المسافة">Distance</th>
                    <th data-en="Actions" data-ar="الإجراءات">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${hospitalsToShow.map(hospital => `
                    <tr data-id="${hospital.id}">
                        <td>
                            <div class="table-hospital-info">
                                <div class="table-hospital-image">
                                    <img src="${hospital.image}" alt="${hospital.name}">
                                </div>
                                <div class="table-hospital-details">
                                    <div class="table-hospital-name" data-en="${hospital.name}" data-ar="${hospital.nameAr}">${hospital.name}</div>
                                    ${hospital.availability24 ? '<div class="hospital-badge-small available">24/7</div>' : ''}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="hospital-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span data-en="${hospital.location}" data-ar="${hospital.locationAr}">${hospital.location}</span>
                            </div>
                        </td>
                        <td>
                            <div class="hospital-specialties">
                                ${hospital.specialties.slice(0, 2).map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                                ${hospital.specialties.length > 2 ? `<span class="more-specialties">+${hospital.specialties.length - 2}</span>` : ''}
                            </div>
                        </td>
                        <td>
                            <div class="hospital-rating-cell">
                                <i class="fas fa-star"></i>
                                <span>${hospital.rating}</span>
                            </div>
                        </td>
                        <td class="hospital-distance">${hospital.distance !== null ? hospital.distance : '--'} km</td>
                        <td>
                            <div class="table-action-buttons">
                                <button class="table-btn primary view-details" data-id="${hospital.id}">
                                    <span data-en="Details" data-ar="تفاصيل">Details</span>
                                </button>
                                <button class="table-btn secondary view-on-map" data-id="${hospital.id}">
                                    <i class="fas fa-map-marker-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Add event listeners
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const hospitalId = e.currentTarget.getAttribute('data-id');
            viewHospitalDetails(hospitalId);
        });
    });
    
    document.querySelectorAll('.view-on-map').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const hospitalId = e.currentTarget.getAttribute('data-id');
            switchToMapView(hospitalId);
        });
    });
}

// Render map view sidebar
function renderMapView(hospitalsToShow) {
    const container = document.getElementById('mapHospitalsList');
    if (!container) return;
    
    if (hospitalsToShow.length === 0) {
        container.innerHTML = getNoResultsHTML();
        return;
    }
    
    container.innerHTML = hospitalsToShow.map(hospital => `
        <div class="map-hospital-item" data-id="${hospital.id}" onclick="focusOnHospital(${hospital.id})">
            <div class="map-hospital-image">
                <img src="${hospital.image}" alt="${hospital.name}" loading="lazy">
            </div>
            <div class="map-hospital-info">
                <h4>${hospital.name}</h4>
                <div class="map-hospital-details">
                    <div class="map-hospital-stats">
                        <div class="map-hospital-rating">
                            <i class="fas fa-star"></i>
                            <span>${hospital.rating}</span>
                        </div>
                        <div class="map-hospital-distance">
                            <i class="fas fa-route"></i>
                            <span>${hospital.distance !== null ? `${hospital.distance} ${document.body.classList.contains('rtl') ? 'كم' : 'km'}` : '--'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="map-hospital-btn" onclick="event.stopPropagation(); viewHospitalDetails(${hospital.id})">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `).join('');
}

// Get no results HTML
function getNoResultsHTML() {
    return `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3 data-en="No hospitals found" data-ar="لم يتم العثور على مستشفيات">No hospitals found</h3>
            <p data-en="Try adjusting your search or filters" data-ar="حاول تعديل البحث أو الفلاتر">Try adjusting your search or filters</p>
        </div>
    `;
}

// Switch to map view and focus on hospital
function switchToMapView(hospitalId) {
    // Switch to map view UI
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-view="map"]').classList.add('active');
    currentView = 'map';
    localStorage.setItem('currentHospitalView', currentView);
    
    // Switch the view
    switchView('map');
    
    // Use retry mechanism to ensure map is ready before focusing
    retryMapOperation(() => {
        focusOnHospital(hospitalId);
    }).catch(error => {
        console.error('Failed to focus on hospital after retries:', error);
        showToast('Failed to load map view', 'error');
    });
}

// Ensure map is properly initialized before focusing
function ensureMapInitialized(callback) {
    if (hospitalMap) {
        callback();
    } else {
        // If map doesn't exist, initialize it first
        initializeHospitalMap();
        // Wait for map to be ready
        setTimeout(callback, 300);
    }
}

// Check if map is ready for operations
function isMapReady() {
    return hospitalMap && typeof hospitalMap.setView === 'function';
}

// Retry mechanism for map operations
function retryMapOperation(operation, maxRetries = 3, delay = 200) {
    return new Promise((resolve, reject) => {
        let retries = 0;
        
        function attempt() {
            if (isMapReady()) {
                resolve(operation());
            } else if (retries < maxRetries) {
                retries++;
                setTimeout(attempt, delay);
            } else {
                reject(new Error('Map not ready after maximum retries'));
            }
        }
        
        attempt();
    });
}

// Update results count
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
        const total = filteredHospitals.length;
        const text = currentLang === 'ar' 
            ? `عثر على ${total} مستشفى` 
            : `${total} hospitals found`;
        countElement.textContent = text;
    }
}

// Setup pagination event listeners
function setupPaginationEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.pagination-btn') && !e.target.closest('.pagination-btn').classList.contains('disabled')) {
            const page = parseInt(e.target.closest('.pagination-btn').getAttribute('data-page'));
            if (page) {
                currentPage = page;
                renderHospitals();
                updatePagination();
            }
        }
    });
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
        return;
    }
    
    paginationContainer.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>`;
    } else {
        paginationHTML += `<button class="pagination-btn disabled">
            <i class="fas fa-chevron-left"></i>
        </button>`;
    }
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="pagination-btn active" data-page="${i}">${i}</button>`;
        } else {
            paginationHTML += `<button class="pagination-btn" data-page="${i}">${i}</button>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" data-page="${currentPage + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>`;
    } else {
        paginationHTML += `<button class="pagination-btn disabled">
            <i class="fas fa-chevron-right"></i>
        </button>`;
    }
    
    // Page info
    const startItem = (currentPage - 1) * hospitalsPerPage + 1;
    const endItem = Math.min(currentPage * hospitalsPerPage, filteredHospitals.length);
    const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
    const pageInfo = currentLang === 'ar' 
        ? `عرض ${startItem}-${endItem} من ${filteredHospitals.length}`
        : `Showing ${startItem}-${endItem} of ${filteredHospitals.length}`;
    
    paginationHTML += `<div class="pagination-info">${pageInfo}</div>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Initialize hospital map
function initializeHospitalMap() {
    const mapElement = document.getElementById('hospitalsMap');
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }
    
    // Check if map already exists and remove it
    if (hospitalMap) {
        hospitalMap.remove();
        hospitalMarkers = [];
    }
    
    try {
        hospitalMap = L.map('hospitalsMap').setView([30.0444, 31.2357], 10);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(hospitalMap);
        
        // Add user location to map if available
        if (userLocation) {
            addUserLocationToMap();
        }
        
        console.log('Hospital map initialized successfully');
        updateHospitalMap();
    } catch (error) {
        console.error('Error initializing hospital map:', error);
    }
}

// Add user location to map
function addUserLocationToMap() {
    if (!hospitalMap || !userLocation) return;
    
    // Remove existing user marker and circle
    if (userMarker) {
        hospitalMap.removeLayer(userMarker);
    }
    if (locationCircle) {
        hospitalMap.removeLayer(locationCircle);
    }
    
    // Add user location marker
    userMarker = L.marker([userLocation.lat, userLocation.lng])
        .addTo(hospitalMap)
        .bindPopup('Your Location')
        .openPopup();
    
    // Add circle around user location (50km radius)
    locationCircle = L.circle([userLocation.lat, userLocation.lng], {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.1,
        radius: 50000 // 50km in meters
    }).addTo(hospitalMap);
    
    // Adjust map bounds to show user location and hospitals
    const bounds = L.latLngBounds([[userLocation.lat, userLocation.lng]]);
    hospitalMarkers.forEach(marker => bounds.extend(marker.getLatLng()));
    hospitalMap.fitBounds(bounds, { padding: [20, 20] });
}

// Update hospital map markers
function updateHospitalMap() {
    if (!hospitalMap) return;
    
    // Clear existing markers
    hospitalMarkers.forEach(marker => hospitalMap.removeLayer(marker));
    hospitalMarkers = [];
    
    // Add markers for filtered hospitals
    filteredHospitals.forEach(hospital => {
        const markerColor = getMarkerColor(hospital.type);
        const markerIcon = L.divIcon({
            className: 'hospital-marker',
            html: `<div class="marker-pin" style="background-color: ${markerColor};">
                     <i class="fas fa-hospital"></i>
                   </div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const marker = L.marker(hospital.coordinates, { icon: markerIcon })
            .addTo(hospitalMap)
            .bindPopup(`
                <div class="hospital-popup">
                    <h3>${hospital.name}</h3>
                    <div class="popup-rating">
                        <i class="fas fa-star"></i>
                        <span>${hospital.rating} (${hospital.reviews} reviews)</span>
                    </div>
                    <div class="popup-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hospital.location}</span>
                    </div>
                    <div class="popup-actions">
                        <button class="popup-btn primary" onclick="viewHospitalDetails(${hospital.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="popup-btn secondary" onclick="getDirections(${hospital.id})">
                            <i class="fas fa-directions"></i> Directions
                        </button>
                    </div>
                </div>
            `);
        
        hospitalMarkers.push(marker);
    });
    
    // Adjust map bounds if there are hospitals
    if (hospitalMarkers.length > 0) {
        const group = new L.featureGroup(hospitalMarkers);
        hospitalMap.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
}

// Get marker color based on hospital type
function getMarkerColor(type) {
    switch (type) {
        case 'general': return '#3B82F6';
        case 'private': return '#10B981';
        case 'specialty': return '#8B5CF6';
        case 'university': return '#F59E0B';
        case 'community': return '#EF4444';
        default: return '#6B7280';
    }
}

// Focus on specific hospital on map
function focusOnHospital(hospitalId) {
    if (!hospitalMap) {
        console.error('Hospital map not initialized');
        return;
    }
    
    const hospital = filteredHospitals.find(h => h.id == hospitalId);
    if (!hospital) {
        console.error('Hospital not found with ID:', hospitalId);
        return;
    }
    
    // Set view to hospital coordinates with zoom level 15
    hospitalMap.setView(hospital.coordinates, 15);
    
    // Find and open the marker for this hospital
    let markerFound = false;
    hospitalMarkers.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        const hospitalLat = hospital.coordinates[0];
        const hospitalLng = hospital.coordinates[1];
        
        // Compare coordinates with small tolerance for floating point precision
        if (Math.abs(markerLatLng.lat - hospitalLat) < 0.0001 && 
            Math.abs(markerLatLng.lng - hospitalLng) < 0.0001) {
            marker.openPopup();
            markerFound = true;
        }
    });
    
    if (!markerFound) {
        console.warn('No marker found for hospital at coordinates:', hospital.coordinates);
    }
}

// View hospital details
function viewHospitalDetails(hospitalId) {
    window.location.href = `hospital-details.html?id=${hospitalId}`;
}

// Get directions to hospital
function getDirections(hospitalId) {
    const hospital = hospitals.find(h => h.id === hospitalId);
    if (!hospital) return;
    
    if (!userLocation) {
        showToast('Location access required for directions', 'error');
        return;
    }
    
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${hospital.coordinates[0]},${hospital.coordinates[1]}`;
    window.open(url, '_blank');
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved view preference
    const savedView = localStorage.getItem('currentHospitalView') || 'grid';
    currentView = savedView;

    // Remove active class from all view buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    
    // Set active view button
    const viewButton = document.querySelector(`[data-view="${savedView}"]`);
    if (viewButton) {
        viewButton.classList.add('active');
    }
    
    initializeHospitalsPage();
    switchView(currentView);
    
    // Update range filter progress on load
    const distanceFilter = document.getElementById('distanceFilter');
    if (distanceFilter) {
        updateRangeProgress(distanceFilter);
    }
});