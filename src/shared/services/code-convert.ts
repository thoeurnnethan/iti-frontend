export class ConvertCode{

  public codeToString(list, code): string {
    if (list && list.length > 0) {
      const item = list.find((item) => code === item.codeValue)
      return item? item.codeValueDesc : 'Unknown';
    }
    return code
  }
}