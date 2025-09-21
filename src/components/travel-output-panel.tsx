"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  Phone,
  Utensils,
  Camera,
  Navigation,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react"
import GoogleMaps from "./GoogleMaps"

export default function TravelOutputPanel() {
  const [activeTab, setActiveTab] = useState("overview")
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set())

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favoriteItems)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
    }
    setFavoriteItems(newFavorites)
  }

  const sampleItinerary = [
    {
      id: "day1",
      day: 1,
      title: "Arrival & City Center",
      activities: [
        { time: "10:00 AM", activity: "Arrive at Tokyo Haneda Airport", location: "Haneda Airport" },
        { time: "12:00 PM", activity: "Check into hotel", location: "Shibuya District" },
        { time: "2:00 PM", activity: "Explore Shibuya Crossing", location: "Shibuya" },
        { time: "6:00 PM", activity: "Dinner at traditional restaurant", location: "Shibuya" },
      ],
      budget: "$150-200",
    },
    {
      id: "day2",
      day: 2,
      title: "Cultural Experience",
      activities: [
        { time: "9:00 AM", activity: "Visit Senso-ji Temple", location: "Asakusa" },
        { time: "11:00 AM", activity: "Traditional market shopping", location: "Nakamise Street" },
        { time: "1:00 PM", activity: "Lunch at local ramen shop", location: "Asakusa" },
        { time: "3:00 PM", activity: "Tokyo National Museum", location: "Ueno" },
        { time: "7:00 PM", activity: "Dinner in Ginza", location: "Ginza" },
      ],
      budget: "$120-180",
    },
  ]

  const sampleHotels = [
    {
      id: "hotel1",
      name: "Tokyo Grand Hotel",
      rating: 4.8,
      pricePerNight: 280,
      location: "Shibuya",
      amenities: ["Free WiFi", "Spa", "Rooftop Bar", "Fitness Center", "Concierge"],
      description: "Luxury hotel in the heart of Tokyo with stunning city views",
      image: "/luxury-hotel-tokyo.jpg",
      pros: ["Prime location", "Excellent service", "Modern facilities"],
      cons: ["Expensive", "Busy area"],
    },
    {
      id: "hotel2",
      name: "Sakura Boutique Inn",
      rating: 4.5,
      pricePerNight: 180,
      location: "Asakusa",
      amenities: ["Free WiFi", "Traditional Bath", "Garden View", "Breakfast"],
      description: "Traditional Japanese inn with authentic cultural experience",
      image: "/traditional-japanese-inn.jpg",
      pros: ["Authentic experience", "Peaceful location", "Great value"],
      cons: ["Smaller rooms", "Limited English"],
    },
  ]

  const sampleRestaurants = [
    {
      id: "rest1",
      name: "Sushi Yamamoto",
      cuisine: "Japanese",
      rating: 4.9,
      priceRange: "$$$",
      hours: "5:00 PM - 11:00 PM",
      phone: "+81-3-1234-5678",
      location: "Ginza",
      specialties: ["Omakase", "Fresh Sashimi", "Premium Sake"],
      description: "Michelin-starred sushi restaurant with traditional preparation",
      image: "/high-end-sushi-restaurant.jpg",
    },
    {
      id: "rest2",
      name: "Ramen Ichiban",
      cuisine: "Japanese",
      rating: 4.6,
      priceRange: "$",
      hours: "11:00 AM - 10:00 PM",
      phone: "+81-3-8765-4321",
      location: "Shibuya",
      specialties: ["Tonkotsu Ramen", "Gyoza", "Chashu Pork"],
      description: "Popular local ramen shop known for rich, flavorful broth",
      image: "/authentic-ramen-shop-tokyo.jpg",
    },
  ]

  const localContacts = [
    { category: "Emergency", name: "Police", number: "110" },
    { category: "Emergency", name: "Fire/Ambulance", number: "119" },
    { category: "Tourist Info", name: "Tokyo Tourist Hotline", number: "+81-3-3201-3331" },
    { category: "Transportation", name: "JR East Info", number: "+81-50-2016-1603" },
    { category: "Medical", name: "Tokyo Medical Center", number: "+81-3-3411-0111" },
  ]

  return (
    <Card className="gradient-card border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Travel Insights & Planning
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50 flex-shrink-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <div className="overflow-y-auto flex-1 min-h-0">
          <TabsContent value="overview" className="p-4 space-y-6">
            {/* Destination Overview */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-foreground flex items-center gap-2">
                <Camera className="w-4 h-4 text-accent" />
                Destination Highlights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <img
                    src="/tokyo-skyline.png"
                    alt="Tokyo Skyline"
                    className="w-full h-24 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-medium text-foreground mb-1">Tokyo Skyline</h4>
                  <p className="text-sm text-muted-foreground">Modern metropolis with stunning city views</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <img
                    src="/tokyo-temple.png"
                    alt="Traditional Temple"
                    className="w-full h-24 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-medium text-foreground mb-1">Historic Temples</h4>
                  <p className="text-sm text-muted-foreground">Rich cultural heritage and traditions</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <h3 className="text-md font-medium text-foreground">Trip Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 border border-border text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border border-border text-center">
                  <div className="text-2xl font-bold text-primary">$800</div>
                  <div className="text-sm text-muted-foreground">Est. Budget</div>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="space-y-3">
              <h3 className="text-md font-medium text-foreground flex items-center gap-2">
                <Navigation className="w-4 h-4 text-accent" />
                Interactive Map
              </h3>
              <div className="w-full h-[32rem]">
                <GoogleMaps startPoint="Pune" endPoint="Shimla" travelMode="DRIVING" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                3-Day Tokyo Itinerary
              </h3>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {sampleItinerary.map((day) => (
              <div key={day.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">
                    Day {day.day} - {day.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {day.budget}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-background/50 rounded-md">
                      <div className="text-xs text-primary font-medium min-w-[60px]">{activity.time}</div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="hotels" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Recommended Accommodations
              </h3>
            </div>

            {sampleHotels.map((hotel) => (
              <div key={hotel.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex gap-4">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-24 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{hotel.name}</h4>
                      <Button variant="ghost" size="sm" onClick={() => toggleFavorite(hotel.id)} className="p-1">
                        <Heart
                          className={`w-4 h-4 ${
                            favoriteItems.has(hotel.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                        <span className="text-xs text-muted-foreground">{hotel.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {hotel.location}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{hotel.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">${hotel.pricePerNight}/night</span>
                      <Button variant="outline" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {hotel.amenities.map((amenity, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Pros:</span>
                      <ul className="text-foreground">
                        {hotel.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cons:</span>
                      <ul className="text-foreground">
                        {hotel.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="dining" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-foreground flex items-center gap-2">
                <Utensils className="w-4 h-4 text-accent" />
                Restaurant Recommendations
              </h3>
            </div>

            {sampleRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex gap-4">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-24 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{restaurant.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {restaurant.cuisine}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => toggleFavorite(restaurant.id)} className="p-1">
                          <Heart
                            className={`w-4 h-4 ${
                              favoriteItems.has(restaurant.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                        <span className="text-xs text-muted-foreground">{restaurant.rating}</span>
                      </div>
                      <span className="text-xs font-medium text-primary">{restaurant.priceRange}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{restaurant.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {restaurant.hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {restaurant.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.map((specialty, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="contacts" className="p-4 space-y-4">
            <h3 className="text-md font-medium text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              Important Local Contacts
            </h3>

            <div className="space-y-3">
              {localContacts.map((contact, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {contact.category}
                        </Badge>
                        <span className="font-medium text-foreground">{contact.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-primary">{contact.number}</span>
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Travel Tips */}
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Quick Travel Tips</h4>
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Download Google Translate app for offline translation</li>
                  <li>• Get a JR Pass for unlimited train travel</li>
                  <li>• Cash is preferred - withdraw from 7-Eleven ATMs</li>
                  <li>• Bow slightly when greeting locals</li>
                  <li>• Remove shoes when entering homes/temples</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  )
}
