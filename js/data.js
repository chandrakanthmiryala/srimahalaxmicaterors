/* ============================================
   SRI MAHALAXMI CATERERS - Default Data
   ============================================ */

const DEFAULT_DATA = {
  siteInfo: {
    name: "Sri Mahalaxmi Caterers",
    tagline: "Creating Memorable Feasts Since 2005",
    phone: "+91 9490369140",
    altPhone: "+91 9491961940",
    email: "info@srimahalaxmicaterers.com",
    address: "LB Nagar, Hyderabad, Telangana 500074",
    whatsapp: "919490369140",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.1234567890123!2d78.5520!3d17.3457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99a0a7e0d5e7%3A0x2b4a3b0c4d5e6f7a!2sLB%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    socialLinks: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      twitter: "#"
    }
  },

  hero: {
    slides: [
      { image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80", alt: "Indian feast spread" },
      { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80", alt: "Delicious catering setup" },
      { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80", alt: "Elegant dining" }
    ],
    heading: "Exquisite Catering for <span>Every Occasion</span>",
    subheading: "From grand weddings to intimate gatherings, we bring authentic flavors and impeccable service to make your events truly unforgettable."
  },

  highlights: [
    { icon: "🏆", number: "18+", text: "Years Experience" },
    { icon: "😊", number: "5000+", text: "Happy Customers" },
    { icon: "🎉", number: "2500+", text: "Events Covered" },
    { icon: "🍽️", number: "150+", text: "Menu Items" }
  ],

  about: {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    yearsExperience: 18,
    story: "Sri Mahalaxmi Caterers was founded in 2005 with a simple yet powerful vision – to bring the rich, authentic flavors of Indian cuisine to every celebration. What started as a small family-run venture has now grown into one of the most trusted catering companies in the region.",
    mission: "Our mission is to deliver exceptional culinary experiences that transform ordinary events into extraordinary celebrations. We combine traditional recipes with modern presentation to create a feast for both the eyes and the palate.",
    vision: "To be the premier catering service across the region, known for our unwavering commitment to quality, hygiene, and customer satisfaction.",
    specialties: [
      "Traditional South Indian Cuisine",
      "North Indian Delicacies",
      "Multi-cuisine Buffets",
      "Custom Menu Planning",
      "Live Cooking Stations",
      "Theme-based Catering"
    ],
    serviceAreas: "Hyderabad, Secunderabad, Ranga Reddy, Medchal, and surrounding districts"
  },

  services: [
    {
      id: 1,
      title: "Wedding Catering",
      icon: "💒",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      description: "Make your special day even more magical with our exquisite wedding catering services. We offer a wide variety of cuisines and setups to match your wedding theme.",
      features: ["Custom menu planning", "Live cooking stations", "Elegant table setup", "500+ guest capacity", "Theme-based decorations"]
    },
    {
      id: 2,
      title: "Birthday Parties",
      icon: "🎂",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      description: "Celebrate life's milestones with delicious food and impeccable service. Our birthday catering packages are designed to delight guests of all ages.",
      features: ["Themed food displays", "Kids-friendly menu", "Cake arrangement", "Party snacks & starters", "Beverage station"]
    },
    {
      id: 3,
      title: "Corporate Events",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      description: "Professional catering for corporate meetings, conferences, and team celebrations. We ensure a seamless dining experience that reflects your brand's standards.",
      features: ["Executive lunch boxes", "Conference buffets", "Tea & coffee service", "Dietary accommodations", "Timely service"]
    },
    {
      id: 4,
      title: "Food Donation Services",
      icon: "🤲",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      description: "We believe in giving back to the community. Our food donation services help you organize charity meals and community feeding programs with dignity and quality.",
      features: ["Bulk meal preparation", "Hygienic packaging", "Transport arrangement", "Community events", "Festival specials"]
    },
    {
      id: 5,
      title: "Outdoor Catering",
      icon: "⛺",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
      description: "Bring the fine dining experience outdoors. Our outdoor catering setup includes everything from cooking stations to elegant service, perfect for any open-air event.",
      features: ["Mobile kitchen setup", "Weather-proof arrangements", "Live barbecue", "Garden party themes", "Full service team"]
    },
    {
      id: 6,
      title: "Custom Menu Packages",
      icon: "📋",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      description: "Can't find a package that fits? Create your own! We offer fully customizable menu packages tailored to your taste, budget, and event requirements.",
      features: ["Flexible pricing", "Multi-cuisine options", "Tasting sessions", "Diet-specific menus", "Budget-friendly"]
    }
  ],

  showcaseImages: [
    { id: 1, image: "images/plate counter.png", caption: "Our Grand Display Counter" },
    { id: 2, image: "images/Veg_menu.png", caption: "Veg Menu" },
    { id: 3, image: "images/Non veg_menu.png", caption: "Non-Veg Menu" },
    { id: 4, image: "images/IMG_20231011_182714_714.jpg", caption: "Our Catering Setup" }
  ],

  menuCategories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        { id: 1, name: "Paneer Tikka", description: "Marinated cottage cheese grilled to perfection", price: "₹220", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", tag: "veg", special: true },
        { id: 2, name: "Chicken 65", description: "Deep-fried spicy chicken marinated with aromatic spices", price: "₹280", image: "https://images.unsplash.com/photo-1610057099443-fde6c99db9e1?w=400&q=80", tag: "non-veg" },
        { id: 3, name: "Veg Spring Rolls", description: "Crispy rolls filled with mixed vegetables", price: "₹180", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", tag: "veg" },
        { id: 4, name: "Fish Fry", description: "Golden fried fish with traditional spice coating", price: "₹320", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&q=80", tag: "non-veg" }
      ]
    },
    {
      id: "main-course",
      name: "Main Course",
      items: [
        { id: 5, name: "Butter Chicken", description: "Tender chicken in rich tomato-cream gravy", price: "₹350", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", tag: "non-veg", special: true },
        { id: 6, name: "Paneer Butter Masala", description: "Soft paneer cubes in creamy butter sauce", price: "₹280", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", tag: "veg" },
        { id: 7, name: "Dal Makhani", description: "Black lentils slow-cooked with cream and butter", price: "₹220", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", tag: "veg" },
        { id: 8, name: "Mutton Rogan Josh", description: "Aromatic Kashmiri-style mutton curry", price: "₹420", image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80", tag: "non-veg" }
      ]
    },
    {
      id: "rice",
      name: "Rice Items",
      items: [
        { id: 9, name: "Hyderabadi Biryani", description: "Authentic dum-cooked biryani with aromatic spices", price: "₹300", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", tag: "non-veg", special: true },
        { id: 10, name: "Veg Pulao", description: "Fragrant rice with mixed vegetables and spices", price: "₹200", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", tag: "veg" },
        { id: 11, name: "Jeera Rice", description: "Cumin-flavored basmati rice", price: "₹150", image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80", tag: "veg" }
      ]
    },
    {
      id: "curries",
      name: "Curries",
      items: [
        { id: 12, name: "Sambar", description: "Authentic South Indian lentil stew with vegetables", price: "₹120", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", tag: "veg" },
        { id: 13, name: "Rasam", description: "Tangy and spicy South Indian soup", price: "₹100", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", tag: "veg" },
        { id: 14, name: "Chicken Curry", description: "Home-style chicken curry with rich gravy", price: "₹300", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80", tag: "non-veg" }
      ]
    },
    {
      id: "sweets",
      name: "Sweets",
      items: [
        { id: 15, name: "Gulab Jamun", description: "Soft milk-solid balls soaked in sugar syrup", price: "₹80", image: "https://images.unsplash.com/photo-1666190064095-ea0b92e24a09?w=400&q=80", tag: "veg", special: true },
        { id: 16, name: "Double Ka Meetha", description: "Rich Hyderabadi bread pudding with nuts", price: "₹120", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80", tag: "veg" },
        { id: 17, name: "Kheer", description: "Creamy rice pudding with cardamom and saffron", price: "₹100", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", tag: "veg" }
      ]
    },
    {
      id: "packages",
      name: "Special Packages",
      items: [
        { id: 18, name: "Silver Package", description: "10 items buffet for events up to 100 guests", price: "₹450/plate", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80", tag: "veg", special: false },
        { id: 19, name: "Gold Package", description: "15 items buffet with live stations for up to 300 guests", price: "₹650/plate", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", tag: "veg", special: true },
        { id: 20, name: "Platinum Package", description: "20+ items grand buffet with premium items for 500+ guests", price: "₹950/plate", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", tag: "veg", special: true }
      ]
    }
  ],

  gallery: [
    { id: 1, image: "images/Bagaara rice.png", category: "rice", caption: "Bagaara Rice" },
    { id: 2, image: "images/Chicken curry.png", category: "non-veg", caption: "Chicken Curry" },
    { id: 3, image: "images/Mutton curry.png", category: "non-veg", caption: "Mutton Curry" },
    { id: 4, image: "images/mutton chicken curry.png", category: "non-veg", caption: "Mutton Chicken Curry" },
    { id: 5, image: "images/Mirchi bajji.png", category: "starters", caption: "Mirchi Bajji" },
    { id: 6, image: "images/Aloopoosa.png", category: "starters", caption: "Aloo Poosa" },
    { id: 7, image: "images/Pulka.png", category: "breads", caption: "Pulka" },
    { id: 8, image: "images/Rasam.png", category: "veg", caption: "Rasam" },
    { id: 9, image: "images/sambar.png", category: "veg", caption: "Sambar" },
    { id: 10, image: "images/curries_veg.png", category: "veg", caption: "Veg Curries" },
    { id: 11, image: "images/plate counter.png", category: "setup", caption: "Display Counter" },
    { id: 12, image: "images/Veg_menu.png", category: "setup", caption: "Veg Menu Card" },
    { id: 13, image: "images/Non veg_menu.png", category: "setup", caption: "Non-Veg Menu Card" }
  ],

  reviews: [
    {
      id: 1, name: "Priya Sharma", rating: 5, event: "Wedding Reception",
      date: "2024-12-15", status: "approved",
      text: "Absolutely incredible catering service! The food was delicious, the presentation was beautiful, and the team was extremely professional. Our 500 guests were thoroughly impressed."
    },
    {
      id: 2, name: "Rajesh Kumar", rating: 5, event: "Corporate Event",
      date: "2024-11-20", status: "approved",
      text: "We've been using Sri Mahalaxmi Caterers for all our corporate events and they never disappoint. The quality and consistency are unmatched."
    },
    {
      id: 3, name: "Anitha Reddy", rating: 4, event: "Birthday Party",
      date: "2024-10-08", status: "approved",
      text: "Great food and excellent service. The custom menu they created for my daughter's birthday was perfect. Kids loved the special snacks section!"
    },
    {
      id: 4, name: "Mohammed Farhan", rating: 5, event: "Engagement Ceremony",
      date: "2024-09-15", status: "approved",
      text: "The Hyderabadi biryani was out of this world! Every guest complimented the food. The team managed everything smoothly even with 300+ guests."
    },
    {
      id: 5, name: "Lakshmi Devi", rating: 5, event: "Festival Celebration",
      date: "2024-08-22", status: "approved",
      text: "We ordered food for our Ganesh Chaturthi celebration and the sweets were divine. The traditional recipes and authentic taste made our festival truly special."
    },
    {
      id: 6, name: "Suresh Babu", rating: 4, event: "House Warming",
      date: "2024-07-10", status: "approved",
      text: "Very good food quality and reasonable pricing. The team was punctual and set up everything perfectly. Highly recommend for any occasion!"
    }
  ],

  inquiries: [],

  admin: {
    username: "admin",
    password: "admin123"
  }
};

// Data Management Functions
function getData() {
  const stored = localStorage.getItem('smcData');
  if (stored) {
    const parsed = JSON.parse(stored);
    // Merge with DEFAULT_DATA so new fields (like showcaseImages) always get picked up
    const merged = { ...DEFAULT_DATA, ...parsed, showcaseImages: DEFAULT_DATA.showcaseImages, gallery: DEFAULT_DATA.gallery };
    return merged;
  }
  localStorage.setItem('smcData', JSON.stringify(DEFAULT_DATA));
  return DEFAULT_DATA;
}

function saveData(data) {
  localStorage.setItem('smcData', JSON.stringify(data));
}

function resetData() {
  localStorage.setItem('smcData', JSON.stringify(DEFAULT_DATA));
  return DEFAULT_DATA;
}
