export class BaseError extends Error {
  constructor(message, properties) {
    super(message);

    this.message = message;
    this.status = properties.status;
    this.code = properties.code;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class EntityExistsError extends BaseError {
  constructor(entity, value) {
    const message = `entity ${entity} (${value}) already exists`;
    const properties = {
      status: 400,
      code: 'entity_exists'
    };
    super(message, properties);

    this.message = message;
    this.name = this.constructor.name;
  }
}
