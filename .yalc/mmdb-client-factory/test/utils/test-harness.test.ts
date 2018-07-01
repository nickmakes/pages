import { ClientType } from '../../src';
import { TestHarness } from '../';

describe('test harness', () => {
  it('should successfully supply an api client', async () => {
    const th = new TestHarness(ClientType.API, { api: _http => {} });
    await th.setup();
    expect(th.apiClient).toBeDefined();
    await th.teardown();
  });

  it('should successfully supply an http client', async () => {
    const th = new TestHarness(ClientType.HTTP);
    await th.setup();
    expect(th.httpClient).toBeDefined();
    await th.teardown();
  });

  // FIXME: remove me
  // it('should successfully supply an rest client', async () => {
  //   const th = new TestHarness(ClientType.REST);
  //   await th.setup();
  //   expect(th.restClient).toBeDefined();
  //   await th.teardown();
  // });
});
