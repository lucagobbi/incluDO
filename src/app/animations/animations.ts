import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInRegular = trigger('fadeInRegular', [
  state('void', style({opacity: 0})),
  transition('void => *', [
    animate('0.25s 120ms'),
  ]),
]);

export const fadeNSlideIn = trigger('fadeNSlideIn', [
  state('void', style({ opacity: 0})),
  transition('void <=> *', [
    animate('0.23s'),
  ]),
]);

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
