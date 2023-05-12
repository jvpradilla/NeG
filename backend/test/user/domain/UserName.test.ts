import { UserName } from ".../../../src/user/domain/UserName";

describe("UserName", () => {
  it("should create a new username with correct value", () => {
    const userName = new UserName("user1234");

    expect(userName.value).toBe("user1234");
  });

  it("should throw an error if username is empty", () => {
    expect(() => new UserName("")).toThrow(
      "UserName cannot be empty or whitespace"
    );
  });

  it("should throw an error if username contains whitespace", () => {
    expect(() => new UserName("user 1234")).toThrow(
      "UserName cannot contain whitespace"
    );
  });

  it("should throw an error if username is too short", () => {
    expect(() => new UserName("user")).toThrow(
      "Username must be at least 6 characters"
    );
  });

  it("should throw an error if username contains uppercase letters", () => {
    expect(() => new UserName("User1234")).toThrow(
      "Username must only contain lowercase letters, numbers and underscore"
    );
  });

  it("should throw an error if username contains special characters", () => {
    expect(() => new UserName("user@1234")).toThrow(
      "Username must only contain lowercase letters, numbers and underscore"
    );
  });

  it("should compare two usernames and return true if they are equal", () => {
    const userName1 = new UserName("user1234");
    const userName2 = new UserName("user1234");

    expect(userName1.equals(userName2)).toBe(true);
  });

});