const courses = [
  { id: 1, name: 'Cooking Salads', price: 500, image: 'images/course1.jpg' },
  { id: 2, name: 'Cooking Fish', price: 800, image: 'images/course2.jpg' },
  { id: 3, name: 'Grilled food', price: 300, image: 'images/course3.jpg' },
  { id: 4, name: 'Pastries', price: 1500, image: 'images/course4.jpg' },
];

// Initialize the cart (using localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display courses on the shop page
function displayCourses() {
  const courseList = document.getElementById('course-list');
  courses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.classList.add('course');
      const isAdded = cart.some(item => item.id === course.id);
      courseDiv.innerHTML = `
          <img src="${course.image}" alt="${course.name}">
          <h3>${course.name}</h3>
          <p>$${course.price}</p>
          <button 
              id="add-btn-${course.id}" 
              onclick="addToCart(${course.id})" 
              ${isAdded ? 'disabled' : ''}
          >
              ${isAdded ? 'Added' : 'Add to Cart'}
          </button>
      `;
      courseList.appendChild(courseDiv);
  });
}

// Function to add a course to the cart
function addToCart(courseId) {
  const course = courses.find(c => c.id === courseId);
  
  if (!cart.some(item => item.id === courseId)) {
      cart.push({ ...course });
      localStorage.setItem('cart', JSON.stringify(cart));
      document.getElementById(`add-btn-${courseId}`).textContent = 'Added';
      document.getElementById(`add-btn-${courseId}`).disabled = true;
  }
  updateCart();
}

// Function to update the cart on cart page
function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  
  if (cartItemsList && totalPriceElement) {
      cartItemsList.innerHTML = '';
      let total = 0;
      
      cart.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
              ${item.name} - $${item.price}
              <button onclick="removeFromCart(${item.id})">Remove</button>
          `;
          cartItemsList.appendChild(listItem);
          total += item.price;
      });
      
      totalPriceElement.textContent = total;
  }
}

// Function to remove a course from the cart
function removeFromCart(courseId) {
  cart = cart.filter(item => item.id !== courseId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();

  const addButton = document.getElementById(`add-btn-${courseId}`);
  if (addButton) {
      addButton.textContent = 'Add to Cart';
      addButton.disabled = false;
  }
}

// Initialize the pages
if (document.getElementById('course-list')) {
  displayCourses();
}

if (document.getElementById('cart-items')) {
  updateCart();
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  alert("Proceeding to checkout...");
});