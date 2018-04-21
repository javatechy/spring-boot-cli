/**
 * Common Response mapper class for all backend responses.
 */
export class CustomResponse {
  constructor(public status?: string,
              public error?: string, public code?: string) {
  }
}
