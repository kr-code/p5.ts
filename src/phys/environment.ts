export interface IEnvironment {
  gravity: number;
  maxSpeed: number;
  maxForce: number;
}
export class Environment implements IEnvironment {
  gravity: number;
  maxSpeed: number;
  maxForce: number;

  constructor() {
    this.gravity = 0.02;
    this.maxSpeed = 10;
    this.maxForce = 0.1;
  }
}
