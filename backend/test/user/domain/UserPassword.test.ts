import { UserPassword } from "../../../src/user/domain/UserPassword";


describe("UserPassword", () => {
  it("should create a new password with correct value", () => {
    const userPassword = new UserPassword("password1");

    expect(userPassword.value).toBe("password1");
  });

  it ("should throw an error if password is empty", () => {
    expect(() => new UserPassword("")).toThrow(
      "UserPassword cannot be empty or whitespace"
    );
  });

  it ("should throw an error if password is too short", () => {
    expect(() => new UserPassword("passwor")).toThrow(
      "Password must be at least 8 characters"
    );
  });

  it("should compare two passwords and return true if they are equal", () => {  
    const userPassword1 = new UserPassword("password1");
    const userPassword2 = new UserPassword("password1");

    expect(userPassword1.equals(userPassword2)).toBe(true);
  });

});
