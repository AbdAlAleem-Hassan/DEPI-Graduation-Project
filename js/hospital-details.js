// hospital-details.js - Enhanced Version with File Upload and Styling
document.addEventListener('DOMContentLoaded', function() {
    initializeHospitalDetails();
    initializeTabs();
    initializeReviewModal();
    
    // Load saved tab from session storage
    loadSavedTab();
});

function initializeHospitalDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    
    // Enhanced hospital data with multiple locations and detailed information
    const hospitals = {
        1: {
            id: 1,
            name: "Al-Salam International Hospital",
            nameAr: "مستشفى السلام الدولي",
            location: "Cairo, Egypt",
            locationAr: "القاهرة، مصر",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            address: "123 Medical Street, Cairo, Egypt",
            phone: "+1 234 567 8900",
            hours: "24/7 Available",
            departments: "25 Departments",
            description: "Al-Salam International Hospital is a leading healthcare institution providing comprehensive medical services with state-of-the-art facilities. We are committed to delivering exceptional patient care through our team of highly qualified medical professionals and advanced medical technology. Our hospital features specialized departments, modern diagnostic equipment, and a patient-centric approach to healthcare.",
            email: "info@alsalam-hospital.com",
            website: "www.alsalam-hospital.com",
            emergency: "+1 234 567 8910",
            available24: true,
            
            // Multiple locations
            locations: [
                {
                    id: 1,
                    name: "Al-Salam International Hospital - Main Branch",
                    nameAr: "مستشفى السلام الدولي - الفرع الرئيسي",
                    address: "123 Medical Street, Cairo, Egypt",
                    coordinates: [30.0444, 31.2357],
                    phone: "+1 234 567 8900"
                },
                {
                    id: 2,
                    name: "Al-Salam International Hospital - New Cairo",
                    nameAr: "مستشفى السلام الدولي - القاهرة الجديدة",
                    address: "456 Healthcare Avenue, New Cairo, Egypt",
                    coordinates: [30.0131, 31.2089],
                    phone: "+1 234 567 8901"
                }
            ],
            
            // Services
            services: [
                {
                    id: 1,
                    name: "Emergency Care",
                    nameAr: "الرعاية الطارئة",
                    description: "24/7 emergency medical services with trauma center"
                },
                {
                    id: 2,
                    name: "Cardiology",
                    nameAr: "أمراض القلب",
                    description: "Comprehensive heart care and cardiac surgery"
                },
                {
                    id: 3,
                    name: "Neurology",
                    nameAr: "علم الأعصاب",
                    description: "Expert care for brain and nervous system disorders"
                },
                {
                    id: 4,
                    name: "Orthopedics",
                    nameAr: "جراحة العظام",
                    description: "Bone and joint treatment specialists"
                },
                {
                    id: 5,
                    name: "Pediatrics",
                    nameAr: "طب الأطفال",
                    description: "Specialized care for children"
                },
                {
                    id: 6,
                    name: "Oncology",
                    nameAr: "علم الأورام",
                    description: "Cancer diagnosis and treatment"
                }
            ],
            
            // Departments
            departments: [
                {
                    id: 1,
                    name: "Cardiology Department",
                    nameAr: "قسم أمراض القلب",
                    description: "Comprehensive cardiac care with advanced diagnostic and treatment facilities",
                    headDoctor: "Dr. Ahmed Hassan",
                    headDoctorAr: "د. أحمد حسن"
                },
                {
                    id: 2,
                    name: "Neurology Department",
                    nameAr: "قسم الأعصاب",
                    description: "Specialized care for neurological disorders and brain conditions",
                    headDoctor: "Dr. Sarah Mohamed",
                    headDoctorAr: "د. سارة محمد"
                },
                {
                    id: 3,
                    name: "Orthopedics Department",
                    nameAr: "قسم العظام",
                    description: "Advanced bone and joint treatments with surgical expertise",
                    headDoctor: "Dr. Omar Khalid",
                    headDoctorAr: "د. عمر خالد"
                }
            ],
            
            // Facilities
            facilities: [
                "24/7 Emergency Room",
                "ICU & CCU",
                "Advanced Imaging Center",
                "Modern Operation Theaters",
                "Pharmacy",
                "Laboratory Services",
                "Physical Therapy",
                "Cafeteria",
                "Prayer Room",
                "Parking Facility"
            ],
            
            // Doctors
            doctors: [
                {
                    id: 1,
                    name: "Dr. Ahmed Hassan",
                    nameAr: "د. أحمد حسن",
                    specialty: "Cardiologist",
                    specialtyAr: "أمراض القلب",
                    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    rating: 4.9,
                    experience: "15+ years",
                    availability: "Available Today"
                },
                {
                    id: 2,
                    name: "Dr. Sarah Mohamed",
                    nameAr: "د. سارة محمد",
                    specialty: "Neurologist",
                    specialtyAr: "الأعصاب",
                    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    rating: 4.8,
                    experience: "12+ years",
                    availability: "Available Tomorrow"
                },
                {
                    id: 3,
                    name: "Dr. Omar Khalid",
                    nameAr: "د. عمر خالد",
                    specialty: "Orthopedic Surgeon",
                    specialtyAr: "جراحة العظام",
                    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    rating: 4.7,
                    experience: "18+ years",
                    availability: "Available Today"
                }
            ],
            
            // Reviews
            reviews: [
                {
                    id: 1,
                    patientName: "Mohamed Ali",
                    patientNameAr: "محمد علي",
                    rating: 5,
                    date: "2024-01-15",
                    content: "Excellent hospital with caring staff and modern facilities. The doctors were very professional and explained everything clearly.",
                    contentAr: "مستشفى ممتاز بطاقم رعاية ومرافق حديثة. الأطباء كانوا محترفين جدًا وشرحوا كل شيء بوضوح.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                    id: 2,
                    patientName: "Fatima Hassan",
                    patientNameAr: "فاطمة حسن",
                    rating: 4,
                    date: "2024-01-10",
                    content: "Good hospital with modern equipment. The waiting time was reasonable and the staff was helpful.",
                    contentAr: "مستشفى جيد بمعدات حديثة. وقت الانتظار كان معقولاً والموظفين كانوا مفيدين.",
                    image: "https://randomuser.me/api/portraits/women/32.jpg"
                },
                {
                    id: 3,
                    patientName: "Ahmed Samir",
                    patientNameAr: "أحمد سمير",
                    rating: 5,
                    date: "2024-01-08",
                    content: "Outstanding medical care. The hospital is clean, organized, and the medical team is highly skilled.",
                    contentAr: "رعاية طبية متميزة. المستشفى نظيف ومنظم والفريق الطبي ماهر للغاية.",
                    image: "https://randomuser.me/api/portraits/men/25.jpg"
                }
            ]
        }
    };
    
    // Redirect if hospital not found
    if (!hospitalId || !hospitals[hospitalId]) {
        window.location.href = 'notFound.html';
        return;
    }
    
    const hospital = hospitals[hospitalId];
    
    // Update page content
    updateHospitalUI(hospital);
    
    // Initialize components
    initializeServicesDepartments(hospital);
    initializeFacilities(hospital);
    initializeDoctors(hospital);
    initializeServices(hospital);
    initializeDepartments(hospital);
    initializeLocations(hospital);
    initializeReviews(hospital);
    
    // Store hospital data
    window.currentHospital = hospital;
    
    // Initialize event listeners for quick actions
    initializeQuickActions(hospital);
}

