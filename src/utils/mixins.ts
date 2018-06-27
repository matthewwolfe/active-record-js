/**
 * Applies classes to a base class as mixins. Instance properties and methods will be merged with the base class, in order.
 * The base class must provide typings for any properties and methods that are going to be mixed in.
 * @param derivedCtor - base class
 * @param baseCtors - mixin classes
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]): void {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
