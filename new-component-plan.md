### New Component Research and Planning

# Component I choose: express-rate-limit

# Why I choose this component?
Adding basic rate limiting to defend the API so that no user/IP makes too many requests in a given time frame is one of the easiest practical security suggestions from the above. This is one of the easiest security measures to implement alongside helmet.js, CORS and etc.

# Implementation Plan:
1. Installing the package: npm install express-rate-limit
2. Creating a new middleware file: src/api/v1/middleware/rateLimiter.ts
3. Using reasonable rate limits like for example: 100 requests per 15 minutes per IP address.
4. Middleware can be registered globally or in the main routes (Projects, Tasks, Comments).
5. Properly handle rate limit error and return 429 response code with specific details
6. Test the middleware with Jest.

# Integration plan:
This will be developed in Milestone 2 when we have CRUD working and won't impact any existing business logic or implementation.

# Status: Ready for Milestone 2 (waiting for instructor approval).