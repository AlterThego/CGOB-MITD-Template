import { z, type ZodString } from "zod";

export const usePassword = () => {
  const passwordRules = (messages: Record<string, string> = {}): ZodString => {
    const config = useAppConfig().mitd.password.rules;
    const _messages = Object.assign({}, config.messages, messages);
    let _z = z
      .string()
      .min(config.min, _messages.min.replace("$1", config.min.toString()));

    if (config.max !== null) {
      _z = _z.max(
        config.max,
        _messages.max.replace("$1", config.max.toString()),
      );
    }

    if (config.letters) {
      _z = _z.regex(/^(?=.*[a-zA-Z])/, _messages.letters);
      if (config.mixedCase) {
        _z = _z.regex(/^(?=.*[a-z])(?=.*[A-Z])/, _messages.mixedCase);
      }
    }

    if (config.numbers) {
      _z = _z.regex(/^(?=.*[0-9])/, _messages.numbers);
    }

    if (config.symbols) {
      _z = _z.regex(/^(?=.*[!@#$%^&*])/, _messages.symbols);
    }

    return _z;
  };

  return {
    passwordRules,
  };
};
