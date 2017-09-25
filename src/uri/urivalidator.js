export let UNRESERVED = '[a-zA-Z0-9\\-\\._~]';
export let PCT_ENCODED = '(%[a-fA-F0-9][a-fA-F0-9])';
export let SUB_DELIMS = '[!$&\'()*+,;=]';
export let PCHAR = UNRESERVED + '|' + PCT_ENCODED + '|' + SUB_DELIMS + '|[:@]';

/**
 * Utility class providing method to validate the different part of an uri.
 */
export default class UriValidator {

}
