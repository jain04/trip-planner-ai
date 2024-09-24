export const SelectTravelsList=[
    {
        id:1,
        title:'Just me',
        desc:'A sole travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🍷',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving Adv',
        icon:'🏡',
        people:'3 to 5 Peoples'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of trill-seekers',
        icon:'⛵',
        people:'5 to 10 Peoples'
    }
]

export const SelectBudgetOption = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'stay conscious of cost',
      icon: '💸'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'keep cost on the average side',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Dont worry about the cost',
      icon: '🤑'
    }
  ];
  

export const AI_PROMPT='Generate Travel plan for a location:{location} , for {totalDays} days for a {traveler}  with a {budget} budget. Give me a hotel option list with a hotelName, hotel address, price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, rating, Time to travel to the location for {totalDays} days with each day plan with the best time to visit in JSON format '