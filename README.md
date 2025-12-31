# MyCommuteData

Get **exact commute times** instead of vague ranges. MyCommuteData tracks your routes at specific times and days to give you real traffic data based on actual conditions.

## What is MyCommuteData?

Traditional map apps show you estimated ranges like "25-45 minutes" which aren't helpful for planning. MyCommuteData solves this by:

1. **Recording real commute times** - The app checks your routes at the times you specify using Google Maps traffic data
2. **Building historical data** - Over time, you'll see patterns for each day and time
3. **Providing exact insights** - Know that your Monday 8am commute averages 32 minutes, not "25-45 minutes"

## Features

- **Route Management** - Add multiple routes with origin and destination addresses
- **Flexible Scheduling** - Set specific check times and days for each route
- **Traffic-Aware Data** - Uses Google Maps Directions API for real-time traffic conditions
- **Historical Tracking** - View all recorded commute times in route history
- **Data Patterns** - Analyze trends across different days and times

## How to Use

1. **Sign Up** - Create an account to get started
2. **Add Your Google Maps API Key** - Go to Settings and enter your API key
3. **Create Routes** - Add routes with your origin, destination, and when to check
4. **Enable Routes** - Toggle routes active to start collecting data
5. **View Results** - Check your dashboard for recent results and route history for patterns

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (Database, Auth, Edge Functions)
- Google Maps Directions API

## Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

Deploy via [Lovable](https://lovable.dev) - click Share → Publish.
