# Structure

| what     | business ? | gui ? | css? | use what ?       | objectives                     |
| -------- | ---------- | ----- | ---- | ---------------- | ------------------------------ |
|          |            |       |      |                  |                                |
| utils    | -          | -     |      | -                | pure javascript helpers        |
| widget   | -          | y     | -    | utils            | pure gui widgets               |
|          |
| business | y          | -     |      | utils            | pojo representing the business |
| blocs    | y          | y     |      | widget, business | functionnal gui                |
| pages    | -          | y     | ?    | blocs            | navigation oriented            |
|          |            |       |      |                  |                                |

# Jest assertions

## Queries

<https://testing-library.com/docs/queries/about/>

## Assertions

### Basic assertions (vanilla-js)

<https://jestjs.io/fr/docs/expect>

### Dom assert

<https://github.com/testing-library/jest-dom>

## Complex example

<https://github.com/testing-library/react-testing-library>

## Other

<https://create-react-app.dev/docs/running-tests#initializing-test-environment>
<https://testing-library.com/docs/react-testing-library/setup>