function updateHospitalUI(hospital) {
    document.getElementById('hospitalName').textContent = hospital.name;
    document.getElementById('hospitalLocation').textContent = hospital.location;
    document.getElementById('hospitalDetailImage').src = hospital.image;
    document.getElementById('hospitalDetailImage').alt = hospital.name;
    document.getElementById('hospitalDetailRating').textContent = hospital.rating;
    document.getElementById('hospitalDetailAddress').textContent = hospital.address;
    document.getElementById('hospitalDetailPhone').textContent = hospital.phone;
    document.getElementById('hospitalDetailHours').textContent = hospital.hours;
    document.getElementById('hospitalDetailDepartments').innerHTML = hospital.departments.length > 1 ? hospital.departments.length + " Departments" : hospital.departments.length + " Department";
    document.getElementById('hospitalDetailDescription').textContent = hospital.description;
    document.getElementById('hospitalEmail').textContent = hospital.email;
    document.getElementById('hospitalWebsite').textContent = hospital.website;
    document.getElementById('hospitalEmergency').textContent = `Emergency: ${hospital.emergency}`;
    


    // Update availability badge
    const availabilityBadge = document.getElementById('availabilityBadge');
    if (hospital.available24) {
        availabilityBadge.innerHTML = '<i class="fas fa-circle"></i><span data-en="24/7 Available" data-ar="متاح 24/7">24/7 Available</span>';
        availabilityBadge.classList.remove('offline');
    } else {
        availabilityBadge.innerHTML = '<i class="fas fa-circle"></i><span data-en="Limited Hours" data-ar="ساعات محدودة">Limited Hours</span>';
        availabilityBadge.classList.add('offline');
    }
}

