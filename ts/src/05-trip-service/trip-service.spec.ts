import TripService from "./trip/TripService";
import User from "./user/User";
import UserNotLoggedInException from "./exception/UserNotLoggedInException";
import UserSession from "./user/UserSession";
import Trip from "./trip/Trip";

describe("Trip Service", function() {

  let service: TripService;

  beforeEach(() => {
    service = new TripService();
  });

  it("should throw an exception if currentUser is null (with Jest)", function() {
    UserSession.getLoggedUser = jest.fn().mockReturnValue(null);
    expect( () => service.getTripsByUser(new User(), null)).toThrowError(new UserNotLoggedInException());
  });

  class TripServiceOverload extends TripService {
    trips : Trip[] = [];

    protected getTrips(): Trip[] {
      return this.trips;
    }

    setTrips(trips: Trip[]) {
      this.trips = trips;
    }
  }

  it("should throw an exception is currentUser is null (with overload)", function() {
    const overload = new TripServiceOverload();
    expect( () => overload.getTripsByUser(new User(), null)).toThrowError(new UserNotLoggedInException());
  });

  it("should return no trip when current user is not null and user has no friend", function() {
    const overload = new TripServiceOverload();
    expect(overload.getTripsByUser(new User(), new User())).toEqual([]);
  });

  it("should return no trip when current user is not null and user is not friend with current user", function() {
    const overload = new TripServiceOverload();
    const alice = new User();

    const bob = new User();
    const carol = new User();

    bob.addFriend(carol);
    const toRome = new Trip();
    overload.setTrips([toRome]);
    expect(overload.getTripsByUser(bob, alice)).toEqual([]);
  });

  it("should return trips when current user is not null and user is friend with current user", function() {
    const overload = new TripServiceOverload();
    const alice = new User();

    const bob = new User();
    const carol = new User();

    bob.addFriend(carol);
    bob.addFriend(alice);
    const toRome = new Trip();
    overload.setTrips([toRome]);
    expect(overload.getTripsByUser(bob, alice)).toEqual([toRome]);
  });



});