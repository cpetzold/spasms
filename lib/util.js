String.prototype.diff = function(string) {
  var diff = [],
      i, oc, sc, start, end,
      len = (this.length > string.length) ? this.length : string.length;
  for (i = 0; i < len; i++) {
    oc = this[i];
    sc = string[i];
    if (sc !== oc) {
      if (!start) {
        start = end = i;
      } else {
        end++;
      }
    } else {
      if (end) {
        diff.push([start, end]);
        start = end = null;
      }
    }
  }
  if (end) {
    diff.push([start, end]);
  }
  return diff;
}