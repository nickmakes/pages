import * as http from 'http';
import { MediaType } from '../../src';

export type RequestHandler = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void | undefined;

export class TestServer {
  private requestHandler: RequestHandler = () => {};
  private server: http.Server;

  constructor(private port: number = 7000) {
    this.server = http.createServer((req, res) => this.requestHandler(req, res));
  }

  async setup() {
    await this.server.listen(this.port);
  }

  async teardown() {
    await this.server.close();
  }

  async mockHttp(
    assertCount: number,
    asyncRequest: () => Promise<Response>,
    response: { status: number; contentType?: MediaType; payload?: string },
    successHandler: (res: Response) => void,
    errorHandler: (err: Error) => void = e =>
      console.log(`received error response: ${JSON.stringify(e)}`)
  ) {
    expect.assertions(assertCount);
    this.handleRequest((_req, res) => {
      let headers;
      if (response.contentType) {
        headers = { 'Content-Type': response.contentType };
      }

      res.writeHead(response.status, headers);
      res.end(response.payload);
    });

    try {
      const res = await asyncRequest();
      await successHandler(res);
    } catch (e) {
      await errorHandler(e);
    }
  }

  handleRequest(mockHandler: RequestHandler) {
    this.requestHandler = mockHandler;
  }
}
