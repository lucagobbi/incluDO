import {animate, state, style, transition, trigger} from "@angular/animations";

export const zoomInRegular = trigger('zoomInRegular', [
  state('void', style({opacity: 0, transform: 'scale(0.25)'})),
  transition('void <=> *', [
    animate(125)
  ]),
]);

export const zoomInFast = trigger('zoomInFast', [
  state('void', style({opacity: 0, transform: 'scale(0.25)'})),
  transition('void <=> *', [
    animate(70)
  ]),
]);
