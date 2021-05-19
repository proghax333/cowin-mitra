
export function jsonify(object, replacer = null, space = 2)
{
  return JSON.stringify(object, replacer, space);
}
