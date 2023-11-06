import express from 'express';
import { createPro, deletePro, detailPro, listPro, updatePro } from '../controller/product';
import { checkPermission } from '../midd/checkPremission';
const routerPro = express.Router();

routerPro.post('/', checkPermission, createPro);
routerPro.get('/', listPro);
routerPro.get('/:id', detailPro);
routerPro.put('/:id', checkPermission, updatePro);
routerPro.delete('/:id', checkPermission, deletePro);

export default routerPro;