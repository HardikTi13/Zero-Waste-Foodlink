export type DonationStatus = "PENDING_NGO_CONFIRMATION" | "ACCEPTED" | "REJECTED" | "COLLECTED";

export type AiAnalysis = {
    foodType: string;
    estimatedMeals: number;
    freshness: string;
    notesForNGO: string;
};

export type Donation = {
    id: string;
    restaurantName?: string; // For NGO view
    ngoName?: string; // For Restaurant view
    foodType?: string; // For Restaurant view (or unified)
    quantityMeals?: number; // For Restaurant view
    aiAnalysis?: AiAnalysis; // For NGO view
    status: DonationStatus;
    createdAt: string;
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
