// User.test.ts

import { User } from "../../../src/user/domain/User";
import { UserName } from "../../../src/user/domain/UserName";
import { UserPassword } from "../../../src/user/domain/UserPassword";


describe("User", () => {
  const username = new UserName("user1234");
  const password = new UserPassword("password1");

  it("should create a new user with correct attributes", () => {
    const user = new User(username, password);

    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
  });

  /*
  it("should throw an error if username is null", () => {
    expect(() => new User(null, password)).toThrow(
      "username must be a valid UserName object"
    );
  });

  it("should throw an error if username is undefined", () => {
    expect(() => new User(undefined, password)).toThrow(
      "username must be a valid UserName object"
    );
  });

  it("should throw an error if password is null", () => {
    expect(() => new User(username, null)).toThrow(
      "password must be a valid UserPassword object"
    );
  });

  it ("should throw an error if password is undefined", () => {
    expect(() => new User(username, undefined)).toThrow(
      "password must be a valid UserPassword object"
    );
  });
  
  it("should throw an error if username is not a UserName object", () => {
    expect(() => new User("username", password)).toThrow(
      "username must be a valid UserName object"
    );
  });

  it("should throw an error if password is not a UserPassword object", () => {
    expect(() => new User(username, "password")).toThrow(
      "password must be a valid UserPassword object"
    );
  });
  */

  it("should compare two users and return true if they are equal", () => {
    const user1 = new User(username, password);
    const user2 = new User(username, password);

    expect(user1.equals(user2)).toBe(true);
  });
  
});
