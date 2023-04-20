import TripService from "./trip/TripService";
import User from "./user/User";
import UserNotLoggedInException from "./exception/UserNotLoggedInException";
import UserSession from "./user/UserSession";

describe("Trip Service", function() {

  let service: TripService;

  beforeEach(() => {
    service = new TripService();
  });

  it("should throw an exception if currentUser is null (with Jest)", function() {
    UserSession.getLoggedUser = jest.fn().mockReturnValue(null);
    expect( () => service.getTripsByUser(new User())).toThrowError(new UserNotLoggedInException());
  });

  class TripServiceOverload extends TripService {
    protected getLoggedUser(): User | null {
      return null;
    }
  }

  it("should throw an exception is currentUser is null (with overload)", function() {
    const overload = new TripServiceOverload();
    expect( () => overload.getTripsByUser(new User())).toThrowError(new UserNotLoggedInException());
  });

});