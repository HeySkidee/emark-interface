export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Short Address
 * @param address
 * @returns {string}
 */
export function shortAddress(address) {
  if (!address) {
    return '';
  }
  const prefix = address.substring(0, 6);
  const middle = '...';
  const suffix = address.substring(address.length - 4);
  return prefix + middle + suffix;
}