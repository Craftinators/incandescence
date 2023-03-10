/**
 * Provides support for lazy initialization.
 * @typeParam T The type of the initialized value.
 */
export class Lazy<T extends object> {
  private instance: T | null = null;
  private readonly initializer: Func<T>;

  /**
   * Initializes a new instance of the {@link Lazy} class. When lazy initialization occurs, the specified initialization function is used.
   * @param initializer The function that is invoked to produce the lazily initialized value when it is needed.
   */
  public constructor(initializer: Func<T>) {
    this.initializer = initializer;
  }

  /**
   * Gets the lazily initialized value of the current {@link Lazy} instance.
   */
  public get value(): T {
    if (this.instance === null) this.instance = this.initializer();
    return this.instance;
  }

  /**
   * Gets a value that indicates whether a value has been created for this {@link Lazy} instance.
   */
  public get instantiated() {
    return this.instance !== null;
  }

  /**
   * Creates and returns a string representation of the value property for this instance.
   * @returns The result of calling the `toString()` method on the value property for this instance, if the value has been created (that is, if the instantiated property returns true). Otherwise, an error is thrown indicating that the value has not been created.
   * @throws {ReferenceError} The Value property is null.
   */
  public toString(): string {
    if (this.instance !== null) return this.instance.toString();
    throw new ReferenceError("Value has not been instantiated yet.");
  }
}

/**
 * Represents a function with zero parameters
 * @internal
 */
export type Func<Result> = () => Result;
