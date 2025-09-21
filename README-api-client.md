# Travel API Client

A Node.js client for the Travel Planner API that orchestrates multiple API calls to create comprehensive travel plans.

## Features

- 🗓️ **Itinerary Generation**: Creates day-by-day travel itineraries
- 🚗 **Travel Options**: Finds transportation options between cities
- 🍽️ **Food Recommendations**: Discovers local food outlets and restaurants
- 🏥 **Health Monitoring**: Built-in API health checks
- 📊 **Comprehensive Logging**: Detailed request/response logging
- 🔄 **Error Handling**: Robust error handling with retry logic

## Installation

```bash
# Install dependencies
npm install axios
# or
pnpm add axios
```

## Usage

### Basic Usage

```javascript
const { executeTravelPlan } = require('./travel-api-client');

const travelPlan = {
  home_city: "Mumbai",
  destination_city: "Goa",
  num_days: 3,
  interests: ["beaches", "nightlife", "local cuisine"]
};

const result = await executeTravelPlan(travelPlan);
console.log(result);
```

### Individual Functions

```javascript
const { 
  generateItinerary, 
  getTravelOptionsForItinerary, 
  getFoodOptions, 
  checkHealth 
} = require('./travel-api-client');

// Check API health
const isHealthy = await checkHealth();

// Generate itinerary only
const itinerary = await generateItinerary({
  home_city: "Pune",
  destination_city: "Himachal Pradesh",
  num_days: 5,
  interests: ["history", "culture", "snow"]
});

// Get food options for a city
const foodOptions = await getFoodOptions("Jaipur", ["Rajasthani", "Street Food"]);
```

## API Endpoints Used

The client makes requests to the following endpoints:

1. **POST /travel/itinerary** - Generate travel itinerary
2. **POST /travel/options** - Get travel options between cities  
3. **POST /travel/food** - Get food recommendations
4. **GET /health/detailed** - API health check

## Request/Response Flow

```
1. Generate Itinerary
   ├── Input: home_city, destination_city, num_days, interests
   └── Output: Detailed day-by-day itinerary

2. Get Travel Options
   ├── Extract city pairs from itinerary
   ├── Request travel options for each pair
   └── Compile transportation options

3. Get Food Options
   ├── Input: destination city + preferences
   └── Output: Local restaurants and food outlets

4. Combine Results
   └── Return comprehensive travel plan
```

## Testing

### Run Test Suite
```bash
node test-api-client.js test
```

### Test Specific Plan Types
```bash
node test-api-client.js plan short   # 2-day trip
node test-api-client.js plan medium  # 4-day trip  
node test-api-client.js plan long    # 7-day trip
```

### Health Check Only
```bash
node test-api-client.js health
```

## Example Plans

### Short Trip (2 days)
```javascript
{
  home_city: "Bangalore",
  destination_city: "Mysore", 
  num_days: 2,
  interests: ["temples", "palaces", "local food"]
}
```

### Medium Trip (4 days)
```javascript
{
  home_city: "Mumbai",
  destination_city: "Goa",
  num_days: 4, 
  interests: ["beaches", "nightlife", "seafood", "water sports"]
}
```

### Long Trip (7 days)
```javascript
{
  home_city: "Chennai",
  destination_city: "Kerala",
  num_days: 7,
  interests: ["backwaters", "hill stations", "ayurveda", "cultural shows"]
}
```

## Output Format

The client returns a comprehensive object containing:

```javascript
{
  itinerary: {
    home_city: string,
    destination_city: string,
    num_days: number,
    days: Array<ItineraryDay>,
    overall_tips: Array<string>
  },
  travelOptions: Array<{
    route: string,
    options: TravelOptionsResponse
  }>,
  foodOptions: {
    city: string,
    outlets: Array<FoodOutlet>
  },
  generatedAt: string
}
```

## Error Handling

- **Connection Errors**: Automatic retry with exponential backoff
- **API Errors**: Graceful degradation (continues with partial results)
- **Validation Errors**: Clear error messages with debugging info
- **Timeout Handling**: 30-second timeout per request

## Configuration

```javascript
// Base configuration in travel-api-client.js
const BASE_URL = 'http://localhost:8000';
const TIMEOUT = 30000; // 30 seconds
```

## Prerequisites

- Node.js 14+
- Travel Planner API server running on localhost:8000
- Network access to the API server

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure API server is running on localhost:8000
   - Check firewall settings

2. **Timeout Errors**  
   - Increase timeout in configuration
   - Check API server performance

3. **Empty Results**
   - Verify city names are correctly spelled
   - Check API server logs for errors

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=travel-api-client node test-api-client.js test
```

## License

MIT License
