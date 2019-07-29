/**
 * Created by vkukhtin on 08/08/16.
 */
import { StateMachine } from './core';
import { StateEvent } from './stateEvent';

const fsm = new StateMachine({
  events: [
    new StateEvent({
      from: ['yellow'],
      name: 'toGreen',
      to: 'green',
    }),
    new StateEvent({
      from: ['yellow'],
      name: 'toRed',
      to: 'red',
    }),
    new StateEvent({
      from: ['red', 'green'],
      name: 'toYellow',
      to: 'yellow',
    }),
  ],
  initial: 'green',
});

describe('StateMachine', () => {
  describe('that we can use it ', () => {
    it(' using constructor', () => {
      expect(fsm instanceof StateMachine).toBe(true);
    });

    it(' Error exception', () => {
      try {
        return new StateMachine({
          events: [
            new StateEvent({
              from: ['yellow'],
              name: 'toGreen',
              to: 'green',
            }),
            new StateEvent({
              from: ['yellow'],
              name: 'toRed',
              to: 'red',
            }),
            new StateEvent({
              from: ['red', 'green'],
              name: 'toYellow',
              to: 'yellow',
            }),
            new StateEvent({
              from: ['yellow'],
              name: 'toGreen',
              to: 'green',
            }),
          ],
          initial: 'green',
        });
      } catch (e) {
        expect(e instanceof Error).toBe(true);
        expect(e.message).toBe('You have to use unique names for all events');
      }
    });

    it('getCurrent', () => {
      expect(fsm.getCurrent()).toBe('green');
      fsm.fireAction('toYellow');
      expect(fsm.getCurrent()).toBe('yellow');
    });

    it('can', () => {
      expect(fsm.can('toRed')).toBe(true);
      expect(fsm.can('toGreen')).toBe(true);
      expect(fsm.can('toYellow')).toBe(false);
    });

    it('cannot', () => {
      expect(fsm.cannot('toRed')).toBe(false);
      expect(fsm.cannot('toGreen')).toBe(false);
      expect(fsm.cannot('toYellow')).toBe(true);
    });

    it('fireAction', () => {
      fsm.fireAction('toRed');
      expect(fsm.getCurrent()).toBe('red');
      fsm.fireAction('toYellow');
      expect(fsm.getCurrent()).toBe('yellow');
      fsm.fireAction('toGreen');
      expect(fsm.getCurrent()).toBe('green');
    });

    it('fireAction with Error', () => {
      try {
        fsm.fireAction('toRed');
      } catch (e) {
        expect(e instanceof Error).toBe(true);
        expect(e.message).toBe('You cannot switch to this state');
      }
    });

    it('getTransitions', () => {
      expect(fsm.getTransitions()[0]).toBe('toYellow');
    });

    it('getEvents', () => {
      expect(fsm.getEvents() instanceof Array).toBe(true);
      expect(fsm.getEvents().length).toBe(3);
      expect(fsm.getEvents()[0] instanceof StateEvent).toBe(true);
      expect(fsm.getEvents()[0].name).toBe('toGreen');
    });

    it('goToPreviousState', () => {
      fsm.goToPreviousState();
      expect(fsm.getCurrent()).toBe('yellow');
    });
  });
});
