/**
 *  Promise delay implementation
 * @param ms millisecond
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;
