export const downloadFile = (data: any, filename: string): void => {
  const blob = new Blob([data], { type: 'multipart/form-data' })
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename

  document.body.appendChild(anchor)

  anchor.click()

  document.body.removeChild(anchor)

  URL.revokeObjectURL(url)
}
