// doctor-details.js - Enhanced Version with All Fixes
document.addEventListener('DOMContentLoaded', function() {
    initializeDoctorDetails();
    initializeTabs();
    initializeReviewModal();
    initializeBookingModal();
    
    // Load saved tab from session storage
    loadSavedTab();
});

function initializeDoctorDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');
    const bookAppointment = urlParams.get('book') === 'true';
    
    // Enhanced doctor data with multiple locations and detailed schedule
    const doctors = {
        1: {
            id: 1,
            name: "Dr. Ahmed Hassan",
            nameAr: "د. أحمد حسن",
            specialty: "Cardiology",
            specialtyAr: "أمراض القلب",
            hospital: "Al-Salam International Hospital",
            hospitalAr: "مستشفى السلام الدولي",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.9,
            experience: "15+ Years Experience",
            patients: "5200+ Patients",
            languages: ["English", "Arabic"],
            description: "Dr. Ahmed Hassan is a renowned cardiologist with over 15 years of experience in treating heart diseases. He specializes in interventional cardiology and has performed numerous successful cardiac procedures. Dr. Hassan is committed to providing personalized care and staying updated with the latest advancements in cardiology.",
            phone: "+1 234 567 8901",
            email: "ahmed.hassan@hospital.com",
            fee: "$250",
            availableNow: true,
            
            // Multiple locations
            locations: [
                {
                    id: 1,
                    name: "Al-Salam International Hospital - Main Branch",
                    nameAr: "مستشفى السلام الدولي - الفرع الرئيسي",
                    address: "123 Medical Street, Cairo, Egypt",
                    coordinates: [30.0444, 31.2357],
                    phone: "+1 234 567 8901"
                },
                {
                    id: 2,
                    name: "Al-Salam International Hospital - New Cairo",
                    nameAr: "مستشفى السلام الدولي - القاهرة الجديدة",
                    address: "456 Healthcare Avenue, New Cairo, Egypt",
                    coordinates: [30.0131, 31.2089],
                    phone: "+1 234 567 8902"
                }
            ],
            
            // Services with different schedules
            services: [
                {
                    id: 1,
                    name: "Cardiac Consultation",
                    nameAr: "استشارة قلبية",
                    duration: 30,
                    fee: "150"
                },
                {
                    id: 2,
                    name: "Echocardiography",
                    nameAr: "فحص صدى القلب",
                    duration: 45,
                    fee: "300"
                },
                {
                    id: 3,
                    name: "Cardiac Catheterization",
                    nameAr: "قسطرة القلب",
                    duration: 120,
                    fee: "1500"
                }
            ],
            
            // Complex schedule with different times for different services and locations
            schedule: {
                "1": { // Location ID 1
                    "1": { // Service ID 1 - Cardiac Consultation
                        "monday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                        "tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                        "wednesday": ["09:00", "10:00", "11:00"],
                        "thursday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                        "friday": ["09:00", "10:00", "11:00"],
                        "saturday": ["10:00", "11:00", "12:00"],
                        "sunday": []
                    },
                    "2": { // Service ID 2 - Echocardiography
                        "monday": ["14:00", "15:00"],
                        "tuesday": ["14:00", "15:00"],
                        "wednesday": [],
                        "thursday": ["14:00", "15:00"],
                        "friday": [],
                        "saturday": ["10:00", "11:00"],
                        "sunday": []
                    }
                },
                "2": { // Location ID 2
                    "1": { // Service ID 1 - Cardiac Consultation
                        "monday": [],
                        "tuesday": ["16:00", "17:00", "18:00"],
                        "wednesday": ["16:00", "17:00", "18:00"],
                        "thursday": [],
                        "friday": ["16:00", "17:00", "18:00"],
                        "saturday": ["14:00", "15:00", "16:00"],
                        "sunday": ["10:00", "11:00", "12:00"]
                    },
                    "3": { // Service ID 3 - Cardiac Catheterization
                        "monday": [],
                        "tuesday": ["08:00", "09:00"],
                        "wednesday": ["08:00", "09:00"],
                        "thursday": [],
                        "friday": ["08:00", "09:00"],
                        "saturday": [],
                        "sunday": []
                    }
                }
            },
            
            // Education and experience
            education: [
                {
                    year: "2015-2018",
                    title: "Fellowship in Interventional Cardiology",
                    titleAr: "زمالة في طب القلب التدخلي",
                    institution: "Johns Hopkins Hospital, USA",
                    institutionAr: "مستشفى جونز هوبكنز، الولايات المتحدة"
                },
                {
                    year: "2012-2015",
                    title: "Residency in Cardiology",
                    titleAr: "إقامة في طب القلب",
                    institution: "Cairo University Hospitals, Egypt",
                    institutionAr: "مستشفيات جامعة القاهرة، مصر"
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
                    content: "Excellent doctor with great bedside manner. Explained everything clearly.",
                    contentAr: "طبيب ممتاز بأسلوب رائع. شرح كل شيء بوضوح.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                    id: 2,
                    patientName: "Fatima Hassan",
                    patientNameAr: "فاطمة حسن",
                    rating: 4,
                    date: "2024-01-10",
                    content: "Professional and caring. Waiting time was reasonable.",
                    contentAr: "محترف ومراعي. وقت الانتظار كان معقولاً.",
                    image: "https://randomuser.me/api/portraits/women/32.jpg"
                },
                {
                    id: 3,
                    patientName: "Sarah Johnson",
                    patientNameAr: "سارة جونسون",
                    rating: 5,
                    date: "2024-01-08",
                    content: "Very knowledgeable and took time to answer all my questions.",
                    contentAr: "مطلع جدًا وأخذ وقتًا للإجابة على جميع أسئلتي.",
                    image: "https://randomuser.me/api/portraits/women/25.jpg"
                }
            ]
        }
    };
    
    // Redirect if doctor not found
    if (!doctorId || !doctors[doctorId]) {
        window.location.href = 'notFound.html';
        return;
    }
    
    const doctor = doctors[doctorId];
    
    // Update page content
    updateDoctorUI(doctor);
    
    // Initialize components
    initializeWeeklySchedule(doctor);
    initializeEducationExperience(doctor);
    initializeServices(doctor);
    initializeLocations(doctor);
    initializeReviews(doctor);
    initializeFilters(doctor);
    
    // Store doctor data for booking
    window.currentDoctor = doctor;
    
    // Auto-open booking modal if book parameter is true
    if (bookAppointment) {
        setTimeout(() => {
            openBookingModal();
        }, 1000);
    }
}

