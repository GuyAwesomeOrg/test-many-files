'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, report, typeForMessage) {
  var sourceCode = context.getSourceCode();

  var getColon = function getColon(node, typeAnnotation) {
    if (node.type === 'FunctionTypeParam') {
      return sourceCode.getFirstToken(node, node.optional ? 2 : 1);
    } else {
      return sourceCode.getFirstToken(typeAnnotation);
    }
  };

  return function (node) {
    var typeAnnotation = _lodash2.default.get(node, 'typeAnnotation') || _lodash2.default.get(node, 'left.typeAnnotation');

    if (typeAnnotation) {
      report({
        colon: getColon(node, typeAnnotation),
        name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(node, context)),
        node,
        type: typeForMessage + ' type annotation'
      });
    }
  };
};

module.exports = exports['default'];