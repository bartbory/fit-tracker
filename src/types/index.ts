export interface UserDetails {
  gender: "male" | "female";
  birthYear: number;
  height: number;
  weightGoal: number;
}
export interface BodyMeasurement {
  weight: number;
  neck: number;
  leftArm: number;
  rightArm: number;
  leftForearm: number;
  rightForearm: number;
  leftThigh: number;
  rightThigh: number;
  leftCalf: number;
  rightCalf: number;
  chest: number;
  waist: number;
  hips: number;
}

export interface IBodyMeasurement extends BodyMeasurement {
  date: Date;
}

export interface User {
  name: string | null;
  email: string;
  id: string;
}

export interface IUser extends User {
  measurements: BodyMeasurement[];
  details: UserDetails;
}
