import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user}}',
            content: {
                text: 'I want to order a large pepperoni pizza with extra cheese from Domino\'s and a Coke',
                action: 'CHECK_ORDER'
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'I\'ve analyzed your order request. Here are the details:',
                action: 'CHECK_ORDER',
                orderAnalysis: {
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
                    estimatedTotal: 20.97
                }
            }
        }
    ],
    [
        {
            user: '{{user}}',
            content: {
                text: 'Get me a double cheeseburger meal from McDonald\'s with large fries, no pickles, extra onions and a Diet Coke',
                action: 'CHECK_ORDER'
            }
        },
        {
            user: 'DoubleAgent',
            content: {
                text: 'Here\'s your order analysis:',
                action: 'CHECK_ORDER',
                orderAnalysis: {
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
                    estimatedTotal: 14.97
                }
            }
        }
    ]
];

export default examples;