const ngos = [
  {
    "_id": "ngo001",
    "name": "Community Food Bank",
    "email": "info@communityfoodbank.org",
    "password": "$2a$10$examplehashedpassword",
    "phone": "+1-555-001-0001",
    "address": {
      "street": "789 Charity Lane",
      "city": "New York",
      "state": "NY",
      "zipCode": "10003",
      "country": "USA"
    },
    "location": {
      "type": "Point",
      "coordinates": [-73.9657, 40.7684]
    },
    "capacity": 500,
    "foodPreferences": ["vegetables", "bakery", "cooked_food"],
    "verified": true,
    "active": true,
    "totalDonationsReceived": 25,
    "createdAt": "2023-01-15T09:00:00Z",
    "updatedAt": "2023-09-06T11:00:00Z"
  },
  {
    "_id": "ngo002",
    "name": "Helping Hands Shelter",
    "email": "contact@helpinghands.org",
    "password": "$2a$10$examplehashedpassword",
    "phone": "+1-555-002-0002",
    "address": {
      "street": "321 Giving Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10004",
      "country": "USA"
    },
    "location": {
      "type": "Point",
      "coordinates": [-73.9957, 40.7384]
    },
    "capacity": 300,
    "foodPreferences": ["cooked_food", "dairy", "beverages"],
    "verified": true,
    "active": true,
    "totalDonationsReceived": 18,
    "createdAt": "2023-02-20T10:30:00Z",
    "updatedAt": "2023-09-05T14:20:00Z"
  },
  {
    "_id": "ngo003",
    "name": "Green Cares Foundation",
    "email": "support@greencare.org",
    "password": "$2a$10$examplehashedpassword",
    "phone": "+1-555-003-0003",
    "address": {
      "street": "654 Eco Road",
      "city": "New York",
      "state": "NY",
      "zipCode": "10005",
      "country": "USA"
    },
    "location": {
      "type": "Point",
      "coordinates": [-73.9557, 40.7784]
    },
    "capacity": 200,
    "foodPreferences": ["fruits", "vegetables", "other"],
    "verified": false,
    "active": true,
    "totalDonationsReceived": 12,
    "createdAt": "2023-03-10T11:45:00Z",
    "updatedAt": "2023-08-30T09:15:00Z"
  }
];

module.exports = ngos;