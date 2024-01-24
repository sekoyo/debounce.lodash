function debounce(func, wait = 0, options = {}) {
    let lastArgs;
    let lastThis;
    const maxWait = options.maxWait ? options.maxWait : wait;
    let result;
    let timerId;
    let lastCallTime;
    let lastInvokeTime = 0;
    const leading = !!options.leading;
    const maxing = 'maxWait' in options;
    const trailing = options.trailing ?? true;
    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    const useRAF = wait !== 0 && typeof global.requestAnimationFrame === 'function';
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function startTimer(pendingFunc, milliseconds) {
        if (useRAF) {
            if (typeof timerId === 'number') {
                global.cancelAnimationFrame(timerId);
            }
            return global.requestAnimationFrame(pendingFunc);
        }
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        return setTimeout(pendingFunc, milliseconds);
    }
    function cancelTimer(id) {
        if (useRAF) {
            global.cancelAnimationFrame(id);
            return;
        }
        clearTimeout(id);
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        const timeSinceLastCall = time - (lastCallTime || 0);
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;
        return maxing
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    function shouldInvoke(time) {
        const timeSinceLastCall = time - (lastCallTime || 0);
        const timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time));
        return undefined;
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }
    function pending() {
        return timerId !== undefined;
    }
    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        lastArgs = args;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
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
function throttle(func, wait, options = {}) {
    const leading = options.leading ?? true;
    const trailing = options.trailing ?? true;
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait,
    });
}

export { debounce, throttle };
