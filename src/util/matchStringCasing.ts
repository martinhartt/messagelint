export default function matchStringCasing(original: string, template: string) {
  return original
    .split('')
    .map(
      (letter, i) =>
        template[i]
          ? template[i] === template[i].toUpperCase() ? letter.toUpperCase() : letter.toLowerCase()
          : letter,
    )
    .join('');
}
