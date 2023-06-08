//Rutas producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multipart = require('connect-multiparty');

const multiPartMiddelware = multipart({
    uploadDir: './public/images'
});

//api/productos
router.post('/', multiPartMiddelware, productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', multiPartMiddelware, productoController.actualizarProducto);
router.get('/:id', productoController.verProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;