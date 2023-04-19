# Summary

|               | innerHTML | shadow/slots | Attributes | css dependant | functions | objective               |
| ------------- | --------- | ------------ | ---------- | ------------- | --------- | ----------------------- |
| pages         | yes       | -            | -          | yes           | -         | regroup content         |
| pages\blocks  | yes       | -            | -          | yes           | -         | regroup content         |
|               |           |              |            |               |           |                         |
| widgets       | -         | yes          | yes        | embedded      | yes       | graphical               |
| widgets\data  | yes       | ?            | yes        | embedded?     | yes       | oriented value          |
| widgets\func  | yes       | ?            | yes        | embedded?     | yes       | functionnal (no layout) |
| widgets\style | -         | yes          | yes        | embedded      | -         | graphical               |
|               |           |              |            |               |           |                         |

Some widget need to be "hidden" to avoid their functionnalities to be taken upstream

TODO: widgets(folder/file) -> below pages
TODO: render / funcs -> widgets
