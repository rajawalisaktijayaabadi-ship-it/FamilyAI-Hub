import { 
  TravelTrip, 
  TravelItinerary, 
  TravelChecklist, 
  TravelBudget, 
  FamilyEvent, 
  EventPlanner, 
  TravelDocument, 
  TravelPhoto 
} from '../../../types/travel';

/**
 * Repository pattern for Travel, Vacation & Family Event module.
 * Abstracts local state/store and Firebase persistence.
 */
export class TravelRepository {
  private trips: TravelTrip[] = [];

  constructor(initialTrips: TravelTrip[] = []) {
    this.trips = initialTrips;
  }

  public getTrips(): TravelTrip[] {
    return this.trips;
  }

  public getTripById(id: string): TravelTrip | undefined {
    return this.trips.find(t => t.id === id);
  }

  public saveTrip(trip: TravelTrip): TravelTrip {
    const existingIndex = this.trips.findIndex(t => t.id === trip.id);
    if (existingIndex >= 0) {
      this.trips[existingIndex] = trip;
    } else {
      this.trips.unshift(trip);
    }
    return trip;
  }

  public deleteTrip(id: string): boolean {
    const initialLength = this.trips.length;
    this.trips = this.trips.filter(t => t.id !== id);
    return this.trips.length < initialLength;
  }
}

export const travelRepository = new TravelRepository();
