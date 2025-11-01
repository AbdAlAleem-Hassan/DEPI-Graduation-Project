// js/contact.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map for contact page
    if (document.getElementById('map')) {
        initializeContactMap();
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close all other FAQ items
            if (!faqItem.classList.contains('active')) {
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        const otherIcon = item.querySelector('.faq-question i');
                        const otherAnswer = item.querySelector('.faq-answer');
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                        otherAnswer.style.maxHeight = '0';
                    }
                });
            }
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
            
            // Toggle icon and answer
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Auto-open first FAQ item
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq && !document.querySelector('.faq-item.active')) {
        firstFaq.classList.add('active');
        const firstIcon = firstFaq.querySelector('.faq-question i');
        const firstAnswer = firstFaq.querySelector('.faq-answer');
        firstIcon.classList.remove('fa-chevron-down');
        firstIcon.classList.add('fa-chevron-up');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
    
    // Handle window resize for FAQ answers
    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-item.active .faq-answer').forEach(answer => {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    });
});