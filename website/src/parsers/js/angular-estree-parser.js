import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'angular-estree-parser/package.json';

const ID = 'angular-estree-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['angular-estree-parser'], callback);
  },

  nodeToRange(node) {
    if (typeof node.start === 'number')
      return [node.start, node.end];
  },

  getNodeName(node) {
    return node.type;
  },

  parse(
    { parseAction, parseBinding, parseInterpolation, parseTemplateBindings },
    code,
    options
  ) {
    switch (options.context) {
      case 'interpolation':
        return parseInterpolation(code);
      case 'action':
        return parseAction(code);
      case 'binding':
        return parseBinding(code);
      case 'templateBindings':
        return parseTemplateBindings(code);
    }
  },

  getDefaultOptions() {
    return {
      context: 'interpolation',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['context', ['interpolation', 'action', 'binding', 'templateBindings']],
      ],
    };
  },
};
