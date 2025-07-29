#!/bin/bash

echo "🔧 Testing Fixes for Car Mart"
echo "============================="

# Use existing debug user token
echo "1️⃣ Login with debug user..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "debug@carmart.com", 
    "password": "password123"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token')
echo "✅ Token obtained: ${TOKEN:0:20}..."
echo ""

# Test Fix 1: User Profile
echo "2️⃣ Testing user profile fix..."
PROFILE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/users/profile)

PROFILE_SUCCESS=$(echo "$PROFILE_RESPONSE" | jq -r '.success')
if [ "$PROFILE_SUCCESS" = "true" ]; then
    echo "✅ User profile working!"
    echo "$PROFILE_RESPONSE" | jq '.data | {id, email, first_name, last_name, account_type}'
else
    echo "❌ User profile still broken"
    echo "$PROFILE_RESPONSE" | jq .
fi
echo ""

# Test Fix 2: Vehicle Creation with "Used" condition
echo "3️⃣ Testing vehicle creation with 'Used' condition..."
VEHICLE_RESPONSE=$(curl -s -X POST http://localhost:3001/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Fixed Vehicle Test",
    "make": "Honda",
    "model": "Civic", 
    "year": 2020,
    "price": 3000000,
    "fuel_type": "Petrol",
    "transmission": "Manual",
    "body_type": "Sedan",
    "condition": "Used",
    "location": "Colombo"
  }')

VEHICLE_SUCCESS=$(echo "$VEHICLE_RESPONSE" | jq -r '.success')
if [ "$VEHICLE_SUCCESS" = "true" ]; then
    echo "✅ Vehicle creation working!"
    VEHICLE_ID=$(echo "$VEHICLE_RESPONSE" | jq -r '.data.id')
    echo "Created vehicle ID: $VEHICLE_ID"
    echo "$VEHICLE_RESPONSE" | jq '.data | {id, title, make, model, condition, price}'
else
    echo "❌ Vehicle creation still broken"
    echo "$VEHICLE_RESPONSE" | jq .
fi
echo ""

echo "🎉 FIX TESTING COMPLETE!"
echo "========================"