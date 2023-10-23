export function generatePassword(length: number) {
  if (length < 8) {
    throw new Error('generatePassword(length) length too short, must be >= 8');
  }
  const password = {
    _pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,

    _charset: /[a-zA-Z0-9_\-+.!$%^&*#]/,

    _getRandomByte: function () {
      if (window.crypto && window.crypto.getRandomValues) {
        const result = new Uint8Array(1);
        window.crypto.getRandomValues(result);
        return result[0];
      }
      // care about ancient browsers
      // else if(window.msCrypto && window.msCrypto.getRandomValues)
      // {
      //   const result = new Uint8Array(1);
      //   window.msCrypto.getRandomValues(result);
      //   return result[0];
      // }
      else {
        return Math.floor(Math.random() * 256);
      }
    },

    generate: function (length: number) {
      return Array.apply(null, { length } as any)
        .map(() => {
          let result;
          while (true) {
            result = String.fromCharCode(this._getRandomByte());
            if (this._charset.test(result)) {
              return result;
            }
          }
        }, this)
        .join('');
    },
  };
  let result;
  while (true) {
    result = password.generate(length);
    if (password._pattern.test(result)) {
      return result;
    }
  }
}
