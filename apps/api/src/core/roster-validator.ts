export interface RosterValidationInput {
  lineupPlayerIds: string[];
  minRosterSize: number;
  maxRosterSize: number;
}

export class RosterValidator {
  validate(input: RosterValidationInput): void {
    if (input.lineupPlayerIds.length < input.minRosterSize) {
      throw new Error("Roster below minimum size");
    }
    if (input.lineupPlayerIds.length > input.maxRosterSize) {
      throw new Error("Roster exceeds maximum size");
    }

    const unique = new Set(input.lineupPlayerIds);
    if (unique.size !== input.lineupPlayerIds.length) {
      throw new Error("Duplicate players are not allowed");
    }
  }
}

