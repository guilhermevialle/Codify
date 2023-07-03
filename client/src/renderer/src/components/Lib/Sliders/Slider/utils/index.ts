export function getElementDimensions(element: HTMLElement | null) {
  if (element) {
    const width = element.clientWidth
    const height = element.clientHeight
    return { width, height }
  }

  return undefined
}

type RGB = [number, number, number]

export function getGradientColor(index: number, amount: number, colors: string[]): string {
  const hexToRgb = (hex: string): RGB => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }
  const rgbToHex = (rgb: RGB): string =>
    '#' +
    rgb
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  const colorRange: RGB[] = colors.map(hexToRgb)
  const rangeLength = colorRange.length - 1
  const stepLength = amount / rangeLength
  let currentStep = Math.floor(index / stepLength)

  if (currentStep >= rangeLength) currentStep = rangeLength - 1

  const nextStep = currentStep + 1
  const stepPercentage = (index - currentStep * stepLength) / stepLength

  const color1 = colorRange[currentStep]
  const color2 = colorRange[nextStep]
  const resultColor: RGB = color1.map((c1, i) =>
    Math.round(c1 + (color2[i] - c1) * stepPercentage)
  ) as RGB

  return rgbToHex(resultColor)
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export function getElementBgColor(element: HTMLElement) {
  const backgroundColor = getComputedStyle(element).backgroundColor
  return backgroundColor
}
