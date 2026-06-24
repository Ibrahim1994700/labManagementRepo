import { IsDayExistPipe } from './is-day-exist.pipe';

describe('IsDayExistPipe', () => {
  it('create an instance', () => {
    const pipe = new IsDayExistPipe();
    expect(pipe).toBeTruthy();
  });
});