function updateDoctorUI(doctor) {
    document.getElementById('doctorName').textContent = doctor.name;
    document.getElementById('doctorSpecialty').textContent = doctor.specialty;
    document.getElementById('doctorDetailImage').src = doctor.image;
    document.getElementById('doctorDetailImage').alt = doctor.name;
    document.getElementById('doctorDetailRating').textContent = doctor.rating;
    document.getElementById('doctorHospital').textContent = doctor.hospital;
    document.getElementById('doctorExperience').textContent = doctor.experience;
    document.getElementById('doctorPatients').textContent = doctor.patients;
    document.getElementById('doctorLanguages').textContent = doctor.languages.join(', ');
    document.getElementById('doctorDetailDescription').textContent = doctor.description;
    document.getElementById('doctorPhone').textContent = doctor.phone;
    document.getElementById('doctorEmail').textContent = doctor.email;
    document.getElementById('consultationFee').textContent = doctor.fee;
    
    // Update availability badge
    const availabilityBadge = document.getElementById('availabilityBadge');
    if (doctor.availableNow) {
        availabilityBadge.innerHTML = '<i class="fas fa-circle"></i><span data-en="Available Now" data-ar="متاح الآن">Available Now</span>';
        availabilityBadge.classList.remove('offline');
    } else {
        availabilityBadge.innerHTML = '<i class="fas fa-circle"></i><span data-en="Currently Offline" data-ar="غير متاح حاليا">Currently Offline</span>';
        availabilityBadge.classList.add('offline');
    }
    
    // Set first location as default
    if (doctor.locations && doctor.locations.length > 0) {
        document.getElementById('doctorLocation').textContent = doctor.locations[0].name;
        window.doctorCoordinates = doctor.locations[0].coordinates;
    }
}

