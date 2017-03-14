# ExpressionParser
This tool is composed from 2 parts:
- The expression builder where you can build an expression from graphics by using a query builder.
- The expression created can be after translated back to graphics.

There is already a tool called query builder and it can be found here: http://querybuilder.js.org.
![alt tag](https://github.com/aciurea/ExpressionParser/blob/master/expression.png)

This too is using the query builder and convert the objects into an expression wich can be saved somewhere on the server and after it can be translated back to objects and displayed in the query builder.

The expressionParser support multiple operators like: 
-  equal: =
-  not_equal: <>
-  less: <
-  greater: >
- less or equal: <=
- greater or equal: >=
- equal ignore case: =^
- contains: =%
- contains ignore case: =^%, =%^
- regex match: =$%
- exists: exists
Logical Operators:
- OR
- AND
- NOT

The priority between logical operators is given by paranthesis that are added between each group.
Basicaly each group is surrounded by paranthesis, this way the priority of the operators is respected.

The expression parser can literally transform any expression into graphics if the operators are like the ones from the list above and if the groups are surrounded by paranthesis.

The expression can be manually created without the help of query builder.
More informatin about query builder, how it can be configured and s.o it can be found at this link: http://querybuilder.js.org.
In this repository I configured filters for a movie reservation based on some criteria.
