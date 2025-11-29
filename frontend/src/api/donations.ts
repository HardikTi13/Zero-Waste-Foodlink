const API_URL = 'http://localhost:5001/api';

export const analyzeImage = async (formData: FormData) => {
    try {
        const response = await fetch(`${API_URL}/donations/analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to analyze image');
        }

        return await response.json();
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error;
    }
};

export const createDonation = async (formData: FormData) => {
    try {
        const response = await fetch(`${API_URL}/donations`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create donation');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating donation:', error);
        throw error;
    }
};
