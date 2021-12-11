import Cpf from '../../src/domain/entity/Cpf';

test("Should validate cpf", () => {
    // given
    const validCpf = "935.411.347-80";
    // when
    const cpf = new Cpf(validCpf);
    // then
    expect(cpf.value).toBe(validCpf);
});

test("Should throw if cpf with equal characters", () => {
    const invalidCpf = "111.111.111-11";
    expect(() => new Cpf(invalidCpf)).toThrowError("Invalid CPF");
});

test("Should throw if cpf with characters in sequence", () => {
    const invalidCpf = "123.456.789-99";
    expect(() => new Cpf(invalidCpf)).toThrowError("Invalid CPF");
});

test("Should throw if cpf is empty", () => {
    const invalidCpf = "";
    expect(() => new Cpf(invalidCpf)).toThrowError("Invalid CPF");
});

test("Should throw if cpf has wrong length", () => {
    const invalidCpf = "19283767";
    expect(() => new Cpf(invalidCpf)).toThrowError("Invalid CPF");
});

test("Should throw if cpf has letters", () => {
    const invalidCpf = "192as83767a";
    expect(() => new Cpf(invalidCpf)).toThrowError("Invalid CPF");
});