function initializeWeeklySchedule(doctor) {
    const weeklySchedule = document.getElementById('weeklySchedule');
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayNames = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    };
    
    const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
    
    let scheduleHTML = '<div class="weekly-calendar">';
    
    days.forEach((day, index) => {
        const dayName = dayNames[currentLang][index];
        const today = new Date().getDay();
        const isToday = index === today;
        
        // Get available times for this day (simplified)
        const availableTimes = getAvailableTimesForDay(doctor, day);
        
        scheduleHTML += `
            <div class="week-day ${isToday ? 'today' : ''}">
                <div class="day-name">${dayName}</div>
                <div class="day-times">
                    ${availableTimes.length > 0 ? 
                        availableTimes.slice(0, 2).map(time => `<span class="time-slot-small">${time}</span>`).join('') +
                        (availableTimes.length > 2 ? `<span class="more-times">+${availableTimes.length - 2}</span>` : '')
                        : '<span class="no-times" data-en="Unavailable" data-ar="غير متاح">Unavailable</span>'
                    }
                </div>
            </div>
        `;
    });
    
    scheduleHTML += '</div>';
    weeklySchedule.innerHTML = scheduleHTML;
}

function getAvailableTimesForDay(doctor, day) {
    // Simplified function to get available times from all locations and services
    const times = [];
    
    // Check all locations and services
    Object.values(doctor.schedule).forEach(locationSchedule => {
        Object.values(locationSchedule).forEach(serviceSchedule => {
            if (serviceSchedule[day]) {
                times.push(...serviceSchedule[day]);
            }
        });
    });
    
    // Remove duplicates and sort
    return [...new Set(times)].sort();
}

function initializeEducationExperience(doctor) {
    const educationExperience = document.getElementById('educationExperience');
    
    if (!doctor.education || doctor.education.length === 0) {
        educationExperience.innerHTML = '<p data-en="No education information available" data-ar="لا توجد معلومات تعليمية">No education information available</p>';
        return;
    }
    
    let educationHTML = '<div class="education-timeline">';
    
    doctor.education.forEach(edu => {
        educationHTML += `
            <div class="timeline-item">
                <div class="timeline-year">${edu.year}</div>
                <h4 class="timeline-title">${edu.title}</h4>
                <div class="timeline-institution">${edu.institution}</div>
            </div>
        `;
    });
    
    educationHTML += '</div>';
    educationExperience.innerHTML = educationHTML;
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
    loadTabContent('schedule');
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
        case 'schedule':
            loadScheduleCalendar();
            break;
        case 'services':
            // Services are already initialized
            break;
        case 'reviews':
            // Reviews are already initialized
            break;
        case 'location':
            initializeMap();
            break;
    }
}

function initializeFilters(doctor) {
    const serviceFilter = document.getElementById('serviceFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    // Clear existing options
    serviceFilter.innerHTML = '<option value="">All Services</option>';
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    
    // Add service options
    doctor.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceFilter.appendChild(option);
    });
    
    // Add location options
    doctor.locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.id;
        option.textContent = location.name;
        locationFilter.appendChild(option);
    });
    
    // Add event listeners for filters
    serviceFilter.addEventListener('change', updateSchedule);
    locationFilter.addEventListener('change', updateSchedule);
}

