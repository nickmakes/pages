import { ClientFactory, ClientType, MediaType } from '../../src';
import { TestHarness, TestServer } from '../';

describe('mmdb client factory', () => {
  it('client factory should error out when constructed', () => {
    expect(() => new ClientFactory()).toThrowError();
  });

  describe('creates an http client', () => {
    const port = 7070;
    const th = new TestHarness(ClientType.HTTP, { baseUrl: `http://localhost:${port}` });
    const ts = new TestServer(port);

    beforeAll(async () => {
      await th.setup();
      await ts.setup();
    });

    afterAll(async () => {
      await ts.teardown();
      await th.teardown();
    });

    it('should GET json successfully', async () => {
      const payload = { id: 1, name: 'chipper jones' };
      await ts.mockHttp(
        1,
        () => th.httpClient.http.get(''),
        {
          status: 200,
          contentType: MediaType.APPLICATION_JSON,
          payload: JSON.stringify(payload)
        },
        async json => expect(json).toMatchObject(payload)
      );
    });

      it('should GET text successfully', async () => {
        const payload = 'got heem!';
        await ts.mockHttp(
          1,
          () => th.httpClient.http.get(''),
          { status: 200, contentType: MediaType.TEXT_PLAIN, payload: payload },
          res => expect(res).toBe(payload)
        );
      });

      it('should POST json successfully', async () => {
        const payload = { id: 1, name: 'chipper jones' };
        await ts.mockHttp(
          1,
          () => th.httpClient.http.post('', { body: JSON.stringify(payload) }),
          { status: 201, contentType: MediaType.APPLICATION_JSON, payload: JSON.stringify(payload) },
          res => expect(res).toMatchObject(payload)
        );
      });

      it('should PUT json successfully', async () => {
        const payload = { id: 1, name: 'chipper jones' };
        await ts.mockHttp(
          1,
          () => th.httpClient.http.put('', { body: JSON.stringify(payload) }),
          { status: 202, contentType: MediaType.APPLICATION_JSON, payload: JSON.stringify(payload) },
          res => expect(res).toMatchObject(payload)
        );
      });

      it('should DELETE successfully', async () => {
        await ts.mockHttp(1, () => th.httpClient.http.delete(''), { status: 204 }, res =>
          expect(res.status).toBe(204)
        );
      });

      it('should throw an error with json payload for unsuccessful status', async () => {
        const payload = { type: 'test_error', message: 'custom error payload' };
        await ts.mockHttp(
          1,
          () => th.httpClient.http.post(''),
          { status: 500, contentType: MediaType.APPLICATION_JSON, payload: JSON.stringify(payload) },
          res => console.log(res),
          err => expect(err).toMatchObject(payload)
        );
      });

      it('should throw an error with text payload for unsuccessful status', async () => {
        const payload = 'oh noz!';
        await ts.mockHttp(
          1,
          () => th.httpClient.http.post(''),
          { status: 401, contentType: MediaType.TEXT_PLAIN, payload: payload },
          res => console.log(res),
          err => expect(err).toBe(payload)
        );
      });

      it('should throw a general error for unsuccessful status', async () => {
        const payload = `<html><body><h1>404 Not Found</h1><p>The resource you requested cannot be found.</p></body></html>`;
        await ts.mockHttp(
          1,
          () => th.httpClient.http.post(''),
          { status: 404, contentType: MediaType.TEXT_HTML, payload: payload },
          res => console.log(res),
          err => expect(err).toMatchObject({ type: 'general', message: 'not found' })
        );
      });
  });

  // FIXME: remove me
  // describe('creates a rest client', () => {
  //   const port = 7070;
  //   const th = new TestHarness(ClientType.REST, { baseUrl: `http://localhost:${port}` });
  //   const ts = new TestServer(port);
  //
  //   beforeAll(async () => {
  //     await th.setup();
  //     await ts.setup();
  //   });
  //
  //   afterAll(() => ts.teardown());
  // });

  // describe('creates an api client', () => {
  //   const port = 7070;
  //   const th = new TestHarness(ClientType.API, { baseUrl: `http://localhost:${port}` });
  //   const ts = new TestServer(port);
  //
  //   beforeAll(async () => {
  //     await th.setup();
  //     await ts.setup();
  //   });
  //
  //   afterAll(() => ts.teardown());
  // });
});
