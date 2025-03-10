document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-tag');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    function handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => observer.observe(element));
});

function handleScrollAnimations() {
    const animatedSections = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', handleScrollAnimations);



// Initialize Supabase
const { createClient } = supabase;

const SUPABASE_URL = 'https://quulvfzpbnwevqdynbhn.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dWx2ZnpwYm53ZXZxZHluYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDA1NjgsImV4cCI6MjA1NzE3NjU2OH0.0ZAboxsoSI3DwMMCXMUN9c6Wu7Uc45ZF3urY309lZNw'; // Replace with your Supabase Anon Key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log('Products:', data);
}
fetchProducts();

async function addProduct(productName, productPrice) {
    const { data, error } = await supabase
        .from('products')
        .insert([{ name: productName, price: productPrice }]);

    if (error) {
        console.error('Error adding product:', error);
        return;
    }

    console.log('Product added:', data);
}
