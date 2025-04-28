import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type CartItem = {
  product: {
    id: string;
    name: string;
    categories: string[];
    image: string;
  };
  quantity: number;
  brand?: string;
};

type MarketPrice = {
  marketId: string;
  marketName: string;
  totalPrice: number;
  items: {
    productId: string;
    productName: string;
    price: number;
    brand?: string;
  }[];
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if API key is available
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    const { cartItems } = await req.json() as { cartItems: CartItem[] };

    if (!cartItems || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No cart items provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a prompt for OpenAI
    const prompt = `
    Generate a realistic price comparison for these grocery items in three different supermarkets (Carrefour, Extra, Pão de Açúcar).
    
    Please analyze these items and provide a JSON response with the price of each item in each supermarket:
    ${cartItems.map(item => `- ${item.product.name} (Quantity: ${item.quantity})${item.brand ? ` - Brand: ${item.brand}` : ''} - Categories: ${item.product.categories.join(', ')}`).join('\n')}
    
    Requirements:
    1. Use realistic Brazilian supermarket prices
    2. Consider brand quality (if specified)
    3. Consider quantity
    4. Return results in JSON format with the following structure:
    {
      "marketComparisons": [
        {
          "marketId": "m1",
          "marketName": "Carrefour",
          "totalPrice": 150.75,
          "items": [
            {
              "productId": "[product id]",
              "productName": "[product name]",
              "price": 10.99,
              "brand": "[brand if provided]"
            },
            // other products...
          ]
        },
        // other markets...
      ]
    }
    5. Sort the markets by totalPrice (cheapest first)
    6. Ensure that different stores have different prices for the same items (realistically)
    7. Ensure high quality brands cost more than generic ones

    Only respond with valid JSON, no explanations or other text.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that generates realistic supermarket price comparisons in JSON format for Brazil. You understand Brazilian pricing, brands, and markets.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Parse the JSON response from OpenAI
    let parsedResponse;
    try {
      // Sometimes OpenAI wraps the response in ```json and ```, so we need to clean that up
      const jsonContent = generatedContent.replace(/```json|```/g, '').trim();
      parsedResponse = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse OpenAI response');
    }

    // Ensure the parsed response has the expected structure
    if (!parsedResponse.marketComparisons || !Array.isArray(parsedResponse.marketComparisons)) {
      throw new Error('Invalid response structure from OpenAI');
    }

    // Return the market comparisons
    return new Response(
      JSON.stringify(parsedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-market-comparison function:', error);
    
    // Return a 500 error
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
