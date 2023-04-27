import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {

    public getTripsByUser(user: User, loggedUser: User | null): Trip[] {

        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }

        if (user.getFriends().includes(loggedUser)) {
            return this.getTrips(user);
        }
        return [];
    }

    protected getTrips(user: User) {
        return TripDAO.findTripsByUser(user);
    }
}
