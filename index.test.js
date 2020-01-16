const throttle = require('.');
const sinon = require('sinon');

describe('throttle', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should not allow more than 1 call for the given period of time', () => {
    const mockFunc = jest.fn();
    const throttledFunc = throttle(mockFunc, { limit: 1000 });

    throttledFunc();

    expect(mockFunc.mock.calls.length).toBe(1);

    clock.tick(500);
    throttledFunc();

    expect(mockFunc.mock.calls.length).toBe(1);
  });

  it('should return `undefined` when a call is throttled', () => {
    const mockFunc = () => 'mock';
    const throttledFunc = throttle(mockFunc, { limit: 1000 });

    throttledFunc();

    const throttledCall = throttledFunc();

    expect(throttledCall).toBe(undefined);
  });

  it('should return the throttled function\'s return value if the call isn\'t throttled', () => {
    const mockFunc = () => 'mock';
    const throttledFunc = throttle(mockFunc, { limit: 1000 });
    const successfulCall = throttledFunc();

    expect(successfulCall).toBe('mock');
  });

  it('should call the throttled function on first call if using leading edge calls', () => {
    const mockFunc = jest.fn();
    const throttledFunc = throttle(mockFunc, { limit: 1000 });

    throttledFunc();

    expect(mockFunc.mock.calls.length).toBe(1);
  });

  it('should call the throttled function after time limit has expired if using trailing edge calls', () => {
    const mockFunc = jest.fn();
    const throttledFunc = throttle(mockFunc, { limit: 1000, leading: false });

    throttledFunc();

    expect(mockFunc.mock.calls.length).toBe(0);

    clock.tick(1001);

    throttledFunc();

    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
