import { RockInformationInterface } from "./rock-information.interface";
import { VinRockInformationService } from "./external/vin-rock-information.service";

export class TunnelTooLongForDelayException extends Error {
}

export class InvalidFormatException extends Error {
}

export class Team {
  miners = 0;
  healers = 0;
  smithies = 0;
  lighters = 0;
  innKeepers = 0;
  guards = 0;
  guardManagers = 0;
  washers = 0;
}

export class TeamComposition {
  dayTeam: Team = new Team();
  nightTeam: Team = new Team();

  total = 0;
}

export class DiggingEstimator {
  private readonly rockInformation: RockInformationInterface;

  constructor(rockInformation?: RockInformationInterface) {
    this.rockInformation = rockInformation || new VinRockInformationService()
  }

  tunnel(length: number, days: number, rockType: string): TeamComposition {
    this.validateInputs(length, days);

    const digPerRotation = this.rockInformation.get(rockType);
    const maxDigPerRotation = digPerRotation[digPerRotation.length - 1];
    const maxDigPerDay = 2 * maxDigPerRotation;

    this.checkIfTunnelCanBeDone(length, days, maxDigPerDay);

    const composition = new TeamComposition();

    // Miners
    for (let i = 0; i < digPerRotation.length - 1; ++i) {
      if (digPerRotation[i] < Math.floor(length / days)) {
        composition.dayTeam.miners++;
      }
    }
    if (Math.floor(length / days) > maxDigPerRotation) {
      for (let i = 0; i < digPerRotation.length - 1; ++i) {
        if (digPerRotation[i] + maxDigPerRotation < Math.floor(length / days)) {
          composition.nightTeam.miners++;
        }
      }
    }
    const dayTeam = composition.dayTeam;
    const nightTeam = composition.nightTeam;

    this.computeDayTeamComposition(dayTeam);
    this.computeNightTeamComposition(nightTeam);

    composition.total = dayTeam.miners + dayTeam.washers + dayTeam.healers + dayTeam.smithies + dayTeam.innKeepers +
      nightTeam.miners + nightTeam.washers +  nightTeam.healers  + nightTeam.smithies  + nightTeam.innKeepers + nightTeam.guards + nightTeam.guardManagers + nightTeam.lighters;
    return composition;
  }

  private computeNightTeamComposition(nightTeam: Team) {
    if (nightTeam.miners > 0) {
      nightTeam.healers += 1;
      nightTeam.smithies += 2;
      nightTeam.lighters = nightTeam.miners + 1;
      nightTeam.innKeepers = Math.ceil((nightTeam.miners + nightTeam.healers + nightTeam.smithies + nightTeam.lighters) / 4) * 4;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const oldWashers = nightTeam.washers;
      const oldGuard = nightTeam.guards;
      const oldChiefGuard = nightTeam.guardManagers;

      nightTeam.washers = Math.ceil((nightTeam.miners + nightTeam.healers + nightTeam.smithies + nightTeam.innKeepers + nightTeam.lighters + nightTeam.guards + nightTeam.guardManagers) / 10);
      nightTeam.guards = Math.ceil((nightTeam.healers + nightTeam.miners + nightTeam.smithies + nightTeam.lighters + nightTeam.washers) / 3);
      nightTeam.guardManagers = Math.ceil((nightTeam.guards) / 3);

      if (oldWashers === nightTeam.washers && oldGuard === nightTeam.guards && oldChiefGuard === nightTeam.guardManagers) {
        break;
      }
    }
  }

  private computeDayTeamComposition(dayTeam: Team) {
    if (dayTeam.miners > 0) {
      dayTeam.healers += 1;
      dayTeam.smithies += 2;
      dayTeam.innKeepers = Math.ceil((dayTeam.miners + dayTeam.healers + dayTeam.smithies) / 4) * 4;
      dayTeam.washers = Math.ceil((dayTeam.miners + dayTeam.healers + dayTeam.smithies + dayTeam.innKeepers) / 10);
    }
  }

  private checkIfTunnelCanBeDone(length: number, days: number, maxDigPerDay: number) {
    if (Math.floor(length / days) > maxDigPerDay) {
      throw new TunnelTooLongForDelayException();
    }
  }

  private validateInputs(length: number, days: number) {
    if (Math.floor(length) !== length || Math.floor(days) !== days || length < 0 || days < 0) {
      throw new InvalidFormatException();
    }
  }
}
