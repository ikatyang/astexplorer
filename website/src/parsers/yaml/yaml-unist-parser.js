import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml-unist-parser/package.json';

const ID = 'yaml-unist-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['yaml-unist-parser'], callback);
  },

  nodeToRange(node) {
    if (node.position)
      return [node.position.start.offset, node.position.end.offset];
  },

  getNodeName(node) {
    return node.type;
  },

  parse({ parse }, code) {
    return parse(code);
  },
};
