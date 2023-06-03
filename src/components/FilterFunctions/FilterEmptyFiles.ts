const filterFileEmpty = async (obj: any) => {
  if (obj && obj?.fileList !== undefined && obj.fileList.length !== 0) {
    const res = await new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.readAsDataURL(obj?.file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    return res
  }
  return undefined
}

export default filterFileEmpty
