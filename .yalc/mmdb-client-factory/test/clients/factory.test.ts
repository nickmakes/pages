import {
  ClientFactory,
  ClientType,
  MmdbApiClient,
  MmdbHttpClient
  // MmdbRestClient
} from '../../src';

describe('mmdb client factory', () => {
  it('client factory should error out when constructed', () => {
    expect(() => new ClientFactory()).toThrowError();
  });

  it('should fail to create an api client instance with no api supplier provided', async () => {
    expect.assertions(1);
    try {
      await ClientFactory.build(ClientType.API);
    } catch (e) {
      expect(e.message).toBe('must supply api in client options if instantiating an api client');
    }
  });

  it('should create an api client instance', async () => {
    const general = await ClientFactory.build(ClientType.API, { api: _http => {} });
    expect(general).toBeInstanceOf(MmdbApiClient);

    const specific = await ClientFactory.buildApi({ api: _http => {} });
    expect(specific).toBeInstanceOf(MmdbApiClient);
  });

  it('should create an http client instance', async () => {
    const general = await ClientFactory.build(ClientType.HTTP);
    expect(general).toBeInstanceOf(MmdbHttpClient);

    const specific = await ClientFactory.buildHttp();
    expect(specific).toBeInstanceOf(MmdbHttpClient);
  });

  // FIXME: remove me
  // it('client factory should create a rest client instance', async () => {
  //   const general = await ClientFactory.build(ClientType.REST);
  //   expect(general).toBeInstanceOf(MmdbRestClient);
  //
  //   const specific = await ClientFactory.buildRest();
  //   expect(specific).toBeInstanceOf(MmdbRestClient);
  // });
});
