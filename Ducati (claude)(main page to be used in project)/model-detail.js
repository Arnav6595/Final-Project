document.addEventListener('DOMContentLoaded', function() {
    // Specifications accordion functionality
    const specCategories = document.querySelectorAll('.spec-category');
    
    specCategories.forEach(category => {
        const header = category.querySelector('.spec-header');
        
        header.addEventListener('click', function() {
            category.classList.toggle('active');
            
            // Toggle icon
            const icon = category.querySelector('.toggle-icon i');
            if (category.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Open first spec category by default
    if (specCategories.length > 0) {
        specCategories[0].classList.add('active');
        const firstIcon = specCategories[0].querySelector('.toggle-icon i');
        firstIcon.classList.remove('fa-plus');
        firstIcon.classList.add('fa-minus');
    }
    
    // Image Gallery Navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevGalleryBtn = document.querySelector('.gallery-nav.prev');
    const nextGalleryBtn = document.querySelector('.gallery-nav.next');
    
    if (galleryItems.length && prevGalleryBtn && nextGalleryBtn) {
        let currentGalleryIndex = 0;
        
        // Function to update gallery display
        const updateGalleryDisplay = () => {
            galleryItems.forEach((item, index) => {
                if (index >= currentGalleryIndex && index < currentGalleryIndex + 3) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };
        
        // Initialize gallery
        updateGalleryDisplay();
        
        // Previous button click
        prevGalleryBtn.addEventListener('click', function() {
            if (currentGalleryIndex > 0) {
                currentGalleryIndex--;
                updateGalleryDisplay();
            }
        });
        
        // Next button click
        nextGalleryBtn.addEventListener('click', function() {
            if (currentGalleryIndex < galleryItems.length - 3) {
                currentGalleryIndex++;
                updateGalleryDisplay();
            }
        });
        
        // Gallery item click to show in modal
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                showImageModal(imgSrc);
            });
        });
    }
    
    // Image Modal Functionality
    function showImageModal(imgSrc) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-modal');
        closeBtn.innerHTML = '&times;';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        // Append elements
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(img);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1100;
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .modal-content img {
                max-width: 100%;
                max-height: 80vh;
                display: block;
            }
            
            .close-modal {
                position: absolute;
                top: -40px;
                right: 0;
                color: #fff;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close on click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Configurator Color Selector
    const colorOptions = document.querySelectorAll('.color-option');
    const previewImage = document.getElementById('preview-image');
    
    if (colorOptions.length && previewImage) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to selected option
                this.classList.add('active');
                
                // Update preview image based on color
                const color = this.getAttribute('data-color');
                previewImage.src = `/api/placeholder/600/400?text=${color.charAt(0).toUpperCase() + color.slice(1)}`;
            });
        });
    }
    
    // Configurator Price Calculator
    const accessoryCheckboxes = document.querySelectorAll('.accessory-option input');
    const totalPriceElement = document.querySelector('.total-price');
    
    if (accessoryCheckboxes.length && totalPriceElement) {
        const basePrice = 2999000; // ₹29,99,000
        const accessoryPrices = {
            'carbon-fiber': 450000,
            'titanium-exhaust': 1250000,
            'racing-seat': 75000
        };
        
        // Function to update total price
        const updateTotalPrice = () => {
            let totalPrice = basePrice;
            
            accessoryCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const accessoryValue = checkbox.value;
                    totalPrice += accessoryPrices[accessoryValue] || 0;
                }
            });
            
            // Format price with commas
            const formattedPrice = '₹' + totalPrice.toLocaleString('en-IN');
            totalPriceElement.textContent = formattedPrice;
        };
        
        // Add event listeners to checkboxes
        accessoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateTotalPrice);
        });
    }
    
    // Related Models Carousel
    const modelCards = document.querySelectorAll('.models-carousel .model-card');
    const prevModelBtn = document.querySelector('.carousel-nav.prev');
    const nextModelBtn = document.querySelector('.carousel-nav.next');
    
    if (modelCards.length && prevModelBtn && nextModelBtn) {
        let currentModelIndex = 0;
        const cardsToShow = window.innerWidth < 768 ? 1 : 3;
        
        // Function to update carousel display
        const updateCarouselDisplay = () => {
            modelCards.forEach((card, index) => {
                if (index >= currentModelIndex && index < currentModelIndex + cardsToShow) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Enable/disable navigation buttons
            prevModelBtn.disabled = currentModelIndex === 0;
            prevModelBtn.style.opacity = currentModelIndex === 0 ? '0.5' : '1';
            
            nextModelBtn.disabled = currentModelIndex >= modelCards.length - cardsToShow;
            nextModelBtn.style.opacity = currentModelIndex >= modelCards.length - cardsToShow ? '0.5' : '1';
        };
        
        // Initialize carousel
        updateCarouselDisplay();
        
        // Previous button click
        prevModelBtn.addEventListener('click', function() {
            if (currentModelIndex > 0) {
                currentModelIndex--;
                updateCarouselDisplay();
            }
        });
        
        // Next button click
        nextModelBtn.addEventListener('click', function() {
            if (currentModelIndex < modelCards.length - cardsToShow) {
                currentModelIndex++;
                updateCarouselDisplay();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            const newCardsToShow = window.innerWidth < 768 ? 1 : 3;
            if (newCardsToShow !== cardsToShow) {
                currentModelIndex = 0;
                updateCarouselDisplay();
            }
        });
    }
    
    // Brochure Form Submission
    const brochureForm = document.querySelector('.brochure-form');
    
    if (brochureForm) {
        brochureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const consent = document.getElementById('consent').checked;
            
            // Basic validation
            if (!name || !email || !phone) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!consent) {
                alert('Please agree to the terms to download the brochure.');
                return;
            }
            
            // Simulate brochure download
            alert('Thank you! Your brochure download will begin shortly.');
            
            // In a real implementation, you would trigger the download here
            // window.location.href = 'path/to/brochure.pdf';
        });
    }
});