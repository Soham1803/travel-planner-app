"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageSquare, MapPin, Calendar, Star, Clock, Phone, Info, Navigation, Utensils } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import TravelOutputPanel from "./travel-output-panel"

export default function TextChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/travel-chat" }),
  })

  const renderTravelContent = (part: any) => {
    if (part.type === "tool-generateItinerary" && part.state === "output-available") {
      const itinerary = part.output
      return (
        <div className="mt-4 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {itinerary.duration}-Day {itinerary.travelStyle} Itinerary for {itinerary.destination}
              </h4>
              <Badge variant="outline" className="text-xs">
                {itinerary.totalEstimatedCost}
              </Badge>
            </div>

            <div className="space-y-3">
              {itinerary.itinerary.map((day: any, index: number) => (
                <div key={index} className="bg-background/50 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      Day {day.day} - {day.title}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {day.estimatedCost}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {day.activities.map((activity: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-medium min-w-[70px]">{activity.time}</span>
                        <div className="flex-1">
                          <span className="text-foreground">{activity.activity}</span>
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
            </div>

            {itinerary.interests && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Interests:</span>
                </p>
                <div className="flex flex-wrap gap-1">
                  {itinerary.interests.map((interest: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (part.type === "tool-findAccommodations" && part.state === "output-available") {
      const accommodations = part.output
      return (
        <div className="mt-4 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Recommended Hotels in {accommodations.destination}
            </h4>
            <div className="text-xs text-muted-foreground mb-3">
              Check-in: {accommodations.checkIn} | Check-out: {accommodations.checkOut}
            </div>

            <div className="space-y-3">
              {accommodations.hotels.map((hotel: any, index: number) => (
                <div key={index} className="bg-background/50 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{hotel.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                        <span className="text-xs text-muted-foreground">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{hotel.description}</p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">${hotel.pricePerNight}/night</span>
                    <span className="text-xs text-muted-foreground">{hotel.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-muted-foreground">Pros:</span>
                      <ul className="text-foreground">
                        {hotel.pros.map((pro: string, i: number) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cons:</span>
                      <ul className="text-foreground">
                        {hotel.cons.map((con: string, i: number) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {hotel.amenities.map((amenity: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Room:</span> {hotel.roomType} |
                    <span className="font-medium"> Cancellation:</span> {hotel.cancellationPolicy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (part.type === "tool-findRestaurants" && part.state === "output-available") {
      const restaurants = part.output
      return (
        <div className="mt-4 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" />
              {restaurants.cuisine} Restaurants in {restaurants.destination}
            </h4>
            {restaurants.mealType !== "Any" && (
              <div className="text-xs text-muted-foreground mb-3">Meal Type: {restaurants.mealType}</div>
            )}

            <div className="space-y-3">
              {restaurants.restaurants.map((restaurant: any, index: number) => (
                <div key={index} className="bg-background/50 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{restaurant.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {restaurant.cuisine}
                      </Badge>
                      <span className="text-xs font-medium text-primary">{restaurant.priceRange}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{restaurant.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {restaurant.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {restaurant.phone}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {restaurant.specialties.map((specialty: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <div className="flex flex-wrap gap-2">
                      {restaurant.dietaryOptions.map((option: string, i: number) => (
                        <span key={i}>• {option}</span>
                      ))}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Wait time:</span> {restaurant.averageWaitTime}
                      {restaurant.reservationRequired && <span> | Reservation required</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (part.type === "tool-getLocalInformation" && part.state === "output-available") {
      const localInfo = part.output
      return (
        <div className="mt-4 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Local Information for {localInfo.destination}
            </h4>

            <div className="space-y-4">
              {/* Transportation */}
              <div className="bg-background/50 rounded-md p-3">
                <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Navigation className="w-3 h-3 text-accent" />
                  Transportation
                </h5>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">Options:</span>
                    <ul className="text-foreground ml-2">
                      {localInfo.transportation.publicTransport.map((option: string, i: number) => (
                        <li key={i}>• {option}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Costs:</span>
                    <div className="text-foreground ml-2">
                      Metro: {localInfo.transportation.costs.metro} | Bus: {localInfo.transportation.costs.bus} | Taxi:{" "}
                      {localInfo.transportation.costs.taxi}
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety */}
              <div className="bg-background/50 rounded-md p-3">
                <h5 className="font-medium text-foreground mb-2">Safety & Emergency</h5>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">Emergency Numbers:</span>
                    <div className="text-foreground ml-2">
                      Police: {localInfo.safety.emergency.police} | Medical: {localInfo.safety.emergency.medical} |
                      Tourist Help: {localInfo.safety.emergency.tourist}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Safety Tips:</span>
                    <ul className="text-foreground ml-2">
                      {localInfo.safety.tips.map((tip: string, i: number) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Practical Tips */}
              <div className="bg-background/50 rounded-md p-3">
                <h5 className="font-medium text-foreground mb-2">Practical Tips</h5>
                <div className="text-sm">
                  <ul className="text-foreground space-y-1">
                    {localInfo.practicalTips.map((tip: string, i: number) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Chat Panel */}
      <Card className="flex flex-col gradient-card border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Chat with AI Travel Planner
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">
                  Hello! I'm your AI travel planner. I can help you create amazing itineraries, find accommodations,
                  suggest restaurants, and provide local insights. Where would you like to go?
                </p>
                <div className="mt-2 text-xs opacity-75">
                  Try: "Plan a 5-day cultural trip to Tokyo with a medium budget"
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index}>
                        <p className="text-sm whitespace-pre-wrap">{part.text}</p>
                      </div>
                    )
                  }

                  // Render tool loading states
                  if (part.type.startsWith("tool-") && part.state === "input-available") {
                    const toolName = part.type
                      .replace("tool-", "")
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()
                    return (
                      <div key={index} className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <span>Generating {toolName}...</span>
                        </div>
                      </div>
                    )
                  }

                  return renderTravelContent(part)
                })}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me about your travel plans... (e.g., 'Plan a 5-day trip to Paris with cultural focus')"
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

     <TravelOutputPanel /> 
    </div>
  )
}
