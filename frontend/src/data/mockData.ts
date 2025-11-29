import { type Donation } from '../types/donation';

export const mockDonations: Donation[] = [
    {
        _id: "d1",
        id: "d1",
        restaurantName: "Spicy Bites",
        ngoName: "Hope Foundation",
        foodName: "Curry & Rice",
        foodType: "Curry & Rice",
        quantity: "20 meals",
        quantityMeals: 20,
        status: "PENDING_NGO_CONFIRMATION",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
        impact: { co2SavedKg: 8.5 },
        location: { type: "Point", coordinates: [77.5946, 12.9716] },
        aiAnalysis: {
            foodType: "Curry & Rice",
            estimatedMeals: 20,
            freshness: "Good for 4 hours",
            notesForNGO: "Contains dairy, spicy."
        },
        imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop"
    },
    {
        _id: "d2",
        id: "d2",
        restaurantName: "Green Salad Bar",
        ngoName: "Food Angels",
        foodName: "Mixed Greens",
        foodType: "Mixed Greens",
        quantity: "15 meals",
        quantityMeals: 15,
        status: "ACCEPTED",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
        impact: { co2SavedKg: 4.2 },
        location: { type: "Point", coordinates: [77.6, 12.98] },
        aiAnalysis: {
            foodType: "Mixed Greens",
            estimatedMeals: 15,
            freshness: "Good for 2 hours",
            notesForNGO: "Keep refrigerated."
        },
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
    },
    {
        _id: "d3",
        id: "d3",
        restaurantName: "Bakery Delights",
        ngoName: "Community Kitchen",
        foodName: "Assorted Breads",
        foodType: "Assorted Breads",
        quantity: "50 meals",
        quantityMeals: 50,
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        expiresAt: new Date(Date.now() - 80000000).toISOString(),
        impact: { co2SavedKg: 15.0 },
        location: { type: "Point", coordinates: [77.62, 12.95] },
        aiAnalysis: {
            foodType: "Assorted Breads",
            estimatedMeals: 50,
            freshness: "Good for 24 hours",
            notesForNGO: "Contains gluten."
        },
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"
    },
    {
        _id: "d4",
        id: "d4",
        restaurantName: "Pizza Palace",
        ngoName: "Hope Foundation",
        foodName: "Pasta Trays",
        foodType: "Pasta Trays",
        quantity: "30 meals",
        quantityMeals: 30,
        status: "COLLECTED",
        imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        expiresAt: new Date(Date.now() - 170000000).toISOString(),
        impact: { co2SavedKg: 12.8 },
        location: { type: "Point", coordinates: [77.58, 12.96] }
    },
    {
        _id: "d5",
        id: "d5",
        restaurantName: "Burger Joint",
        ngoName: "Food Angels",
        foodName: "Veggie Burgers",
        foodType: "Veggie Burgers",
        quantity: "25 meals",
        quantityMeals: 25,
        status: "REJECTED",
        imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        expiresAt: new Date(Date.now() - 250000000).toISOString(),
        impact: { co2SavedKg: 0 },
        location: { type: "Point", coordinates: [77.57, 12.94] }
    }
];
