export const downloadFile = (data: any, filename: string): void => {
  const blob = new Blob([data], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename

  document.body.appendChild(anchor)

  anchor.click()

  document.body.removeChild(anchor)

  URL.revokeObjectURL(url)
}