function updateSchedule() {
    const serviceFilter = document.getElementById('serviceFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    const selectedService = serviceFilter.value;
    const selectedLocation = locationFilter.value;
    
    // Update selected filters display
    const selectedServiceEl = document.getElementById('selectedService');
    const selectedLocationEl = document.getElementById('selectedLocation');
    
    selectedServiceEl.textContent = selectedService ? `Service: ${serviceFilter.options[serviceFilter.selectedIndex].text}` : '';
    selectedLocationEl.textContent = selectedLocation ? `Location: ${locationFilter.options[locationFilter.selectedIndex].text}` : '';
    
    // Reload calendar with filters
    loadScheduleCalendar(selectedService, selectedLocation);
}

function loadScheduleCalendar(selectedService = '', selectedLocation = '') {
    const calendarView = document.getElementById('calendarView');
    const timeSlots = document.getElementById('timeSlots');
    
    // Generate calendar for current month
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Generate calendar HTML
    let calendarHTML = `
        <div class="calendar-header">
            <div class="calendar-month">${monthNames[currentMonth]} ${currentYear}</div>
            <div class="calendar-nav">
                <button class="calendar-nav-btn prev-month">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="calendar-nav-btn next-month">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
        <div class="calendar-grid">
    `;
    
    // Add day headers
    daysOfWeek.forEach(day => {
        calendarHTML += `<div class="calendar-day">${day}</div>`;
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-date"></div>`;
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today && !isToday;
        const dayOfWeek = date.getDay();
        const dayName = daysOfWeek[dayOfWeek].toLowerCase();
        
        // Check if date is available based on filters
        const isAvailable = checkDateAvailability(dayName, selectedService, selectedLocation) && !isPast;
        
        calendarHTML += `
            <div class="calendar-date ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${!isAvailable ? 'unavailable' : ''}" 
                 data-date="${date.toISOString().split('T')[0]}"
                 data-day="${dayName}">
                ${day}
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    calendarView.innerHTML = calendarHTML;
    
    // Generate time slots for today by default
    const todayDate = today.toISOString().split('T')[0];
    const timeSlotHTML = generateTimeSlots(todayDate, selectedService, selectedLocation);
    timeSlots.innerHTML = timeSlotHTML;
    
    // Add event listeners
    initializeCalendarEventListeners(selectedService, selectedLocation);
}

function checkDateAvailability(dayName, selectedService, selectedLocation) {
    const doctor = window.currentDoctor;
    
    // If no filters selected, check if doctor works on this day at all
    if (!selectedService && !selectedLocation) {
        for (const locationId in doctor.schedule) {
            for (const serviceId in doctor.schedule[locationId]) {
                if (doctor.schedule[locationId][serviceId][dayName] && 
                    doctor.schedule[locationId][serviceId][dayName].length > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // If only service filter selected
    if (selectedService && !selectedLocation) {
        for (const locationId in doctor.schedule) {
            if (doctor.schedule[locationId][selectedService] && 
                doctor.schedule[locationId][selectedService][dayName] && 
                doctor.schedule[locationId][selectedService][dayName].length > 0) {
                return true;
            }
        }
        return false;
    }
    
    // If only location filter selected
    if (!selectedService && selectedLocation) {
        if (doctor.schedule[selectedLocation]) {
            for (const serviceId in doctor.schedule[selectedLocation]) {
                if (doctor.schedule[selectedLocation][serviceId][dayName] && 
                    doctor.schedule[selectedLocation][serviceId][dayName].length > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // If both filters selected
    if (selectedService && selectedLocation) {
        return doctor.schedule[selectedLocation] && 
               doctor.schedule[selectedLocation][selectedService] && 
               doctor.schedule[selectedLocation][selectedService][dayName] && 
               doctor.schedule[selectedLocation][selectedService][dayName].length > 0;
    }
    
    return false;
}

function generateTimeSlots(date, selectedService = '', selectedLocation = '') {
    const doctor = window.currentDoctor;
    const selectedDate = new Date(date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    let availableSlots = [];
    
    // If no filters, get all available slots for the day
    if (!selectedService && !selectedLocation) {
        for (const locationId in doctor.schedule) {
            for (const serviceId in doctor.schedule[locationId]) {
                if (doctor.schedule[locationId][serviceId][dayName]) {
                    availableSlots.push(...doctor.schedule[locationId][serviceId][dayName]);
                }
            }
        }
    }
    // If only service filter
    else if (selectedService && !selectedLocation) {
        for (const locationId in doctor.schedule) {
            if (doctor.schedule[locationId][selectedService] && 
                doctor.schedule[locationId][selectedService][dayName]) {
                availableSlots.push(...doctor.schedule[locationId][selectedService][dayName]);
            }
        }
    }
    // If only location filter
    else if (!selectedService && selectedLocation) {
        if (doctor.schedule[selectedLocation]) {
            for (const serviceId in doctor.schedule[selectedLocation]) {
                if (doctor.schedule[selectedLocation][serviceId][dayName]) {
                    availableSlots.push(...doctor.schedule[selectedLocation][serviceId][dayName]);
                }
            }
        }
    }
    // If both filters
    else if (selectedService && selectedLocation) {
        if (doctor.schedule[selectedLocation] && 
            doctor.schedule[selectedLocation][selectedService] && 
            doctor.schedule[selectedLocation][selectedService][dayName]) {
            availableSlots = doctor.schedule[selectedLocation][selectedService][dayName];
        }
    }
    
    // Remove duplicates and sort
    availableSlots = [...new Set(availableSlots)].sort();
    
    if (availableSlots.length === 0) {
        return '<p data-en="No available time slots for this date" data-ar="لا توجد مواعيد متاحة لهذا التاريخ">No available time slots for this date</p>';
    }
    
    return availableSlots.map(slot => {
        const [hour, minute] = slot.split(':');
        const hourNum = parseInt(hour);
        const displayTime = `${hourNum > 12 ? hourNum - 12 : hourNum}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
        
        return `
            <div class="time-slot" data-time="${slot}">
                ${displayTime}
            </div>
        `;
    }).join('');
}

function initializeCalendarEventListeners(selectedService, selectedLocation) {
    // Date selection
    document.querySelectorAll('.calendar-date:not(.unavailable):not(.past)').forEach(dateEl => {
        dateEl.addEventListener('click', function() {
            document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            
            const selectedDate = this.getAttribute('data-date');
            updateTimeSlotsForDate(selectedDate, selectedService, selectedLocation);
        });
    });
    
    // Time slot selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('time-slot')) {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
            window.selectedTime = e.target.getAttribute('data-time');
        }
    });
    
    // Calendar navigation
    document.querySelector('.prev-month')?.addEventListener('click', function() {
        showToast('Previous month feature coming soon!', 'info');
    });
    
    document.querySelector('.next-month')?.addEventListener('click', function() {
        showToast('Next month feature coming soon!', 'info');
    });
}

