export class CloudinaryAttributesValueConverter {
  toView(value:string, params: string) {
    let sizeSets = params.split('|');
    if (sizeSets.length === 1) {
      console.log(value);
      return value.replace('/upload/', `/upload/${params}/`);
    }
    return sizeSets.map(sizeSet => {
      let attributes = sizeSet.split(',');
      let size = attributes.shift();
      return value.replace('/upload/', `/upload/${attributes.join(',')}/`) + ` ${size}`;
    }).join(',');
  }
}
