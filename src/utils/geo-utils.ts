
/**
 * Utility functions for geolocation using OpenStreetMap
 */

/**
 * Get current location using browser geolocation API and 
 * convert to address using OpenStreetMap Nominatim
 * 
 * @returns {Promise<string|null>} Location string (city, state) or null if not available
 */
export const fetchLocation = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return resolve(null);
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          resolve(address);
        } catch (error) {
          console.error("Error fetching location details:", error);
          resolve(null);
        }
      },
      (error) => {
        console.log("Geolocation error:", error.message);
        resolve(null);
      }
    );
  });
};

/**
 * Reverse geocode coordinates to address using OpenStreetMap Nominatim
 * 
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string|null>} Location string (city, state) or null
 */
export const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    // Use OpenStreetMap Nominatim for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      {
        headers: {
          'Accept-Language': 'pt-BR', // Prefer Portuguese results
          'User-Agent': 'ShoppingComparison/1.0' // Identify application (important for OSM API)
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`OpenStreetMap API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get city and state from the address
    const city = data.address?.city || data.address?.town || data.address?.village;
    const state = data.address?.state;
    
    if (city && state) {
      return `${city}, ${state}`;
    } else if (city) {
      return city;
    } else if (state) {
      return state;
    }
    
    return null;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
};

/**
 * Forward geocode address to coordinates
 * 
 * @param {string} address - Address to geocode
 * @returns {Promise<{latitude: number, longitude: number} | null>} Coordinates or null
 */
export const forwardGeocode = async (address: string): Promise<{ latitude: number, longitude: number } | null> => {
  try {
    // Use OpenStreetMap Nominatim for forward geocoding
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
      {
        headers: {
          'Accept-Language': 'pt-BR', // Prefer Portuguese results
          'User-Agent': 'ShoppingComparison/1.0' // Identify application (important for OSM API)
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`OpenStreetMap API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error in forward geocoding:", error);
    return null;
  }
};
