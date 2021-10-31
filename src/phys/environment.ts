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
    this.gravity = 0.04;
    this.maxSpeed = 20;
    this.maxForce = 0.2;
  }
}
