#!/bin/bash

echo "🔍 Car Mart Login Debug Test"
echo "=============================="

# Test with existing user
echo "1️⃣ Logging in with existing debug user..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "debug@carmart.com",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq .

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token // empty')

if [ "$TOKEN" = "" ] || [ "$TOKEN" = "null" ]; then
    echo "❌ Login failed"
    exit 1
fi

echo ""
echo "2️⃣ Testing protected route with fixed auth..."
echo "Watch your server logs for debug information!"
echo ""

# Test protected route
curl -X POST http://localhost:3001/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Fixed Auth Test Vehicle",
    "make": "Toyota", 
    "model": "Fixed",
    "year": 2020,
    "price": 1000000,
    "fuel_type": "Petrol",
    "transmission": "Manual",
    "body_type": "Sedan",
    "location": "Colombo"
  }' | jq .

echo ""
echo "3️⃣ Check server terminal for debug messages!"