function initializeServicesDepartments(hospital) {
    const container = document.getElementById('hospitalServicesDepartments');
    
    let html = `
        <div class="services-list">
            <h4 data-en="Services" data-ar="الخدمات">Services</h4>
            ${hospital.services.slice(0, 5).map(service => `
                <div class="service-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${service.name}</span>
                </div>
            `).join('')}
            ${hospital.services.length > 5 ? `
                <div class="service-item">
                    <i class="fas fa-plus"></i>
                    <span data-en="+${hospital.services.length - 5} more services" data-ar="+${hospital.services.length - 5} خدمات أخرى">+${hospital.services.length - 5} more services</span>
                </div>
            ` : ''}
        </div>
        <div class="departments-list">
            <h4 data-en="Departments" data-ar="الأقسام">Departments</h4>
            ${hospital.departments.slice(0, 5).map(dept => `
                <div class="department-item">
                    <i class="fas fa-building"></i>
                    <span>${dept.name}</span>
                </div>
            `).join('')}
            ${hospital.departments.length > 5 ? `
                <div class="department-item">
                    <i class="fas fa-plus"></i>
                    <span data-en="+${hospital.departments.length - 5} more departments" data-ar="+${hospital.departments.length - 5} أقسام أخرى">+${hospital.departments.length - 5} more departments</span>
                </div>
            ` : ''}
        </div>
    `;
    
    container.innerHTML = html;
}

