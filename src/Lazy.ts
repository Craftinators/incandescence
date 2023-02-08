/**
 * Provides support for lazy initialization.
 */
class Lazy<T> {
  private instance: T | null = null;
  private readonly initializer: () => T;

  /**
   * Initializes a new instance of the {@link Lazy} class. When lazy initialization occurs, the specified initialization function is used.
   * @param initializer The function that is invoked to produce the lazily initialized value when it is needed.
   */
  public constructor(initializer: () => T) {
    this.initializer = initializer;
  }

  /**
   * Gets the lazily initialized value of the current {@link Lazy} instance.
   */
  public get value(): T {
    if (this.instance == null) this.instance = this.initializer();
    return this.instance;
  }
}

export { Lazy };
