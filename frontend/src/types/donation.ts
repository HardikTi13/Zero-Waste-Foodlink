export type DonationStatus = "PENDING_NGO_CONFIRMATION" | "ACCEPTED" | "REJECTED" | "COLLECTED";

export type AiAnalysis = {
    foodType: string;
    estimatedMeals: number;
    freshness: string;
    notesForNGO: string;
};

export type Location = {
    type: "Point";
    coordinates: [number, number];
};

export type Donation = {
    _id: string; // Backend ID
    id: string; // Frontend alias for _id
    restaurantName?: string;
    ngoName?: string;
    foodName: string; // Backend field
    foodType?: string; // Frontend alias for foodName
    description?: string; // Backend field
    quantity: string; // Backend field (e.g. "1 large pizza")
    quantityMeals?: number; // Derived or separate
    aiAnalysis?: AiAnalysis;
    status: DonationStatus;
    createdAt: string;
    expiresAt?: string; // Backend field
    isClaimed?: boolean; // Backend field
    location?: Location; // Backend field
    impact?: {
        co2SavedKg: number;
    };
    imageUrl?: string;
};

export type Stats = {
    totalDonations: number;
    totalMealsServed?: number; // NGO
    totalMealsProvided?: number; // Restaurant
    totalFoodSavedKg?: number; // NGO
    totalCo2SavedKg?: number; // Restaurant
};