function updateTimeSlotsForDate(date, selectedService, selectedLocation) {
    const timeSlots = document.getElementById('timeSlots');
    const timeSlotHTML = generateTimeSlots(date, selectedService, selectedLocation);
    timeSlots.innerHTML = timeSlotHTML;
}

function initializeServices(doctor) {
    const servicesList = document.getElementById('doctorServicesList');
    
    if (!doctor.services || doctor.services.length === 0) {
        servicesList.innerHTML = '<p data-en="No services available" data-ar="لا توجد خدمات متاحة">No services available</p>';
        return;
    }
    
    let servicesHTML = '';
    
    doctor.services.forEach(service => {
        servicesHTML += `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-title">
                    <i class="fas fa-stethoscope"></i>
                    <h4 class="service-title">${service.name}</h4>
                </div>
                <p class="service-description" data-en="Professional medical service" data-ar="خدمة طبية احترافية">Professional medical service</p>
                <div class="service-details">
                    <div class="service-duration"><i class="far fa-clock"></i><span data-en="${service.duration} min" data-ar="${service.duration} دقيقة">${service.duration} min</span></div>
                    <div class="service-fee"><i class="fas fa-dollar-sign"></i><span data-en="${service.fee}" data-ar="${service.fee}">${service.fee}</span></div>
                </div>
                <button class="service-book-btn" data-service-id="${service.id}">
                    <span data-en="Book This Service" data-ar="حجز هذه الخدمة">Book This Service</span>
                </button>
            </div>
        `;
    });
    
    servicesList.innerHTML = servicesHTML;
    
    // Add event listeners for service booking
    document.querySelectorAll('.service-book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const service = doctor.services.find(s => s.id == serviceId);
            
            // Switch to schedule tab and filter by service
            document.querySelector('[data-tab="schedule"]').click();
            document.getElementById('serviceFilter').value = serviceId;
            updateSchedule();
            
            showToast(`Now showing availability for ${service.name}`, 'info');
        });
    });
}

function initializeLocations(doctor) {
    const locationsList = document.getElementById('doctorLocationsList');
    
    if (!doctor.locations || doctor.locations.length === 0) {
        locationsList.innerHTML = '<p data-en="No locations available" data-ar="لا توجد مواقع متاحة">No locations available</p>';
        return;
    }
    
    let locationsHTML = '<div class="locations-grid">';
    
    doctor.locations.forEach(location => {
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
                    <button class="btn secondary view-schedule" data-location-id="${location.id}">
                        <i class="fas fa-calendar-alt"></i>
                        <span data-en="View Schedule" data-ar="عرض الجدول">View Schedule</span>
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
    
    document.querySelectorAll('.view-schedule').forEach(btn => {
        btn.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location-id');
            const location = doctor.locations.find(l => l.id == locationId);
            
            // Switch to schedule tab and filter by location
            document.querySelector('[data-tab="schedule"]').click();
            document.getElementById('locationFilter').value = locationId;
            updateSchedule();
            
            showToast(`Now showing schedule for ${location.name}`, 'info');
        });
    });
}

