export default function calculateFromString(str) {
  return new Function("return " + str)();
}
