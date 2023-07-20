# Structure

| what     | business ? | gui ? | use what ?       | objectives                     |
| -------- | ---------- | ----- | ---------------- | ------------------------------ |
|          | no         |       |                  |                                |
| utils    | no         | no    | -                | pure javascript helpers        |
| widget   | no         | yes   | utils            | pure gui widgets               |
|          |            |       |                  |                                |
| business | yes        | no    | utils            | pojo representing the business |
| blocs    | yes        | yes   | widget, business | functionnal gui                |
| pages    | no         | yes   | blocs            | navigation oriented            |
|          |            |       |                  |                                |

# Jest assertions:

## Queries

https://testing-library.com/docs/queries/about/

## Assertions

### Basic assertions (vanilla-js)

https://jestjs.io/fr/docs/expect

### Dom assert

https://github.com/testing-library/jest-dom

## Complex example:

https://github.com/testing-library/react-testing-library

## Other

https://create-react-app.dev/docs/running-tests#initializing-test-environment
https://testing-library.com/docs/react-testing-library/setup
