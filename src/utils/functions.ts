const generateArray = (start: number, end: number, step: number) => {
  if (end <= start) return []
  const array = [start]
  let index = start + step
  while (index < end) {
    array.push(index)
    index += step
  }
  array.push(end)
  return array
}

export { generateArray }