function initializeFacilities(hospital) {
    const container = document.getElementById('hospitalFacilities');
    
    let html = hospital.facilities.map(facility => `
        <div class="facility-item">
            <i class="fas fa-check"></i>
            <span>${facility}</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function initializeQuickActions(hospital) {
    // View All Doctors
    document.getElementById('viewAllDoctorsBtn').addEventListener('click', function() {
        document.querySelector('[data-tab="doctors"]').click();
        showToast('Now showing all doctors at this hospital', 'info');
    });
    
    // Get Directions
    document.getElementById('getDirectionsBtn').addEventListener('click', function() {
        document.querySelector('[data-tab="locations"]').click();
        showToast('Please select a location for directions', 'info');
    });
    
    // Book Appointment
    document.getElementById('bookAppointmentBtn').addEventListener('click', function() {
        showToast('Opening appointment booking...', 'info');
        // In real app, redirect to booking page
        // window.location.href = 'booking.html?hospital=' + hospital.id;
    });
    
    // Contact Hospital
    document.getElementById('contactHospitalBtn').addEventListener('click', function() {
        if (hospital.phone) {
            // Simulate call/message options
            if (confirm('Would you like to call or message the hospital?')) {
                window.open(`tel:${hospital.phone}`);
            }
        }
    });
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Save active tab to session storage
            sessionStorage.setItem('activeTab', tabId);
            
            // Load tab content if needed
            loadTabContent(tabId);
        });
    });
    
    // Load initial tab content
    loadTabContent('doctors');
}

function loadSavedTab() {
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
        const tabBtn = document.querySelector(`[data-tab="${savedTab}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
    }
}

function loadTabContent(tabId) {
    switch(tabId) {
        case 'doctors':
            // Doctors are already initialized
            break;
        case 'services':
            // Services are already initialized
            break;
        case 'departments':
            // Departments are already initialized
            break;
        case 'locations':
            initializeMap();
            break;
        case 'reviews':
            // Reviews are already initialized
            break;
    }
}

function initializeDoctors(hospital) {
    const doctorsGrid = document.getElementById('doctorsGrid');
    
    if (!hospital.doctors || hospital.doctors.length === 0) {
        doctorsGrid.style.display = 'grid';
        doctorsGrid.style.gridTemplateColumns = '1fr';
        doctorsGrid.innerHTML = `<div class="no-results">
                                    <i class="fas fa-user-md"></i>
                                    <h3 data-en="No doctors available" data-ar="لا توجد أطباء متاحين">No doctors available</h3>
                                    <p data-en="Try adjusting your search criteria" data-ar="حاول تعديل معايير البحث">Try adjusting your search criteria</p>
                                </div>`;
        return;
    } else {
        doctorsGrid.style.display = 'grid';
        doctorsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
    
    let doctorsHTML = '';
    
    hospital.doctors.forEach(doctor => {
        doctorsHTML += `
            <div class="doctor-card" data-doctor-id="${doctor.id}">
                <div class="doctor-header">
                    <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
                    <div class="doctor-info">
                        <h4>${doctor.name}</h4>
                        <div class="doctor-specialty">${doctor.specialty}</div>
                    </div>
                </div>
                <div class="doctor-rating">
                    <i class="fas fa-star"></i>
                    <span>${doctor.rating}</span>
                    <span>•</span>
                    <span>${doctor.experience}</span>
                </div>
                <div class="doctor-availability">
                    <span class="availability-badge-small ${doctor.availability.includes('Today') ? '' : 'offline'}">
                        <i class="fas fa-circle"></i>
                        ${doctor.availability}
                    </span>
                </div>
                <div class="doctor-actions">
                    <button class="doctor-action-btn view-profile" data-doctor-id="${doctor.id}">
                        <span data-en="View Profile" data-ar="عرض الملف">View Profile</span>
                    </button>
                    <button class="doctor-action-btn secondary book-appointment" data-doctor-id="${doctor.id}">
                        <span data-en="Book" data-ar="حجز">Book</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    doctorsGrid.innerHTML = doctorsHTML;
    
    // Add event listeners for doctor actions
    document.querySelectorAll('.view-profile').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = this.getAttribute('data-doctor-id');
            window.location.href = `doctor-details.html?id=${doctorId}`;
        });
    });
    
    document.querySelectorAll('.book-appointment').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = this.getAttribute('data-doctor-id');
            showToast('Opening appointment booking...', 'info');
            // In real app, redirect to booking page
            // window.location.href = 'booking.html?doctor=' + doctorId;
        });
    });
    
    // Initialize search and filters
    initializeDoctorsFilters(hospital);
}

function initializeDoctorsFilters(hospital) {
    const searchInput = document.getElementById('doctorSearch');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    const selectedFilters = document.getElementById('selectedFilters');
    
    // Populate specialty filter
    const specialties = [...new Set(hospital.doctors.map(doctor => doctor.specialty))];
    specialties.forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        specialtyFilter.appendChild(option);
    });
    
    // Add event listeners for filters
    searchInput.addEventListener('input', filterDoctors);
    specialtyFilter.addEventListener('change', filterDoctors);
    availabilityFilter.addEventListener('change', filterDoctors);
    
    function updateSelectedFilters() {
        selectedFilters.innerHTML = '';
        
        if (specialtyFilter.value) {
            const tag = document.createElement('div');
            tag.className = 'filter-tag';
            tag.innerHTML = `
                <span>Specialty: ${specialtyFilter.options[specialtyFilter.selectedIndex].text}</span>
                <button class="remove-filter" data-filter="specialty">
                    <i class="fas fa-times"></i>
                </button>
            `;
            selectedFilters.appendChild(tag);
        }
        
        if (availabilityFilter.value) {
            const tag = document.createElement('div');
            tag.className = 'filter-tag';
            tag.innerHTML = `
                <span>Availability: ${availabilityFilter.options[availabilityFilter.selectedIndex].text}</span>
                <button class="remove-filter" data-filter="availability">
                    <i class="fas fa-times"></i>
                </button>
            `;
            selectedFilters.appendChild(tag);
        }
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                if (filterType === 'specialty') {
                    specialtyFilter.value = '';
                } else if (filterType === 'availability') {
                    availabilityFilter.value = '';
                }
                filterDoctors();
            });
        });
    }
    
    function filterDoctors() {
        const searchTerm = document.getElementById('doctorSearch').value.toLowerCase();
        const specialtyFilterValue = document.getElementById('specialtyFilter').value;
        const availabilityFilterValue = document.getElementById('availabilityFilter').value;
        
        const hospital = window.currentHospital;
        const doctorsGrid = document.getElementById('doctorsGrid');
        
        let filteredDoctors = hospital.doctors.filter(doctor => {
            const matchesSearch = !searchTerm || 
                doctor.name.toLowerCase().includes(searchTerm) ||
                doctor.specialty.toLowerCase().includes(searchTerm);
            
            const matchesSpecialty = !specialtyFilterValue || doctor.specialty === specialtyFilterValue;
            
            const matchesAvailability = !availabilityFilterValue || 
                (availabilityFilterValue === 'available' && doctor.availability === 'Available Today') ||
                (availabilityFilterValue === 'today' && doctor.availability.includes('Today'));
            
            return matchesSearch && matchesSpecialty && matchesAvailability;
        });
        
        if (filteredDoctors.length === 0) {
            doctorsGrid.style.display = 'grid';
            doctorsGrid.style.gridTemplateColumns = '1fr';
            doctorsGrid.innerHTML = `<div class="no-results">
                                        <i class="fas fa-user-md"></i>
                                        <h3 data-en="No doctors available" data-ar="لا توجد أطباء متاحين">No doctors available</h3>
                                        <p data-en="Try adjusting your search criteria" data-ar="حاول تعديل معايير البحث">Try adjusting your search criteria</p>
                                    </div>`;
            return;
        } else {
            doctorsGrid.style.display = 'grid';
            doctorsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
        
        let doctorsHTML = '';
        
        filteredDoctors.forEach(doctor => {
            doctorsHTML += `
                <div class="doctor-card" data-doctor-id="${doctor.id}">
                    <div class="doctor-header">
                        <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
                        <div class="doctor-info">
                            <h4>${doctor.name}</h4>
                            <div class="doctor-specialty">${doctor.specialty}</div>
                        </div>
                    </div>
                    <div class="doctor-rating">
                        <i class="fas fa-star"></i>
                        <span>${doctor.rating}</span>
                        <span>•</span>
                        <span>${doctor.experience}</span>
                    </div>
                    <div class="doctor-availability">
                        <span class="availability-badge-small ${doctor.availability.includes('Today') ? '' : 'offline'}">
                            <i class="fas fa-circle"></i>
                            ${doctor.availability}
                        </span>
                    </div>
                    <div class="doctor-actions">
                        <button class="doctor-action-btn view-profile" data-doctor-id="${doctor.id}">
                            <span data-en="View Profile" data-ar="عرض الملف">View Profile</span>
                        </button>
                        <button class="doctor-action-btn secondary book-appointment" data-doctor-id="${doctor.id}">
                            <span data-en="Book" data-ar="حجز">Book</span>
                        </button>
                    </div>
                </div>
            `;
        });
        
        doctorsGrid.innerHTML = doctorsHTML;
        
        // Re-add event listeners
        document.querySelectorAll('.view-profile').forEach(btn => {
            btn.addEventListener('click', function() {
                const doctorId = this.getAttribute('data-doctor-id');
                window.location.href = `doctor-details.html?id=${doctorId}`;
            });
        });
        
        document.querySelectorAll('.book-appointment').forEach(btn => {
            btn.addEventListener('click', function() {
                const doctorId = this.getAttribute('data-doctor-id');
                showToast('Opening appointment booking...', 'info');
            });
        });
        
        // Update selected filters display
        updateSelectedFilters();
    }
    
    // Initialize selected filters display
    updateSelectedFilters();
}

function initializeServices(hospital) {
    const servicesGrid = document.getElementById('hospitalServicesGrid');
    
    if (!hospital.services || hospital.services.length === 0) {
        servicesGrid.innerHTML = '<div class="no-results"><i class="fas fa-cogs"></i><h3 data-en="No services available" data-ar="لا توجد خدمات متاحة">No services available</h3><p data-en="Check back later for updates" data-ar="ارجع لاحقًا للتحديثات">Check back later for updates</p></div>';
        return;
    }
    
    let servicesHTML = '';
    
    hospital.services.forEach(service => {
        servicesHTML += `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-title">
                    <i class="fas fa-stethoscope"></i>
                    <h4>${service.name}</h4>
                </div>
                <p class="service-description">${service.description}</p>
                <button class="service-book-btn" data-service-id="${service.id}">
                    <i class="fas fa-search"></i>
                    <span data-en="Find Doctors" data-ar="ابحث عن أطباء">Find Doctors</span>
                </button>
            </div>
        `;
    });
    
    servicesGrid.innerHTML = servicesHTML;
    
    // Add event listeners for service booking
    document.querySelectorAll('.service-book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const service = hospital.services.find(s => s.id == serviceId);
            
            // Switch to doctors tab and filter by service
            document.querySelector('[data-tab="doctors"]').click();
            document.getElementById('specialtyFilter').value = service.name;
            filterDoctors();
            
            showToast(`Now showing doctors for ${service.name}`, 'info');
        });
    });
}

function initializeDepartments(hospital) {
    const departmentsGrid = document.getElementById('departmentsGrid');
    
    if (!hospital.departments || hospital.departments.length === 0) {
        departmentsGrid.innerHTML = '<div class="no-results"><i class="fas fa-building"></i><h3 data-en="No departments available" data-ar="لا توجد أقسام متاحة">No departments available</h3><p data-en="Check back later for updates" data-ar="ارجع لاحقًا للتحديثات">Check back later for updates</p></div>';
        return;
    }
    
    let departmentsHTML = '';
    
    hospital.departments.forEach(department => {
        departmentsHTML += `
            <div class="department-card" data-department-id="${department.id}">
                <div class="department-header">
                    <div class="department-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="department-info">
                        <h4>${department.name}</h4>
                        <div class="department-head">Head: ${department.headDoctor}</div>
                    </div>
                </div>
                <p class="department-description">${department.description}</p>
                <button class="service-book-btn" data-department-id="${department.id}">
                    <i class="fas fa-search"></i>
                    <span data-en="Find Doctors" data-ar="ابحث عن أطباء">Find Doctors</span>
                </button>
            </div>
        `;
    });
    
    departmentsGrid.innerHTML = departmentsHTML;
    
    // Add event listeners for department actions
    document.querySelectorAll('.service-book-btn[data-department-id]').forEach(btn => {
        btn.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-department-id');
            const department = hospital.departments.find(d => d.id == departmentId);
            
            // Switch to doctors tab
            document.querySelector('[data-tab="doctors"]').click();
            
            showToast(`Now showing doctors from ${department.name}`, 'info');
        });
    });
}

function initializeLocations(hospital) {
    const locationsList = document.getElementById('hospitalLocationsList');
    
    if (!hospital.locations || hospital.locations.length === 0) {
        locationsList.innerHTML = '<div class="no-results"><i class="fas fa-map-marker-alt"></i><h3 data-en="No locations available" data-ar="لا توجد مواقع متاحة">No locations available</h3><p data-en="Check back later for updates" data-ar="ارجع لاحقًا للتحديثات">Check back later for updates</p></div>';
        return;
    }
    
    let locationsHTML = '<div class="locations-grid">';
    
    hospital.locations.forEach(location => {
        locationsHTML += `
            <div class="location-card" data-location-id="${location.id}">
                <h4>${location.name}</h4>
                <p class="location-address"><i class="fas fa-map-marker-alt"></i>${location.address}</p>
                <p class="location-phone"><i class="fas fa-phone"></i>${location.phone}</p>
                <div class="location-actions">
                    <button class="btn secondary focus-on-map" data-location-id="${location.id}">
                        <i class="fas fa-map-marker-alt"></i>
                        <span data-en="View on Map" data-ar="عرض على الخريطة">View on Map</span>
                    </button>
                    <button class="btn primary get-directions" data-location-id="${location.id}">
                        <i class="fas fa-directions"></i>
                        <span data-en="Get Directions" data-ar="احصل على الاتجاهات">Get Directions</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    locationsHTML += '</div>';
    locationsList.innerHTML = locationsHTML;
    
    // Add event listeners for location actions
    document.querySelectorAll('.focus-on-map').forEach(btn => {
        btn.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location-id');
            focusOnLocation(locationId);
        });
    });
    
    document.querySelectorAll('.get-directions').forEach(btn => {
        btn.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location-id');
            getDirectionsToLocation(locationId);
        });
    });
}

