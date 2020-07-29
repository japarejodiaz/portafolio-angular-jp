import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { productosInterfaces } from "../interfaces/productos.interface";

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  cargando: boolean = true;
  productos: productosInterfaces[] = [];
  productosFiltrado: productosInterfaces[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  /**
   * Cargar Productos de la pagina
   * @param ninguno
   *    */
  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get("https://angular-html-ef905.firebaseio.com/productos_idx.json")
        .subscribe((respProd: productosInterfaces[]) => {
          console.log(respProd);
          this.productos = respProd;
          this.cargando = false;
          resolve();
          /*  setTimeout(() => {}, 2000); */
        });
    });
  }

  /**
   * Obtener Producto a partir de un Id de Producto
   * @param id String Identificador de Producto
   */
  getProducto(id: String) {
    return this.http.get(
      `https://angular-html-ef905.firebaseio.com/productos/${id}.json`
    );
  }

  /**
   * Obtener una coleccion filtrada del arreglo de prodcutos.
   * @param termino String recibe el identificador del filtro.
   * @return Filtro de la condiciom
   */
  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargar prod
      this.cargarProductos().then(() => {
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  /**
   * Obtener una coleccion filtrada
   * @param termino String recibe el identificador del filtro.
   * @return Filtro de la condiciom
   */
  private filtrarProductos(termino: string) {
    console.log(this.productos);

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
