import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
  
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel plan for a location: Las Vegas , for 3 days for a couple with a cheap budget. Give me a hotel option list with a hotelName, hotel address, price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, rating, Time to travel to the location for 3 days with each day plan with the best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"destination\": \"Las Vegas\",\n  \"duration\": \"3 Days\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$30-$70 per night\",\n      \"hotelImageUrl\": \"https://example.com/excalibur.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0995,\n        \"longitude\": -115.1715\n      },\n      \"rating\": 3.5,\n      \"description\": \"Affordable and themed hotel with a medieval castle motif, offering multiple pools, entertainment, and dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$25-$60 per night\",\n      \"hotelImageUrl\": \"https://example.com/circuscircus.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1171,\n        \"longitude\": -115.1708\n      },\n      \"rating\": 3,\n      \"description\": \"Family-friendly hotel featuring a circus theme, an indoor amusement park, and various dining and entertainment options.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3535 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$90 per night\",\n      \"hotelImageUrl\": \"https://example.com/thelinq.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1102,\n        \"longitude\": -115.1719\n      },\n      \"rating\": 4,\n      \"description\": \"Trendy and lively hotel with a central location on the Strip, offering a variety of dining, entertainment, and shopping options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",\n          \"placeDetails\": \"Iconic landmark for a classic photo opportunity.\",\n          \"placeImageUrl\": \"https://example.com/welcometolasvegas.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0889,\n            \"longitude\": -115.1748\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Morning (less crowded)\"\n        },\n        {\n          \"placeName\": \"The Strip Walking Tour\",\n          \"placeDetails\": \"Explore the iconic Las Vegas Strip with its dazzling lights, themed hotels, and street performers.\",\n          \"placeImageUrl\": \"https://example.com/thestrip.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1096,\n            \"longitude\": -115.1745\n          },\n          \"ticketPricing\": \"Free (except for attractions inside hotels)\",\n          \"rating\": 4,\n          \"bestTimeToVisit\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Stunning indoor garden with elaborate floral displays that change seasonally.\",\n          \"placeImageUrl\": \"https://example.com/bellagiogardens.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1126,\n            \"longitude\": -115.1767\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Late afternoon/Early Evening\"\n        },\n        {\n          \"placeName\": \"Fountains of Bellagio Show\",\n          \"placeDetails\": \"Free choreographed water show set to music and lights.\",\n          \"placeImageUrl\": \"https://example.com/bellagiofountains.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1128,\n            \"longitude\": -115.1764\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 5,\n          \"bestTimeToVisit\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Pedestrian mall with a massive LED canopy, live music, and street performers.\",\n          \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1695,\n            \"longitude\": -115.1408\n          },\n          \"ticketPricing\": \"Free (except for attractions and zip line)\",\n          \"rating\": 4,\n          \"bestTimeToVisit\": \"Evening (for the light show)\"\n        },\n        {\n          \"placeName\": \"Mob Museum\",\n          \"placeDetails\": \"Museum dedicated to the history of organized crime and law enforcement in Las Vegas.\",\n          \"placeImageUrl\": \"https://example.com/mobmuseum.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1701,\n            \"longitude\": -115.1415\n          },\n          \"ticketPricing\": \"$29.95 per person\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"Outdoor museum showcasing vintage neon signs from old Las Vegas businesses.\",\n          \"placeImageUrl\": \"https://example.com/neonmuseum.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1616,\n            \"longitude\": -115.1386\n          },\n          \"ticketPricing\": \"$22 per person\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Late afternoon/Early Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"Giant Ferris wheel offering panoramic views of the Las Vegas Strip and surroundings.\",\n          \"placeImageUrl\": \"https://example.com/highroller.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1161,\n            \"longitude\": -115.1748\n          },\n          \"ticketPricing\": \"$24.95 per person (daytime)\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Daytime (for clear views)\"\n        },\n        {\n          \"placeName\": \"Seven Magic Mountains\",\n          \"placeDetails\": \"Public art installation featuring seven colorful stacked boulders.\",\n          \"placeImageUrl\": \"https://example.com/sevenmagicmountains.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 35.9668,\n            \"longitude\": -114.9349\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4,\n          \"bestTimeToVisit\": \"Sunrise or Sunset (for golden hour photography)\"\n        },\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"Historic dam and engineering marvel offering tours and scenic views.\",\n          \"placeImageUrl\": \"https://example.com/hooverdam.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0162,\n            \"longitude\": -114.7374\n          },\n          \"ticketPricing\": \"$30 per vehicle\",\n          \"rating\": 4.5,\n          \"bestTimeToVisit\": \"Daytime\"\n        }\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
   