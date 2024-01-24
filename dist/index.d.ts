interface DebounceSettings {
    /** Specify invoking on the leading edge of the timeout. */
    leading?: boolean | undefined;
    /** The maximum time func is allowed to be delayed before it's invoked. */
    maxWait?: number | undefined;
    /** Specify invoking on the trailing edge of the timeout. */
    trailing?: boolean | undefined;
}
interface DebounceSettingsLeading extends DebounceSettings {
    leading: true;
}
export interface DebouncedFunc<T extends (...args: any[]) => any> {
    /**
     * Call the original function, but applying the debounce rules.
     *
     * If the debounced function can be run immediately, this calls it and returns
     * its return value.
     *
     * Otherwise, it returns the return value of the last invocation, or undefined
     * if the debounced function was not invoked yet.
     */
    (...args: Parameters<T>): ReturnType<T> | undefined;
    /** Throw away any pending invocation of the debounced function. */
    cancel(): void;
    /**
     * If there is a pending invocation of the debounced function, invoke it
     * immediately and return its return value.
     *
     * Otherwise, return the value from the last invocation, or undefined if the
     * debounced function was never invoked.
     */
    flush(): ReturnType<T> | undefined;
}
interface DebouncedFuncLeading<T extends (...args: any[]) => any> extends DebouncedFunc<T> {
    (...args: Parameters<T>): ReturnType<T>;
    flush(): ReturnType<T>;
}
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the debounced function is invoked
 * more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * See [David Corbacho's
 * article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @category Function
 * @example
 *   // Avoid costly calculations while the window size is in flux.
 *   jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 *   // Invoke `sendMail` when clicked, debouncing subsequent calls.
 *   jQuery(element).on(
 *     'click',
 *     debounce(sendMail, 300, {
 *       leading: true,
 *       trailing: false,
 *     })
 *   )
 *
 *   // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 *   const debounced = debounce(batchLog, 250, { maxWait: 1000 })
 *   const source = new EventSource('/stream')
 *   jQuery(source).on('message', debounced)
 *
 *   // Cancel the trailing debounced invocation.
 *   jQuery(window).on('popstate', debounced.cancel)
 *
 *   // Check for pending invocations.
 *   const status = debounced.pending() ? 'Pending...' : 'Ready'
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay; if omitted,
 *   `requestAnimationFrame` is used (if available). Default is `0`
 * @param {Object} [options={}] The options object. Default is `{}`
 * @param {boolean} [options.leading=false] Specify invoking on the leading edge
 *   of the timeout. Default is `false`
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *   delayed before it's invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *   edge of the timeout. Default is `true`
 * @returns {Function} Returns the new debounced function.
 */
export declare function debounce<T extends (...args: any) => any>(func: T, wait: number | undefined, options: DebounceSettingsLeading): DebouncedFuncLeading<T>;
export declare function debounce<T extends (...args: any) => any>(func: T, wait?: number, options?: DebounceSettings): DebouncedFunc<T>;
interface ThrottleSettings {
    /** Specify invoking on the leading edge of the timeout. */
    leading?: boolean | undefined;
    /** Specify invoking on the trailing edge of the timeout. */
    trailing?: boolean | undefined;
}
export interface DebouncedFunc<T extends (...args: any[]) => any> {
    /**
     * Call the original function, but applying the debounce rules.
     *
     * If the debounced function can be run immediately, this calls it and returns
     * its return value.
     *
     * Otherwise, it returns the return value of the last invocation, or undefined
     * if the debounced function was not invoked yet.
     */
    (...args: Parameters<T>): ReturnType<T> | undefined;
    /** Throw away any pending invocation of the debounced function. */
    cancel(): void;
    /**
     * If there is a pending invocation of the debounced function, invoke it
     * immediately and return its return value.
     *
     * Otherwise, return the value from the last invocation, or undefined if the
     * debounced function was never invoked.
     */
    flush(): ReturnType<T> | undefined;
}
/**
 * Creates a throttled function that only invokes `func` at most once per every
 * `wait` milliseconds (or once per browser frame). The throttled function comes
 * with a `cancel` method to cancel delayed `func` invocations and a `flush`
 * method to immediately invoke them. Provide `options` to indicate whether
 * `func` should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the throttled function is invoked
 * more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * See [David Corbacho's
 * article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `throttle` and `debounce`.
 *
 * @category Function
 * @example
 *   // Avoid excessively updating the position while scrolling.
 *   jQuery(window).on('scroll', throttle(updatePosition, 100))
 *
 *   // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 *   const throttled = throttle(renewToken, 300000, { trailing: false })
 *   jQuery(element).on('click', throttled)
 *
 *   // Cancel the trailing throttled invocation.
 *   jQuery(window).on('popstate', throttled.cancel)
 *
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations
 *   to; if omitted, `requestAnimationFrame` is used (if available). Default is
 *   `0`
 * @param {Object} [options={}] The options object. Default is `{}`
 * @param {boolean} [options.leading=true] Specify invoking on the leading edge
 *   of the timeout. Default is `true`
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *   edge of the timeout. Default is `true`
 * @returns {Function} Returns the new throttled function.
 */
export declare function throttle<T extends (...args: any) => any>(func: T, wait?: number, options?: ThrottleSettings): DebouncedFunc<T>;
export {};
