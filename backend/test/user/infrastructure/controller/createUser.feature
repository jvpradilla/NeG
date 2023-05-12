Feature: create new User

  AS A guest
  I WANT create new User
  SO THAT I can login in the system

  Scenario Outline: create new User
    Given a guest wish to create a new User with the following data:
      """
      <requestJSONBody>
      """
    When a guest send a request were HTTP method is <requestMethod> and URL is <requestURL>
    Then a response have a HTTP response code is <responseCode> and the response body is:
      """
      <responseJSONBody>
      """

    Examples:
      | requestMethod | requestURL   | requestJSONBody                                | responseCode | responseJSONBody                                                                     |
      | "POST"        | "/api/user/" | {"username": "user1", "password":"password1"}  | -201         |                                                                                      |
      | "POST"        | "/api/user/" | {"username": "user1", "password":"password1"}  | 400          | {"error": "invalid username", "detail": "username has already been taken"}           |
      | "POST"        | "/api/user/" | {"username": "", "password":"password1"}       | 400          | {"error": "invalid username", "detail": "username is empty"}                         |
      | "POST"        | "/api/user/" | {"username": "user 1", "password":"password1"} | 400          | {"error": "invalid username", "detail": "username has invalid characters"}           |
      | "POST"        | "/api/user/" | {"username": "user1", "password":""}           | 400          | {"error":"invalid password", "detail": "password is empty"}                          |
      | "POST"        | "/api/user/" | {"username": "user1", "password":"pass"}       | 400          | {"error":"invalid password", "detail": "password must be a minimum of 5 characters"} |

