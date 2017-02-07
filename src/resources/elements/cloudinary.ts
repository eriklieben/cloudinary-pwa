import { 
  autoinject, 
  customElement, 
  noView, 
  processContent, 
  containerless } from 'aurelia-framework';

@autoinject()
@customElement('cloudinary')
@noView()
@processContent(process)
export default class CloudinaryCustomElement {
}

function process(compiler, resources, node: Element, instruction) {

  let images = node.getElementsByTagName('img');
  if (images.length !== 1) {
    throw new Error('cloudinary should contain at least one and not more then one img element');
  }
  let image = images[0];

  let src = image.getAttribute('src.bind');
  let sources = node.querySelectorAll('source');
  let sourceSet = [];

  if (sources.length > 1) {
    for(let i = 0; i < sources.length; i++) {
      let source = sources[i];
      let filterAttributes = [];
      let size = '';
      for(let attribute of (<any>source).attributes) {
        if (attribute.name === 'size') {
          size = attribute.value;
          continue;
        }
        filterAttributes.push(CloudinaryPropertyConverter.convert(attribute.name, attribute.value));
      }
      sourceSet.push(size + "," + filterAttributes.join(','));
    }
    image.setAttribute('srcset.bind', src + ' | cloudinaryAttributes:\'' + sourceSet.join('|') +'\'');
  } else {
      let filterAttributes = [];
      for(let attribute of (<any>sources[0]).attributes) {
        if (attribute.name === 'size') {
          continue;
        }
        filterAttributes.push(CloudinaryPropertyConverter.convert(attribute.name, attribute.value));
      }

    image.removeAttribute('src.bind');
    image.setAttribute('src.bind', src + ' | cloudinaryAttributes: \'' + filterAttributes.join(',') + '\'');
  }

  node.innerHTML = image.outerHTML;
  return true;
}

class CloudinaryPropertyConverter {
  static convert(name: string, value: string) {
    switch(name) {
      case 'width':
        return `w_${value}`;
      case 'height':
        return `h_${value}`;
      case 'crop':
        return `c_${value}`;
      case 'zoom':
        return `z_${value}`;
      case 'corner-radius':
        return `r_${value}`;
      case 'rotate':
        return `a_${value}`;
      case 'opacity':
        return `o_${value}`;
      case 'border':
        return `bo_${value}`;
      case 'background-color':
        return `b_${value}`;                
      case 'face':
        return 'g_face';
      case 'faces':
        return 'g_faces';
      case 'blur-faces':
        return `e_blur_faces:${value}`;
      case 'pixelate-faces':
        return `e_pixelate_faces:${value}`;      
      case 'quality':
        if (['best', 'good', 'eco', 'low'].includes(value)) {
          return `q_auto:${value}`;
        }
        return `q_${value}`;
      default:
        throw new Error(`unknown cloudinary property ${name}`);
    }
  }
}