function initializeMap() {
    if (!window.currentDoctor || !window.currentDoctor.locations) return;
    
    const mapContainer = document.getElementById('doctorDetailMap');
    if (!mapContainer) return;
    
    // Initialize map with first location
    const firstLocation = window.currentDoctor.locations[0];
    const map = L.map('doctorDetailMap').setView(firstLocation.coordinates, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add marker for each location
    window.currentDoctor.locations.forEach(location => {
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
    window.doctorMap = map;
}

function focusOnLocation(locationId) {
    const location = window.currentDoctor.locations.find(loc => loc.id == locationId);
    if (!location || !window.doctorMap) return;
    
    window.doctorMap.setView(location.coordinates, 15);
    
    // Open popup for this location
    window.doctorMap.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.locationId == locationId) {
            layer.openPopup();
        }
    });
}

function getDirectionsToLocation(locationId) {
    const location = window.currentDoctor.locations.find(loc => loc.id == locationId);
    if (!location) return;
    
    const [lat, lng] = location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

function initializeReviews(doctor) {
    // Check if doctor exists and has reviews
    if (!doctor || !doctor.reviews) {
        console.error('Doctor or reviews not found');
        const reviewsList = document.getElementById('doctorReviewsList');
        const overallRating = document.getElementById('doctorOverallRating');
        const totalReviews = document.getElementById('doctorTotalReviews');
        
        reviewsList.innerHTML = '<p data-en="No reviews available" data-ar="لا توجد تقييمات متاحة">No reviews available</p>';
        overallRating.textContent = '0.0';
        totalReviews.textContent = '(0 reviews)';
        return;
    }
    
    const reviewsList = document.getElementById('doctorReviewsList');
    const overallRating = document.getElementById('doctorOverallRating');
    const totalReviews = document.getElementById('doctorTotalReviews');
    
    if (doctor.reviews.length === 0) {
        reviewsList.innerHTML = '<p data-en="No reviews yet" data-ar="لا توجد تقييمات بعد">No reviews yet</p>';
        overallRating.textContent = '0.0';
        totalReviews.textContent = '(0 reviews)';
        return;
    }
    
    // Calculate average rating
    const averageRating = doctor.reviews.reduce((sum, review) => sum + review.rating, 0) / doctor.reviews.length;
    overallRating.textContent = averageRating.toFixed(1);
    totalReviews.textContent = `(${doctor.reviews.length} reviews)`;
    
    // Update rating stars
    updateRatingStars(averageRating);
    
    // Load reviews
    loadReviewsList(doctor.reviews);
    
    // Add sort functionality
    document.getElementById('reviewSort').addEventListener('change', function() {
        const sortedReviews = sortReviews(doctor.reviews, this.value);
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
    const reviewsList = document.getElementById('doctorReviewsList');
    
    let reviewsHTML = '';
    
    reviews.forEach(review => {
        const reviewDate = new Date(review.date).toLocaleDateString();
        const stars = Array(5).fill(0).map((_, i) => 
            `<i class="${i < review.rating ? 'fas ' : 'far '}fa-star"></i>`
        ).join('');
        console.log(stars);
        
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

function initializeReviewModal() {
    const modal = document.getElementById('reviewModal');
    const openBtn = document.getElementById('addDoctorReviewBtn');
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

function initializeBookingModal() {
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    const videoConsultationBtn = document.getElementById('videoConsultationBtn');
    const contactDoctorBtn = document.getElementById('contactDoctorBtn');
    
    bookAppointmentBtn.addEventListener('click', openBookingModal);
    getDirectionsBtn.addEventListener('click', function() {
        document.querySelector('[data-tab="location"]').click();
        showToast('Please select a location for directions', 'info');
    });
    videoConsultationBtn.addEventListener('click', function() {
        showToast('Video consultation feature coming soon!', 'info');
    });
    contactDoctorBtn.addEventListener('click', function() {
        const doctor = window.currentDoctor;
        if (doctor && doctor.phone) {
            // Simulate call/message options
            if (confirm('Would you like to call or message the doctor?')) {
                window.open(`tel:${doctor.phone}`);
            }
        }
    });
}

function openBookingModal() {
    // Switch to schedule tab for booking
    document.querySelector('[data-tab="schedule"]').click();
    showToast('Please select a date and time for your appointment', 'info');
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