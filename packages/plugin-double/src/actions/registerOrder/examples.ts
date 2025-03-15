import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user}}',
            content: {
                text: 'Place my order for a large pepperoni pizza with extra cheese from Domino\'s and a Coke',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "Domino's Pizza",
                        type: "Pizza",
                        cuisine: "Italian-American"
                    },
                    items: [
                        {
                            name: "Pepperoni Pizza",
                            size: "Large",
                            customizations: [
                                {
                                    type: "add",
                                    item: "Extra Cheese",
                                    price: 2.99
                                }
                            ],
                            quantity: 1,
                            basePrice: 14.99
                        },
                        {
                            name: "Coca-Cola",
                            size: "Regular",
                            quantity: 1,
                            basePrice: 2.99
                        }
                    ],
                    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
                    estimatedTotal: 20.97
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Order placed successfully! Your order will be delivered in approximately 30-45 minutes.',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "DOM-12345",
                    status: "CONFIRMED",
                    estimatedDelivery: "30-45 minutes",
                    trackingUrl: "https://dominos.com/track/DOM-12345",
                    paymentStatus: "COMPLETED",
                    total: 20.97
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Order my McDonald\'s meal: double cheeseburger combo with large fries, no pickles, extra onions and a Diet Coke for pickup',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "McDonald's",
                        type: "Fast Food",
                        cuisine: "American"
                    },
                    items: [
                        {
                            name: "Double Cheeseburger Meal",
                            customizations: [
                                {
                                    type: "remove",
                                    item: "Pickles"
                                },
                                {
                                    type: "add",
                                    item: "Extra Onions"
                                }
                            ],
                            sides: [
                                {
                                    name: "French Fries",
                                    size: "Large",
                                    basePrice: 3.99
                                }
                            ],
                            drinks: [
                                {
                                    name: "Diet Coke",
                                    size: "Regular",
                                    basePrice: 1.99
                                }
                            ],
                            quantity: 1,
                            basePrice: 8.99
                        }
                    ],
                    pickupDetails: {
                        location: "McDonald's - Times Square",
                        preferredTime: "ASAP"
                    },
                    estimatedTotal: 14.97
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Order confirmed for pickup! Your order will be ready in approximately 15-20 minutes.',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "MCD-67890",
                    status: "CONFIRMED",
                    estimatedPickup: "15-20 minutes",
                    pickupLocation: "McDonald's - Times Square",
                    pickupCode: "2468",
                    paymentStatus: "COMPLETED",
                    total: 14.97
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Order a 2-entree plate from Panda Express with orange chicken, beijing beef, and fried rice',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "Panda Express",
                        type: "Fast Food",
                        cuisine: "Chinese-American"
                    },
                    items: [
                        {
                            name: "2-Entree Plate",
                            customizations: [
                                {
                                    type: "entree",
                                    item: "Orange Chicken"
                                },
                                {
                                    type: "entree",
                                    item: "Beijing Beef"
                                },
                                {
                                    type: "side",
                                    item: "Fried Rice"
                                }
                            ],
                            quantity: 1,
                            basePrice: 10.99
                        }
                    ],
                    pickupDetails: {
                        location: "Panda Express - Downtown",
                        preferredTime: "ASAP"
                    },
                    estimatedTotal: 10.99
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Your Panda Express order has been confirmed for pickup! It will be ready in approximately 10-15 minutes.',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "PEX-23456",
                    status: "CONFIRMED",
                    estimatedPickup: "10-15 minutes",
                    pickupLocation: "Panda Express - Downtown",
                    pickupCode: "3579",
                    paymentStatus: "COMPLETED",
                    total: 10.99
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Get me a Double-Double Animal Style with Animal Style fries and a chocolate shake from In-N-Out',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "In-N-Out Burger",
                        type: "Fast Food",
                        cuisine: "American"
                    },
                    items: [
                        {
                            name: "Double-Double Burger",
                            customizations: [
                                {
                                    type: "style",
                                    item: "Animal Style"
                                }
                            ],
                            quantity: 1,
                            basePrice: 4.50
                        },
                        {
                            name: "French Fries",
                            customizations: [
                                {
                                    type: "style",
                                    item: "Animal Style",
                                    price: 1.00
                                }
                            ],
                            quantity: 1,
                            basePrice: 2.00
                        },
                        {
                            name: "Chocolate Shake",
                            size: "Regular",
                            quantity: 1,
                            basePrice: 3.00
                        }
                    ],
                    deliveryAddress: "456 Tech Lane, San Francisco, CA 94107",
                    estimatedTotal: 10.50
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Your In-N-Out order is confirmed! It will be delivered to you in approximately 25-35 minutes.',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "INO-54321",
                    status: "CONFIRMED",
                    estimatedDelivery: "25-35 minutes",
                    trackingUrl: "https://delivery.in-n-out.com/track/INO-54321",
                    paymentStatus: "COMPLETED",
                    total: 10.50
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Order a Super Burger with garlic fries and a strawberry milkshake from Super Duper',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "Super Duper Burgers",
                        type: "Fast Casual",
                        cuisine: "American"
                    },
                    items: [
                        {
                            name: "Super Burger",
                            customizations: [
                                {
                                    type: "add",
                                    item: "Cheese",
                                    price: 1.50
                                },
                                {
                                    type: "add",
                                    item: "Bacon",
                                    price: 2.00
                                }
                            ],
                            quantity: 1,
                            basePrice: 8.50
                        },
                        {
                            name: "Garlic Fries",
                            size: "Regular",
                            quantity: 1,
                            basePrice: 4.00
                        },
                        {
                            name: "Strawberry Milkshake",
                            size: "Regular",
                            quantity: 1,
                            basePrice: 5.50
                        }
                    ],
                    pickupDetails: {
                        location: "Super Duper - Marina",
                        preferredTime: "6:00 PM"
                    },
                    estimatedTotal: 21.50
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Your Super Duper order is confirmed for pickup at 6:00 PM from the Marina location!',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "SD-78901",
                    status: "CONFIRMED",
                    estimatedPickup: "6:00 PM",
                    pickupLocation: "Super Duper - Marina",
                    pickupCode: "9753",
                    paymentStatus: "COMPLETED",
                    total: 21.50
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Order 4 tacos de asada and a ceviche with horchata from Taqueria El Farolito',
                action: 'REGISTER_ORDER',
                orderDetails: {
                    restaurant: {
                        name: "Taqueria El Farolito",
                        type: "Casual Dining",
                        cuisine: "Mexican"
                    },
                    items: [
                        {
                            name: "Tacos de Asada",
                            customizations: [
                                {
                                    type: "add",
                                    item: "Cilantro"
                                },
                                {
                                    type: "add",
                                    item: "Onions"
                                },
                                {
                                    type: "add",
                                    item: "Salsa Verde"
                                }
                            ],
                            quantity: 4,
                            basePrice: 3.50
                        },
                        {
                            name: "Ceviche",
                            size: "Regular",
                            quantity: 1,
                            basePrice: 12.99
                        },
                        {
                            name: "Horchata",
                            size: "Large",
                            quantity: 1,
                            basePrice: 3.99
                        }
                    ],
                    deliveryAddress: "789 Mission St, San Francisco, CA 94103",
                    estimatedTotal: 30.98
                }
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Your order from Taqueria El Farolito has been confirmed! Your food will be delivered in approximately 30-40 minutes.',
                action: 'REGISTER_ORDER',
                orderConfirmation: {
                    orderId: "TEF-13579",
                    status: "CONFIRMED",
                    estimatedDelivery: "30-40 minutes",
                    trackingUrl: "https://delivery.elfarolito.com/track/TEF-13579",
                    paymentStatus: "COMPLETED",
                    total: 30.98
                }
            }
        }
    ]
];

export default examples;