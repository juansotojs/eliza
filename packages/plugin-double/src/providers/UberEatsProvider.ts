import { elizaLogger } from '@elizaos/core';
import axios from 'axios';

interface UberEatsConfig {
    clientId: string;
    clientSecret: string;
    accessToken?: string;
    userId: string;
}

interface Restaurant {
    id: string;
    name: string;
    rating: number;
    deliveryEstimate: string;
    categories: string[];
}

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    customizations?: MenuCustomization[];
}

interface MenuCustomization {
    id: string;
    name: string;
    options: {
        id: string;
        name: string;
        price: number;
    }[];
}

interface OrderItem {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
    customizations?: {
        id: string;
        selectedOptions: string[];
    }[];
}

interface Order {
    restaurantId: string;
    items: OrderItem[];
    deliveryAddress: string;
    specialInstructions?: string;
}

export class UberEatsProvider {
    private apiUrl = process.env.UBER_EATS_API_URL;
    private clientId: string;
    private clientSecret: string;
    private accessToken?: string;
    private userId: string;

    constructor(config: UberEatsConfig) {
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.accessToken = config.accessToken;
        this.userId = config.userId;
        elizaLogger.info('[✅ UBEREATS] UberEatsProvider - Initialized');
    }

    private async getHeaders() {
        if (!this.accessToken) {
            await this.authenticate();
        }
        return {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
    }

    private async authenticate(): Promise<void> {
        try {
            elizaLogger.info('[🔄 UBEREATS] UberEatsProvider - Authenticating');

            const response = await axios.post('https://auth.uber.com/token', {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'client_credentials',
                scope: 'eats.order'
            });

            this.accessToken = response.data.access_token;
            elizaLogger.info('[✅ UBEREATS] UberEatsProvider - Authentication successful');
        } catch (error) {
            elizaLogger.error('[❌ UBEREATS] UberEatsProvider - Authentication failed:', error);
            throw error;
        }
    }

    async searchRestaurants(query: string, location: string): Promise<Restaurant[]> {
        try {
            elizaLogger.info('[🔄 UBEREATS] UberEatsProvider - Searching restaurants:', { query, location });

            const response = await axios.get(`${this.apiUrl}/restaurants/search`, {
                headers: await this.getHeaders(),
                params: {
                    q: query,
                    location: location
                }
            });

            return response.data.restaurants;
        } catch (error) {
            elizaLogger.error('[❌ UBEREATS] UberEatsProvider - Restaurant search failed:', error);
            throw error;
        }
    }

    async getMenu(restaurantId: string): Promise<MenuItem[]> {
        try {
            elizaLogger.info('[🔄 UBEREATS] UberEatsProvider - Fetching menu:', restaurantId);

            const response = await axios.get(
                `${this.apiUrl}/restaurants/${restaurantId}/menu`,
                { headers: await this.getHeaders() }
            );

            return response.data.menu_items;
        } catch (error) {
            elizaLogger.error('[❌ UBEREATS] UberEatsProvider - Menu fetch failed:', error);
            throw error;
        }
    }

    async placeOrder(orderData: any): Promise<any> {
        elizaLogger.info('[🔄 DOUBLE] UberEatsProvider - Placing order:',
            JSON.stringify(orderData, null, 2));

        // Return a mock successful response
        return Promise.resolve({
            orderId: `order-${Date.now()}`,
            status: 'CONFIRMED',
            estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
            trackingUrl: 'https://example.com/track',
            paymentStatus: 'COMPLETED'
        });
    }

    async getOrderStatus(orderId: string): Promise<{
        status: string;
        estimatedDelivery: string;
        currentLocation?: { lat: number; lng: number };
    }> {
        try {
            elizaLogger.info('[🔄 UBEREATS] UberEatsProvider - Checking order status:', orderId);

            const response = await axios.get(
                `${this.apiUrl}/orders/${orderId}`,
                { headers: await this.getHeaders() }
            );

            return {
                status: response.data.status,
                estimatedDelivery: response.data.estimated_delivery_time,
                currentLocation: response.data.courier_location
            };
        } catch (error) {
            elizaLogger.error('[❌ UBEREATS] UberEatsProvider - Status check failed:', error);
            throw error;
        }
    }

    async getFavoriteOrders(): Promise<{
        restaurantName: string;
        items: MenuItem[];
    }[]> {
        try {
            elizaLogger.info('[🔄 UBEREATS] UberEatsProvider - Fetching favorite orders');

            const response = await axios.get(
                `${this.apiUrl}/users/${this.userId}/favorites`,
                { headers: await this.getHeaders() }
            );

            return response.data.favorites;
        } catch (error) {
            elizaLogger.error('[❌ UBEREATS] UberEatsProvider - Favorites fetch failed:', error);
            throw error;
        }
    }
}