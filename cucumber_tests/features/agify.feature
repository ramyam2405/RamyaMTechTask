Feature: Estimate the age of a person based on a first name

    @APITest
    Scenario Outline: 1. Estmate the age based on single name
        Given the name is "<Name>"
        When I send a GET request to estimate the age
        Then the API response status code should be 200
        And the response data should be a json object
        And the response should include the following data:
            | count   | name   | age   |
            | <Count> | <Name> | <Age> |

        Examples:
            | Name                          | Count  | Age  |
            | <empty>                       | 0      | null |
            | QA                            | 117    | 50   |
            | QA Tester                     | 117    | 50   |
            | *                             | 0      | null |
            | <script>alert('XSS')</script> | 0      | null |
            | Sam Smith                     | 99733  | 56   |
            | Sam John                      | 277407 | 74   |


    Scenario Outline: 2. Estimate the age based on single name and country
        Given the name is "<Name>" and the country is "<Country>"
        When I send a GET request to estimate the age
        Then the API response status code should be 200
        And the response data should be a json object
        And the response should include the following data:
            | count   | name   | age   |
            | <Count> | <Name> | <Age> |

        Examples:
            | Name    | Country | Count | Age  |
            | <empty> | <empty> | 0     | null |
            | QA      | GB      | 8     | 53   |
            | QA      | GBB     | 0     | null |

    @APITest
    Scenario: 3. Error codes returned when invalid parameters are supplied
        When I send a GET request to estimate the age
        Then the API response status code should be 422


    Scenario Outline: 4. Estimate the age of multiple names
        Given I have the following names:
            | Name    |
            | <Name1> |
            | <Name2> |
            | <Name3> |
        When I send a GET request to estimate the age
        Then the response should include the following estimated data:
            | Name    | Count  | Age |
            | <Name1> | 99733  | 56  |
            | <Name2> | 277407 | 74  |
            | <Name3> | 117    | 50  |

        Examples:
            | Name1 | Name2 | Name3 |
            | Sam   | John  | QA    |

