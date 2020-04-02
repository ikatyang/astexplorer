import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@angular/compiler/package.json';

const ID = '@angular/compiler';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['sourceSpan', 'start', 'end']),

  loadParser(callback) {
    require([
      '@angular/compiler/esm5/src/expression_parser/parser',
      '@angular/compiler/esm5/src/expression_parser/lexer',
    ], ({Parser}, {Lexer}) => callback({ Parser, Lexer }));
  },

  parse({Parser, Lexer}, code) {
    return new Parser(new Lexer()).parseTemplateBindings(
      'NgEstreeParser',
      code,
      'FAKE_LOCATION',
      0,
      0,
  );
  },

  getNodeName(node) {
    if (node && node.sourceSpan) {
      return node.constructor.name;
    }
  },

  nodeToRange(node) {
    if (node && node.sourceSpan) {
      return [node.sourceSpan.start, node.sourceSpan.end];
    }
    if (node && node.span) {
      return [node.span.start, node.span.end];
    }
  },
};
