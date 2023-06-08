const Producto = require("../models/Producto");
const path = require('path');

exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);

        if (req.files && req.files.imagen) {
            producto.imagen = path.basename(req.files.imagen.path);
        }

        await producto.save();
        res.send(producto);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarProducto = async (req, res) => {
    try {
      const { producto, categoria, ubicacion, precio } = req.body;
      let products = await Producto.findById(req.params.id);
  
      if (!products) {
        return res.status(404).json({ msg: 'No existe el producto' });
      }
  
      if (req.files && req.files.imagen) {
        const imagen = req.files.imagen;
        const imagenPath = imagen.path;
        const imagenName = path.basename(imagenPath);
        products.imagen = imagenName;
      }
  
      products.producto = producto;
      products.categoria = categoria;
      products.ubicacion = ubicacion;
      products.precio = precio;
  
      await products.save();
  
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
    }
};

exports.verProducto = async (req, res) => {

    try {

        let products = await Producto.findById(req.params.id);

        if(!products){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        res.json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarProducto = async (req, res) => {

    try {

        let products = await Producto.findById(req.params.id);

        if(!products){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        await Producto.deleteOne({ _id: req.params.id });

        res.json({ msg: 'El producto: ' + products.producto + ' se ha eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

