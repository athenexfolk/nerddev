export class Toggler {
  active: boolean;

  constructor(active: boolean = false) {
    this.active = active;
  }

  toggle() {
    this.active = !this.active;
  }

  up() {
    this.active = true;
  }

  down() {
    this.active = false;
  }
}