function initializeMap() {
    if (!window.currentHospital || !window.currentHospital.locations) return;
    
    const mapContainer = document.getElementById('hospitalDetailMap');
    if (!mapContainer) return;
    
    // Initialize map with first location
    const firstLocation = window.currentHospital.locations[0];
    const map = L.map('hospitalDetailMap').setView(firstLocation.coordinates, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add marker for each location
    window.currentHospital.locations.forEach(location => {
        const marker = L.marker(location.coordinates)
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${location.name}</h4>
                    <p>${location.address}</p>
                    <p>${location.phone}</p>
                    <button onclick="getDirectionsToLocation(${location.id})" class="btn primary">
                        <i class="fas fa-directions"></i>
                        <span data-en="Get Directions" data-ar="احصل على الاتجاهات">Get Directions</span>
                    </button>
                </div>
            `);
        
        // Store marker reference
        marker.locationId = location.id;
    });
    
    // Store map reference
    window.hospitalMap = map;
}

function focusOnLocation(locationId) {
    const location = window.currentHospital.locations.find(loc => loc.id == locationId);
    if (!location || !window.hospitalMap) return;
    
    window.hospitalMap.setView(location.coordinates, 15);
    
    // Open popup for this location
    window.hospitalMap.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.locationId == locationId) {
            layer.openPopup();
        }
    });
}

function getDirectionsToLocation(locationId) {
    const location = window.currentHospital.locations.find(loc => loc.id == locationId);
    if (!location) return;
    
    const [lat, lng] = location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

function initializeReviews(hospital) {
    if (!hospital || !hospital.reviews) {
        console.error('Hospital or reviews not found');
        const reviewsList = document.getElementById('hospitalReviewsList');
        const overallRating = document.getElementById('hospitalOverallRating');
        const totalReviews = document.getElementById('hospitalTotalReviews');
        
        reviewsList.innerHTML = '<div class="no-results"><i class="fas fa-star"></i><h3 data-en="No reviews available" data-ar="لا توجد تقييمات متاحة">No reviews available</h3><p data-en="Be the first to review this hospital" data-ar="كن أول من يقيم هذا المستشفى">Be the first to review this hospital</p></div>';
        overallRating.textContent = '0.0';
        totalReviews.textContent = '(0 reviews)';
        return;
    }
    
    const reviewsList = document.getElementById('hospitalReviewsList');
    const overallRating = document.getElementById('hospitalOverallRating');
    const totalReviews = document.getElementById('hospitalTotalReviews');
    
    if (hospital.reviews.length === 0) {
        reviewsList.innerHTML = '<div class="no-results"><i class="fas fa-star"></i><h3 data-en="No reviews yet" data-ar="لا توجد تقييمات بعد">No reviews yet</h3><p data-en="Be the first to review this hospital" data-ar="كن أول من يقيم هذا المستشفى">Be the first to review this hospital</p></div>';
        overallRating.textContent = '0.0';
        totalReviews.textContent = '(0 reviews)';
        return;
    }
    
    // Calculate average rating
    const averageRating = hospital.reviews.reduce((sum, review) => sum + review.rating, 0) / hospital.reviews.length;
    overallRating.textContent = averageRating.toFixed(1);
    totalReviews.textContent = `(${hospital.reviews.length} reviews)`;
    
    // Update rating stars
    updateRatingStars(averageRating);
    
    // Load reviews
    loadReviewsList(hospital.reviews);
    
    // Add sort functionality
    document.getElementById('reviewSort').addEventListener('change', function() {
        const sortedReviews = sortReviews(hospital.reviews, this.value);
        loadReviewsList(sortedReviews);
    });
}

function updateRatingStars(rating) {
    const starsContainer = document.querySelector('.rating-stars');
    if (!starsContainer) return;
    
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    starsContainer.innerHTML = starsHTML;
}

function sortReviews(reviews, sortBy) {
    const sorted = [...reviews];
    
    switch(sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest':
            return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'highest':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'lowest':
            return sorted.sort((a, b) => a.rating - b.rating);
        default:
            return sorted;
    }
}

function loadReviewsList(reviews) {
    const reviewsList = document.getElementById('hospitalReviewsList');
    
    let reviewsHTML = '';
    
    reviews.forEach(review => {
        const reviewDate = new Date(review.date).toLocaleDateString();
        const stars = Array(5).fill(0).map((_, i) => 
            `<i class="${i < review.rating ? 'fas ' : 'far '}fa-star"></i>`
        ).join('');
        
        reviewsHTML += `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            ${review.image?`<img src="${review.image}" alt="${review.patientName}">`:`<i class="fas fa-user"></i>`}
                        </div>
                        <div class="reviewer-details">
                            <h5>${review.patientName}</h5>
                            <div class="review-date">
                                <i class="far fa-calendar-alt"></i>${reviewDate}
                            </div>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${stars}
                    </div>
                </div>
                <div class="review-content">
                    ${review.content}
                </div>
            </div>
        `;
    });
    
    reviewsList.innerHTML = reviewsHTML;
}

// File Upload Preview Functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('reviewMedia');
    const uploadPreview = document.createElement('div');
    uploadPreview.className = 'upload-preview';
    uploadPreview.innerHTML = `
        <h5 data-en="Selected Files" data-ar="الملفات المحددة">Selected Files</h5>
        <div class="preview-items" id="previewItems"></div>
    `;
    
    fileInput.parentNode.insertBefore(uploadPreview, fileInput.nextSibling);
    
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        const previewItems = document.getElementById('previewItems');
        previewItems.innerHTML = '';
        
        if (files.length > 0) {
            uploadPreview.classList.add('active');
            
            Array.from(files).forEach((file, index) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="${file.name}">
                            <button type="button" class="remove-preview" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewItem.innerHTML = `
                            <video src="${e.target.result}" muted></video>
                            <button type="button" class="remove-preview" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                    };
                    reader.readAsDataURL(file);
                } else {
                    previewItem.innerHTML = `
                        <div class="file-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <button type="button" class="remove-preview" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                }
                
                previewItems.appendChild(previewItem);
            });
            
            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-preview').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeFile(index);
                });
            });
        } else {
            uploadPreview.classList.remove('active');
        }
    });
    
    // Update file input placeholder based on language
    updateFileInputPlaceholder();
}

function removeFile(index) {
    const fileInput = document.getElementById('reviewMedia');
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);
    
    files.splice(index, 1);
    
    files.forEach(file => {
        dt.items.add(file);
    });
    
    fileInput.files = dt.files;
    
    // Trigger change event to update preview
    const event = new Event('change');
    fileInput.dispatchEvent(event);
}

function updateFileInputPlaceholder() {
    const fileInput = document.getElementById('reviewMedia');
    const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
    
    if (currentLang === 'ar') {
        fileInput.setAttribute('data-en', 'Choose files or drag and drop');
        fileInput.setAttribute('data-ar', 'اختر الملفات أو اسحب وأفلت');
    } else {
        fileInput.setAttribute('data-en', 'Choose files or drag and drop');
        fileInput.setAttribute('data-ar', 'اختر الملفات أو اسحب وأفلت');
    }
}

function initializeReviewModal() {
    const modal = document.getElementById('reviewModal');
    const openBtn = document.getElementById('addHospitalReviewBtn');
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.btn.secondary');
    const form = document.getElementById('reviewForm');
    
    // Rating stars
    const stars = modal.querySelectorAll('.rating-input i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            updateRatingStarsModal(stars, selectedRating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateRatingStarsModal(stars, rating, true);
        });
    });
    
    modal.querySelector('.rating-input').addEventListener('mouseleave', function() {
        updateRatingStarsModal(stars, selectedRating);
    });
    
    // Modal controls
    openBtn.addEventListener('click', openReviewModal);
    closeBtn.addEventListener('click', closeReviewModal);
    cancelBtn.addEventListener('click', closeReviewModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeReviewModal();
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitReview(selectedRating);
    });
    
    // Initialize file upload
    initializeFileUpload();
}

function updateRatingStarsModal(stars, rating, isHover = false) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = isHover ? 'fas fa-star hover' : 'fas fa-star';
        } else {
            star.className = isHover ? 'far fa-star hover' : 'far fa-star';
        }
    });
}

function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('reviewForm').reset();
    
    // Reset rating
    const stars = modal.querySelectorAll('.rating-input i');
    updateRatingStarsModal(stars, 0);
    
    // Reset file upload preview
    const uploadPreview = document.querySelector('.upload-preview');
    if (uploadPreview) {
        uploadPreview.classList.remove('active');
        const previewItems = document.getElementById('previewItems');
        if (previewItems) {
            previewItems.innerHTML = '';
        }
    }
}

function submitReview(rating) {
    const reviewText = document.getElementById('reviewText').value;
    const mediaFiles = document.getElementById('reviewMedia').files;
    
    if (rating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    if (!reviewText.trim()) {
        showToast('Please write a review', 'error');
        return;
    }
    
    // Simulate review submission
    showToast('Review submitted successfully!', 'success');
    closeReviewModal();
    
    // In real app, send to backend
    console.log('Review submitted:', { rating, reviewText, mediaFiles });
}

// Toast notification function
function showToast(message, type = 'info') {
    const toasterContainer = document.getElementById('toasterContainer');
    if (!toasterContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toasterContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
    
    // Close on click
    toast.querySelector('.toast-close').addEventListener('click', function() {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });
}

// Add language update for file input
document.addEventListener('DOMContentLoaded', function() {
    // Update file input placeholder when language changes
    document.getElementById('langToggle').addEventListener('click', function() {
        setTimeout(updateFileInputPlaceholder, 100);
    });
});