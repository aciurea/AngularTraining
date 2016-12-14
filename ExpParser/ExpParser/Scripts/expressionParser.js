﻿$(document).ready(function () {
    $("#btnExpressionParser").on("click", function () {
        var data = '(@domain=$%"sdgfd") AND (@domain=$%"sdgfd") AND (@domain=$%"sdgfd")';
        debugger;
        var result = parseExpression(data);
    });
    var operators = ["<>", "=$%", "<=", "=<", ">=", "=>", "=^%", "=%^", "=^", "=%", "=", "<", ">"];
    function getCompareSign(data) {
        var res = {};
        operators.some(function (op) {
            var currentOpIndex = data.indexOf(op);
            return currentOpIndex !== -1 ? res = { operator: op, index: currentOpIndex } : res = "";
        });
        return res;
    }

    function buildObject(data) {
        var res = getCompareSign(data);
        if (res === "") {
            return;
        }
        var parameter = data.substring(1, res.index).trim();
        var valueIndex = res.index + res.operator.length + 1;
        var valueToCompareTo = data.substring(valueIndex, data.length - 1);
        var result = {
            operator: res.operator,
            field: parameter.toLowerCase(),
            id: parameter.toLowerCase(),
            input: "text",
            type: "string",
            value: valueToCompareTo.trim()
        };
        return result;
    }

    function parseExpression(data) {
        var result = analyzeCondition(data);
        return result;
    }

    function analyzeCondition(data, result) {
        if (isSimpleCompareCondition(data)) {
            var rules = buildObject(data);
            result = { condition: "AND", not: false, rules: [] };
            result.rules.push(rules);
            return result;
        }
        if (data.startsWith('(')) {
            result = buildObjectWhenMultipleExpression(data);

        }

        return result;
    }
    function getOperatorIndex(data) {
        var index = data.indexOf("AND");
        var operator = "AND";
        if (index === -1) {
            index = data.indexOf("OR");
            operator = "OR";
        }
        return { index: index, op: operator };
    }

    function buildObjectWhenMultipleExpression(data, result) {
        result = getCouples(data);
        //var comparatorIndex = 0;
        //while (comparatorIndex <= data.length) {
        //    var operator = getOperatorIndex(data);
        //    comparatorIndex = operator.index;
        //    if (data.length > 2 && comparatorIndex === -1) {
        //        comparatorIndex = data.length;
        //    }
        //    var expression = data.substring(0, comparatorIndex - 1);
        //    data = data.substring(comparatorIndex - 1, data.length).trim();
        //    data = data.replace(operator.op, "").trim();
        //    var rules = buildObject(expression);
        //    if (!result) {
        //        result = { condition: operator.op, not: false, rules: [] };
        //    }
        //    result.rules.push(rules);
        //    operator = getOperatorIndex(data);
        //    comparatorIndex = operator.index;
        //    if (data.length > 2 && comparatorIndex === -1) {
        //        comparatorIndex = data.length;
        //    }
        //    if (comparatorIndex === -1) {
        //        comparatorIndex = data.length + 1;
        //    }
        //}
        //return result;
    }

    function isSimpleCompareCondition(data) {
        if (data.indexOf('AND') === -1 && data.indexOf('OR') === -1) {
            return true;
        };
        return false;
    }
    function getCouples(condition) {
        condition = condition.trim();

        var indexOfCharInCondition = -1;
        var indexOfLastOpenP = 0;
        var dicPCouplesSource = [];
        var couplesIndex = -1;
        var coupleToCloseFounded = false;


        for (var c of condition) {

            indexOfCharInCondition++;
            if (c === '(') {
                indexOfLastOpenP++;
                dicPCouplesSource.push({ OpenPIndex: indexOfCharInCondition, ClosePIndex: -1 });
            }
            else if (c === ')') {
                couplesIndex = dicPCouplesSource.length;
                coupleToCloseFounded = false;
                while (couplesIndex > 0) {
                    if (dicPCouplesSource[couplesIndex - 1].ClosePIndex == -1) {
                        dicPCouplesSource[couplesIndex - 1].ClosePIndex = indexOfCharInCondition;
                        coupleToCloseFounded = true;
                        break;
                    }
                    couplesIndex--;
                }
                if (coupleToCloseFounded == false) {
                    return "error";
                }
            }
        }
        return dicPCouplesSource;

    }
});