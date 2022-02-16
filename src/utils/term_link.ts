import ansiEscapes from 'ansi-escapes';
const supportsHyperlinks = require('supports-hyperlinks');

export default (text: string, url: string) => {
  if (!supportsHyperlinks.stdout) {
    return false;
  }

  return ansiEscapes.link(text, url);
};
