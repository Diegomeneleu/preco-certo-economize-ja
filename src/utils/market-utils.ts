
import { CartItem, MarketPrice } from '@/types/shopping';

/**
 * Generate market comparisons for the given cart items
 * 
 * @param cartItems - Items in the shopping cart
 * @param location - User's location string (city, state)
 * @param searchRadius - Search radius in kilometers
 * @returns Promise<MarketPrice[]> - List of market comparisons
 */
export const generateMarketComparisons = async (
  cartItems: CartItem[],
  location: string | null,
  searchRadius: number
): Promise<MarketPrice[]> => {
  try {
    // In a production environment, we would use Google Places API here
    // For now, we'll use a mock implementation or edge function if available
    
    try {
      // Call OpenAI Edge Function with updated radius parameter
      const response = await fetch('/api/generate-market-comparison', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems,
          location: location || 'Brasil',
          radius: searchRadius
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate comparison');
      }
      
      const data = await response.json();
      return data.marketComparisons;
    } catch (error) {
      console.error('Error generating comparison:', error);
      
      // Fallback to mock data if API fails
      return generateMockComparison(cartItems, location, searchRadius);
    }
  } catch (error) {
    console.error('Error generating market comparisons:', error);
    return generateMockComparison(cartItems, location, searchRadius);
  }
};

/**
 * Generate mock market comparison data for development and fallback purposes
 * 
 * @param cartItems - Items in the shopping cart
 * @param location - User's location string
 * @param searchRadius - Search radius in kilometers
 * @returns MarketPrice[] - List of mock market comparisons
 */
export const generateMockComparison = (
  cartItems: CartItem[], 
  location: string | null,
  searchRadius: number
): MarketPrice[] => {
  // Generate supermarkets based on location if available
  const regionSupermarkets: Record<string, string[]> = {
    'São Paulo': ['Extra', 'Pão de Açúcar', 'Carrefour', 'Dia'],
    'Rio de Janeiro': ['Guanabara', 'Mundial', 'Prezunic', 'Zona Sul'],
    'Minas Gerais': ['Supernosso', 'BH Supermercados', 'EPA', 'Mineirão'],
    'Bahia': ['GBarbosa', 'Bompreço', 'Atakarejo', 'Perini'],
    'Paraná': ['Condor', 'Muffato', 'Festval', 'Super Muffato'],
    'Santa Catarina': ['Angeloni', 'Bistek', 'Imperatriz', 'Giassi'],
  };

  // Default supermarkets if location not recognized or available
  let supermarkets = [
    { id: 'm1', name: 'Carrefour' },
    { id: 'm2', name: 'Extra' },
    { id: 'm3', name: 'Pão de Açúcar' },
  ];

  // The bigger the radius, the more markets we should include
  const marketCount = Math.min(3 + Math.floor(searchRadius / 5), 6); // 3-6 markets based on radius

  if (location) {
    // Try to find markets based on user's location
    for (const [region, markets] of Object.entries(regionSupermarkets)) {
      if (location.includes(region)) {
        // Take a subset of markets based on the search radius
        supermarkets = markets.slice(0, marketCount).map((name, index) => ({
          id: `m${index + 1}`,
          name
        }));
        break;
      }
    }
  }

  // Generate random prices for each product in each supermarket
  const comparisons = supermarkets.map(market => {
    const items = cartItems.map(item => {
      // Base price varies by market, product and brand
      let basePrice = 5 + Math.random() * 15;
      
      // Premium brands cost more
      if (item.brand && ['Nestlé', 'Tio João', 'Dove', 'Omo'].includes(item.brand)) {
        basePrice *= 1.2;
      }
      
      // Price per item
      const pricePerUnit = parseFloat(basePrice.toFixed(2));
      
      return {
        productId: item.product.id,
        productName: item.product.name,
        price: parseFloat((pricePerUnit * item.quantity).toFixed(2)),
        pricePerUnit: pricePerUnit,
        brand: item.brand
      };
    });

    const totalPrice = parseFloat(items.reduce((sum, item) => sum + item.price, 0).toFixed(2));
    
    return {
      marketId: market.id,
      marketName: market.name,
      totalPrice,
      items
    };
  });

  // Sort by total price
  return comparisons.sort((a, b) => a.totalPrice - b.totalPrice);
};

/**
 * For a production environment, here's how we would implement 
 * Google Places API to find nearby supermarkets
 * 
 * Note: This is a placeholder and would require a Google API key and
 * proper implementation in a real application
 */
export const findNearbySupermarkets = async (
  latitude: number,
  longitude: number,
  radius: number
): Promise<any[]> => {
  // This would be implemented with Google Places API in production
  // Example implementation (commented out since we don't have an API key):
  /*
  const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius*1000}&type=supermarket&key=${googleApiKey}`
  );
  
  const data = await response.json();
  
  return data.results.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    vicinity: place.vicinity,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng
  }));
  */
  
  // For now, return an empty array
  return [];
};
