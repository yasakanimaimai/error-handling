import * as fs from 'fs';
import { Product } from 'src/domain/product/Product.entity';
import { ProductRepository } from 'src/domain/interface/ProductRepository.interface';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class JsonFileProductRepository implements ProductRepository {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async save(newProduct: Product): Promise<void> {
    const data = await readFile(this.filePath, { encoding: 'utf-8' });
    const products = JSON.parse(data);

    products.push({
      id: newProduct.id.value,
      name: newProduct.name.value,
    });

    await writeFile(this.filePath, JSON.stringify(products), {
      encoding: 'utf-8',
    });
  }
}
