export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
  tags: string[];
};

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Fork',
    cuisine: 'American Grill',
    rating: 4.8,
    deliveryTime: '25–35 min',
    deliveryFee: '$1.99',
    image: 'https://picsum.photos/seed/restaurant1/400/250',
    tags: ['Burgers', 'Wings', 'Fries'],
  },
  {
    id: '2',
    name: 'Sakura Garden',
    cuisine: 'Japanese',
    rating: 4.7,
    deliveryTime: '30–45 min',
    deliveryFee: '$2.49',
    image: 'https://picsum.photos/seed/restaurant2/400/250',
    tags: ['Sushi', 'Ramen', 'Bento'],
  },
  {
    id: '3',
    name: 'Bella Napoli',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: '20–30 min',
    deliveryFee: '$1.49',
    image: 'https://picsum.photos/seed/restaurant3/400/250',
    tags: ['Pizza', 'Pasta', 'Risotto'],
  },
  {
    id: '4',
    name: 'Spice Route',
    cuisine: 'Indian',
    rating: 4.9,
    deliveryTime: '35–50 min',
    deliveryFee: '$2.99',
    image: 'https://picsum.photos/seed/restaurant4/400/250',
    tags: ['Curry', 'Biryani', 'Naan'],
  },
  {
    id: '5',
    name: 'El Rancho',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '20–35 min',
    deliveryFee: '$1.99',
    image: 'https://picsum.photos/seed/restaurant5/400/250',
    tags: ['Tacos', 'Burritos', 'Quesadillas'],
  },
  {
    id: '6',
    name: 'Dragon Palace',
    cuisine: 'Chinese',
    rating: 4.6,
    deliveryTime: '25–40 min',
    deliveryFee: '$2.19',
    image: 'https://picsum.photos/seed/restaurant6/400/250',
    tags: ['Dim Sum', 'Noodles', 'Fried Rice'],
  },
];

export default restaurants;