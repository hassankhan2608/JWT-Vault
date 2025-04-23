// Character sets for secret generation
export const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export type SecretFormat = "base64" | "hex" | "uuid";

interface GenerateSecretOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  format: SecretFormat;
}

// Generate cryptographically secure random bytes
const getRandomBytes = (length: number): Uint8Array => {
  const array = new Uint8Array(length);
  return crypto.getRandomValues(array);
};

// Format secret based on selected format
export const formatSecret = (
  bytes: Uint8Array,
  format: SecretFormat
): string => {
  switch (format) {
    case "base64": {
      // Convert Uint8Array to string safely
      const binaryString = Array.from(bytes)
        .map(byte => String.fromCharCode(byte))
        .join("");
      return btoa(binaryString)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }
    case "hex":
      return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    case "uuid": {
      // UUID v4 format with some random bytes
      const hex = Array.from(bytes.slice(0, 16))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${
        "89ab"[bytes[16] % 4]
      }${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
    }
    default:
      return btoa(
        Array.from(bytes)
          .map(byte => String.fromCharCode(byte))
          .join("")
      );
  }
};

// Generate a secret based on the options
export const generateSecret = ({
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  format,
}: GenerateSecretOptions): string => {
  // For specific formats, generate appropriate random data
  if (format === "base64" || format === "hex" || format === "uuid") {
    // For these formats, we generate random bytes and format them
    const byteLength = Math.ceil(length * 0.75); // Approximate bytes needed for desired length
    const bytes = getRandomBytes(byteLength);
    return formatSecret(bytes, format);
  }

  // For custom character set generation
  let charset = "";
  if (includeUppercase) charset += charSets.uppercase;
  if (includeLowercase) charset += charSets.lowercase;
  if (includeNumbers) charset += charSets.numbers;
  if (includeSymbols) charset += charSets.symbols;

  // Default to a mix if nothing was selected
  if (!charset) {
    charset = charSets.uppercase + charSets.lowercase + charSets.numbers;
  }

  const randomValues = getRandomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
};

// Calculate the approximate strength (0-100) based on length and character sets
export const calculateStrength = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): number => {
  // Calculate character set size
  let charSetSize = 0;
  if (includeUppercase) charSetSize += 26;
  if (includeLowercase) charSetSize += 26;
  if (includeNumbers) charSetSize += 10;
  if (includeSymbols) charSetSize += 32;

  // If nothing selected, assume some defaults
  if (charSetSize === 0) charSetSize = 26 + 26 + 10;

  // Calculate entropy in bits: log2(charSetSize^length)
  const entropy = length * Math.log2(charSetSize);

  // Map entropy to a 0-100 scale
  // 128 bits is considered very strong, that's our 100%
  return Math.min(100, (entropy / 128) * 100);
};
